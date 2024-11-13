// ProfileHeader.jsx
import React from 'react';


const ProfileHeader = ({ logo }) => {
    return (
        <header className='profile-header'>
            <img src={logo} alt='Logo' className='profile-logo'/>
        </header>
    );
};



export default ProfileHeader;
