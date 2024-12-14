// ProfileComponents.jsx
import React from 'react';

export const ProfileImage = ({ img }) => {
  return (
    <div className='profile-image'>
      <img src={img} alt='프로필 이미지' className='profile-img'/>
    </div>
  );
};


// 두 컴포넌트를 객체로 내보내기
export default ProfileImage;
