import React from 'react';
import '../CSS/MypageStyle.css';
import logo from '../image/logo.png';
import ProfileHeader from '../Components/Profile-Header.js'
import ProfileImage from '../Components/ProfileImage.js';
import ex from '../image/ex2.png';
import ProfileContent from '../Components/ProfileContent.js';
import data from '../Data/data.js'
import DduduList from '../Components/Ddudulist.js';
import LikeList from '../Components/LikeList.js';

const userId ='김민지';


function Mypage() {
  const userInfo = data.find(item => item.profile.nickname === userId);
  return (
    
    <div className='profile-contanier'>
      <ProfileHeader logo ={logo} />
    <div className='profile-content'>
      <ProfileImage img={ex}/>
      <ProfileContent name={userInfo.profile.nickname} date={userInfo.profile.created_date} 
      email={userInfo.profile.social_type} count={userInfo.profile.todo_count}/>
      </div>
      <div className='profile-content2'>
      <DduduList userId={userId} data={data} />
        <LikeList />
      </div>
    </div>
  );
}
 
export default Mypage;
