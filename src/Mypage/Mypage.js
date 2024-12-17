import React, { useState, useEffect } from 'react';
import '../CSS/MypageStyle.css';
import logo from '../image/logo.png';
import ProfileHeader from '../Components/Profile-Header.js';
import ProfileImage from '../Components/ProfileImage.js';
import ProfileContent from '../Components/ProfileContent.js';
import DduduList from '../Components/Ddudulist.js';
import UserList from '../Components/Userlist.js';
import NavButtons from '../Components/NavButtons';
import LikeList from '../Components/Likelist.js';
import Modal from '../Components/Modal.js';

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/mypage/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserInfo(data);
        setFollowingUsers(data.bookmarked_users || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleHomeClick = () => {
    console.log('홈으로 이동');
  };

  const handleLogoutClick = () => {
    console.log('로그아웃 실행');
  };

  const handleFollowToggle = (userId) => {
    setFollowingUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <ProfileHeader logo={logo} />
        <NavButtons onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
      </div>
      <div className="profile-content">
        <ProfileImage img={userInfo.profile.profile_img} />
        <ProfileContent
          name={userInfo.profile.nickname}
          date={userInfo.profile.created_date}
          email={userInfo.profile.social_type}
          count={userInfo.profile.todo_count}
        />
      </div>
      <div className="profile-content-ddudu">
        <DduduList data={userInfo.my_todos} />
      </div>
      <div className="profile-userlist">
      <UserList onOpenModal={(users) => {
    setFollowingUsers(users);
    setIsModalOpen(true);
}} />
        <LikeList data={userInfo.liked_todos} />
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        users={followingUsers}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  );
}

export default Mypage;
