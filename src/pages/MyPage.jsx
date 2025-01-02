import React, { useState, useEffect } from 'react';
import '../CSS/MypageStyle.css';
import logo from '../image/logo.png';
import ProfileHeader from '../components/Profile-Header.jsx';
import ProfileImage from '../components/ProfileImage.jsx';
import ProfileContent from '../components/ProfileContent.jsx';
import DduduList from '../components/Ddudulist.jsx';
import UserList from '../components/Userlist.jsx';
import NavButtons from '../components/NavButtons.jsx';
import LikeList from '../components/Likelist.jsx';
import Modal from '../components/Modal.jsx';
import jwtDecode from 'jwt-decode'; // JWT 디코딩 라이브러리 설치 필요: npm install jwt-decode

function Mypage() {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [followingUsers, setFollowingUsers] = useState([]); // 팔로우한 사용자 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 쿠키에서 특정 쿠키 값을 가져오는 함수
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.split('=')[1]);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let accessToken = getCookie('accessToken'); // 쿠키에서 accessToken 가져오기

        console.log('Access Token:', accessToken);

        // Django API 호출
        const response = await fetch('http://127.0.0.1:8000/mypage/', {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // JWT 토큰 포함
          },
        });

        if (!response.ok) throw new Error('사용자 데이터를 가져오는데 실패했습니다.');

        const data = await response.json();
        setUserInfo(data); // 사용자 정보 저장
        setFollowingUsers(data.bookmarked_users || []); // 북마크된 사용자 목록 저장
        setIsLoading(false); // 로딩 종료
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = () => {
    console.log('홈으로 이동');
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogoutClick = () => {
    console.log('로그아웃 실행');
  };

  // 팔로우 상태 토글 핸들러
  const handleFollowToggle = (userId) => {
    setFollowingUsers(users =>
      users.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing } // 팔로우 상태 변경
          : user
      )
    );
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!userInfo) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="profile-container">
      {/* 헤더 섹션 */}
      <div className="profile-header">
        <ProfileHeader logo={logo} />
        <NavButtons onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
      </div>

      {/* 프로필 정보 섹션 */}
      <div className="profile-content">
        <ProfileImage img={userInfo.profile.profile_img} />
        <ProfileContent
          name={userInfo.profile.nickname}
          date={new Date(userInfo.profile.created_date).toLocaleDateString()} // 날짜 포맷 변경
          email={userInfo.profile.social_type}
          count={userInfo.profile.todo_count}
        />
      </div>

      {/* To-do 리스트 섹션 */}
      <div className="profile-content-ddudu">
        <DduduList data={userInfo.my_todos} />
      </div>

      {/* 사용자 리스트 및 좋아요한 To-do 섹션 */}
      <div className="profile-userlist">
        <UserList 
          users={followingUsers} 
          onOpenModal={(users) => {
            setFollowingUsers(users);
            setIsModalOpen(true);
          }} 
        />
        <LikeList data={userInfo.liked_todos} />
      </div>

      {/* 모달 창 */}
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
