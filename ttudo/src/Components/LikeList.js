import React from 'react';
import '../CSS/LikeList.css';

const Likelist = () => {
    const users = [
        { id: 1, name: '박보성', todo: '지하철 일찍 내려 걷기', category: '운동' },
        { id: 2, name: '김찬호', todo: '현금영수증 생활화', category: '생활루틴' },
        { id: 3, name: '김찬호', todo: '현금영수증 생활화', category: '생활루틴' },
        { id: 4, name: '김찬호', todo: '현금영수증 생활화', category: '생활루틴' },
        { id: 5, name: '김찬호', todo: '현금영수증 생활화', category: '생활루틴' },
        { id: 6, name: '김찬호', todo: '현금영수증 생활화', category: '생활루틴' },
    ];

    return (
        <div className='flex-container'>
            <div className='likelist-container'>
                <div className='likelist-header'>
                    <span className='likelist-title'>나의 뚜두 좋아요 기록</span>
                </div>
                <div className='likelist-content'>
                    <div className='likelist-user-list'>
                        {users.map(user => (
                            <div key={user.id} className={`likelist-user-item ${user.category}`}>
                                <div className='likelist-user-info'>
                                    <div className='likelist-profile-circle'></div>
                                    <div className='likelist-user-details'>
                                        <span className={`likelist-user-name ${user.category}`}>{user.name}</span>
                                        <span className={`likelist-user-todo ${user.category}`}>{user.todo}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Likelist;
