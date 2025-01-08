import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 가져오기
import Modal from './Modal'; // Modal 컴포넌트 가져오기
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]); // 유저 리스트 상태
    const [error, setError] = useState(null); // 에러 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handleAddUserClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token is missing');
            }
    
            const response = await fetch('http://127.0.0.1:8000/mypage/users/', { // 반드시 슬래시 포함
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`);
            }
    
            const data = await response.json();
            setUsers(data); // 유저 리스트 업데이트
            setIsModalOpen(true); // 모달 열기
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('유저 정보를 불러오는 데 실패했습니다.');
        }
    };

    // View 버튼 클릭 시 호출되는 함수
    const handleViewUserClick = (userid) => {
        navigate(`/mypage/${userid}`); // 해당 userid로 페이지 이동
    };

    return (
        <div className='userlist-container'>
            <div className='userlist-header'>
                <span className='userlist-title'>즐겨찾기 뚜두 유저 리스트</span>
                <button className='add-user-button' onClick={handleAddUserClick}>
                    유저 추가
                </button>
            </div>
            <div className='userlist-content'>
                {error && <div className="error-message">{error}</div>} {/* 에러 메시지 표시 */}
                <div className='user-list'>
                    {users.map(user => (
                        <div key={user.id} className='user-item'>
                            <div className='user-info'>
                                <div className='profile-circle'></div>
                                <span className='user-name'>{user.nickname}</span>
                            </div>
                            {/* View 버튼 */}
                            <button 
                                className='view-button' 
                                onClick={() => handleViewUserClick(user.id)}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal 컴포넌트 */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                users={users} 
            />
        </div>
    );
};

export default UserList;
