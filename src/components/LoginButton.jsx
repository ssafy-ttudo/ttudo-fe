import React from "react";
import PropTypes from "prop-types";
import "./LoginButton.css";

const LoginButton = ({ isCategoryClicked, onClick }) => {
  return (
    <div className="login-button-container">
      <p className="login-subtitle">
        {isCategoryClicked ? "ㆍ 더 보고 싶다면 ㆍ" : "ㆍ 바로 시작하기 ㆍ"}
      </p>
      <button className="social-login-button" onClick={onClick}>
        <p className="login-text">LOGIN</p>
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  isCategoryClicked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
