// ProfileComponents.jsx
import React from 'react';
import '../CSS/Profilecontent.css';

export const ProfileContent = ({ name, date, email, count }) => {
  return (
    <div className='profilecontent'>
      <div className='profilecontent-name'>{name}</div>
      <div className='profilecontent-content'>
        <div className='content-wrapper'>
          <div className='profilecontent-title'>시작 날짜 <span className='profilecontent-con'>{date}</span></div>
          <div className='profilecontent-title'>연동 계정<span className='profilecontent-con'>{email}</span></div>
          <div className='profilecontent-title'>뚜두 개수 <span className='profilecontent-con'>{count}</span></div>
        </div>
        <button className='logout-button'>로그아웃</button>
      </div>
    </div>
  );
};

export default ProfileContent;
