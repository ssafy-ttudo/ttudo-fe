import React, { useRef, useEffect, useState } from 'react';
import '../CSS/Modal.css';

const Modal = ({ isOpen, onClose, users }) => {
  const modalRef = useRef();
  const [following, setFollowing] = useState({});

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

  const handleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
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
            {users?.map((user) => (
              <div key={user.id} className="modal-user-card">
                <div className="modal-profile-circle">
                  {user.profileImg && <img src={user.profileImg} alt="" />}
                </div>
                <span className="modal-user-name">{user.name}</span>
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
