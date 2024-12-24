import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import DescriptionBox from "../components/DescriptionBox";
import LoginButton from "../components/LoginButton";
import CategoryList from "../components/CategoryList";
import "./MainPage.css";

function MainPage() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="main-page-container">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="category-list-container">
        <CategoryList onCategoryClick={handleCategoryClick} currentCategory={currentCategory} />
      </div>
      <div className="login-button-container">
        {/* handleLoginClick 전달 */}
        <LoginButton isCategoryClicked={!!currentCategory} onClick={handleLoginClick} />
      </div>
    </div>
  );
}

export default MainPage;
