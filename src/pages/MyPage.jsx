import React, { useState, useEffect } from 'react';
import './MypageStyle.css';
import logo from '../image/logo.png';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
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
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('jwtAccessToken');
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        // userId를 포함하여 API 요청
        const response = await fetch(`http://127.0.0.1:8000/mypage/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log(data)
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
    navigate('/boards'); // navigate를 사용하여 boards로 이동
    
  };

  const handleLogoutClick = () => {
    try {
      console.log('로그아웃 실행');
  
      // 로컬스토리지 초기화
      localStorage.clear();
  
      // 모든 쿠키 삭제
      document.cookie.split(';').forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
  
      console.log('로그아웃 성공');
  
      // 로그인 페이지 또는 홈으로 리다이렉트
      navigate('/');
  
      // 페이지 새로고침
      setTimeout(() => {
        window.location.reload(); // 새로고침 수행
      }, 100); // 약간의 지연 시간 추가 (리다이렉션 완료 후 실행)
    } catch (error) {
      console.error('로그아웃 중 에러 발생:', error.message);
    }
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
      <DduduList my_todos={userInfo.my_todos} />
      </div>
      <div className="profile-userlist">
        <UserList onOpenModal={(users) => {
          setFollowingUsers(users);
          setIsModalOpen(true);
        }} />
        <LikeList likedTodos={userInfo.liked_todos} />
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
