import React from 'react';
import '../CSS/UserList.css';

const UserList = ({ onOpenModal }) => {
    const users = [
        { id: 1, name: '박보성', profileImg: '' },
        { id: 2, name: '김찬호', profileImg: '' },
        { id: 3, name: '사용자3', profileImg: '' },
        { id: 4, name: '사용자4', profileImg: '' },
        { id: 5, name: '사용자5', profileImg: '' }
    ];

    return (
        <div className='userlist-container'>
            <div className='userlist-header'>
                <span className='userlist-title'>즐겨찾기 뚜두 유저 리스트</span>
                <button className='add-user-button' onClick={onOpenModal}>
                    유저 추가
                </button>
            </div>
            <div className='userlist-content'>
                <div className='user-list'>
                    {users.map(user => (
                        <div key={user.id} className='user-item'>
                            <div className='user-info'>
                                <div className='profile-circle'></div>
                                <span className='user-name'>{user.name}</span>
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
