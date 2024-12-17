import React, { useState } from 'react';
import '../CSS/UserList.css';

const UserList = ({ onOpenModal }) => {
    const [users, setUsers] = useState([]);

    const handleAddUserClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
            onOpenModal(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
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
                <div className='user-list'>
                    {users.map(user => (
                        <div key={user.id} className='user-item'>
                            <div className='user-info'>
                                <div className='profile-circle'></div>
                                <span className='user-name'>{user.nickname}</span>
                            </div>
                            <button className='view-button'>View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
