import React, { useRef, useEffect, useState } from 'react';
import '../CSS/Modal.css';

const Modal = ({ isOpen, onClose, users = [] }) => {
    const modalRef = useRef();
    const [following, setFollowing] = useState({});
    const [modalUsers, setModalUsers] = useState([]);

    useEffect(() => {
        if (users.length > 0) {
            setModalUsers(users);
        }
    }, [users]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleFollow = async (userId) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/follow/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friend_id: userId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to follow/unfollow user');
            }

            const data = await response.json();
            
            // 팔로우 상태 업데이트
            setFollowing(prev => ({
                ...prev,
                [userId]: !prev[userId]
            }));

            // 성공 메시지 표시 (선택사항)
            console.log(data.message);

        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <div className="modal-header-image">
                    <div className="modal-controls">
                        <div className="control-dot"></div>
                        <div className="control-dot"></div>
                        <div className="control-dot close-dot" onClick={onClose}>
                            <span className="close-x"></span>
                        </div>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-users-grid">
                        {modalUsers.map((user) => (
                            <div key={user.id} className="modal-user-card">
                                <div className="modal-profile-circle">
                                    {user.profile_img && <img src={user.profile_img} alt="" />}
                                </div>
                                <span className="modal-user-name">{user.nickname}</span>
                                <button 
                                    className={`follow-button ${following[user.id] ? 'unfollow' : 'follow'}`}
                                    onClick={() => handleFollow(user.id)}
                                >
                                    {following[user.id] ? '언팔로우' : '팔로우'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
