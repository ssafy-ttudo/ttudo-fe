import React, { useState, useEffect } from 'react';
import './MypageStyle.css';
import logo from '../image/logo.png';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile-Header.jsx';
import ProfileImage from '../components/ProfileImage.jsx';
import ProfileContent from '../components/ProfileContent.jsx';
import DduduList from '../components/Ddudulist.jsx';
import UserList from '../components/Userlist.jsx';
import NavButtons from '../components/NavButtons.jsx';
import LikeList from '../components/Likelist.jsx';
import Modal from '../components/Modal.jsx';

function Mypage() {
  const { userId } = useParams(); // URL에서 userId 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        // userId를 포함하여 API 요청
        const response = await fetch(`http://127.0.0.1:8000/mypage/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
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
  }, [userId]); // userId가 변경될 때마다 API 호출

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
    <div className="mypage-profile-container">
      <div className="mypage-profile-header">
        <ProfileHeader logo={logo} />
        <NavButtons onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
      </div>
      <div className="mypage-profile-content">
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
