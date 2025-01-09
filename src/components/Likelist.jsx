import React from 'react';
import './LikeList.css';

const Likelist = ({ likedTodos }) => { // likedTodos props 추가
  return (
    <div className='flex-container'>
      <div className='likelist-container'>
        <div className='likelist-header'>
          <span className='likelist-title'>나의 뚜두 좋아요 기록</span>
        </div>
        <div className='likelist-content'>
          <div className='likelist-user-list'>
            {likedTodos && likedTodos.length > 0 ? (
              likedTodos.map((todo) => (
                <div key={todo.id} className={`likelist-user-item ${todo.category}`}>
                  <div className='likelist-user-info'>
                    <div className='likelist-profile-circle'></div>
                    <div className='likelist-user-details'>
                      <span className={`likelist-user-name ${todo.category}`}>{todo.name}</span>
                      <span className={`likelist-user-todo ${todo.category}`}>{todo.todo}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>좋아요한 뚜두가 없습니다.</p> // 좋아요한 항목이 없을 때 표시
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likelist;
