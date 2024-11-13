import React from 'react';
import Ddudu from './Ddudu';
import '../CSS/DduduList.css';

const DduduList = ({ userId, data }) => {
  // userId와 일치하는 사용자의 데이터 찾기
  const userTodos = data.find(user => user.profile.nickname === userId)?.my_todos || [];

  return (
    <div className='ddudulist-container'>
      <div className='ddudulist-title'>마이 뚜두 리스트</div>
      <div className='ddudulist-content'>
        {userTodos.map((todo) => (
          <Ddudu
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            created_date={todo.created_date}
          />
        ))}
      </div>
    </div>
  );
};

export default DduduList;
