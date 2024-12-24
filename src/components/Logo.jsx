import React from 'react';
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <h1 className="logo-text">단 하루, 오늘을 잘 사는 우리들의 투두</h1>
      <img src="/images/main_logo.png" alt="Logo" className="logo" />
    </div>
  );
};

export default Logo;