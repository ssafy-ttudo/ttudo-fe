// DetailHeader.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import './DetailHeader.css';

const DetailHeader = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <header className="detail-header-container">
            <div className="left-section">
                <button className="back-button" onClick={handleGoBack}>뒤로 가기</button>
            </div>
            <div className="right-section">
                <button className="mypage-button">MY PAGE</button>
                <div className="vertical-line"></div>
                <button className="logout-button">LOGOUT</button>
            </div>
        </header>
    );
}

export default DetailHeader;