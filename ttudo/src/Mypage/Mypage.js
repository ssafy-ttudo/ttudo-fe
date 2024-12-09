import React from 'react';
import '../CSS/MypageStyle.css';
import logo from '../image/logo.png';
import ProfileHeader from '../Components/Profile-Header.js';
import ProfileImage from '../Components/ProfileImage.js';
import ex from '../image/ex2.png';
import ProfileContent from '../Components/ProfileContent.js';
import data from '../Data/data.js';
import DduduList from '../Components/Ddudulist.js';
import LikeList from '../Components/LikeList.js';
import NavButtons from '../Components/NavButtons'; // NavButtons 컴포넌트 가져오기
import Modal from '../Components/Modal.js';
import { useState } from 'react';
const userId ='김민지';


function Mypage() {
  const userInfo = data.find(item => item.profile.nickname === userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHomeClick = () => {
    console.log('홈으로 이동');
    // 홈 이동 로직 추가
  };

  const handleLogoutClick = () => {
    console.log('로그아웃 실행');
    // 로그아웃 로직 추가
  };
  return (
    <div className="profile-container">
    <div className="profile-header">
      <ProfileHeader logo={logo} />
      <NavButtons onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
    </div>
      <div className="profile-content">
        <ProfileImage img={ex} />
        <ProfileContent
          name={userInfo.profile.nickname}
          date={userInfo.profile.created_date}
          email={userInfo.profile.social_type}
          count={userInfo.profile.todo_count}
        />
      </div>
      <div className='profile-content-ddudu'>
        <DduduList userId={userId} data={data} />
        </div>
      <div className="profile-content2">
       
        <LikeList />
      </div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
   <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is the modal content</p>
      </Modal>
    </div>
  );
}

export default Mypage;
