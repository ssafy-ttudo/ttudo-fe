import React from "react";
import logo from '../../assets/board/logo.png'
import homeImage from '../../assets/board/home.png'
import './Header.css';
import axios from "axios";

const Header = () => {
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return (
        <header className="header">
            <img src={logo} alt="logo" />
            <div className="profile-container">
                <div className="profile-image" />
                <div className="user-info">
                    <div className="user-name-welcome">
                        <span className="user-name">이예진</span>
                        <span className="welcome-text">님 환영합니다.</span>
                    </div>
                    <div className="mypage-link">
                        <img src={homeImage} alt="home" className="home-icon" />
                        <span>MY PAGE</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;