// Ddudu.jsx
import React from 'react';

const Ddudu = ({ title, completed, created_date }) => {
  return (
    <div className='ddudu'>
      <div className='ddudu-title'>{title}</div>
      <div className='ddudu-info'>
        <span className='ddudu-date'>{created_date}</span>
        <span className='ddudu-status'>{completed ? '완료' : '진행중'}</span>
      </div>
    </div>
  );
};

export default Ddudu;
