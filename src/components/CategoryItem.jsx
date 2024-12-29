import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CategoryItem.css";

const CategoryItem = ({ color, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getText = () => {
    if (isActive) {
      switch (color) {
        case "blue":
          return "학습";
        case "green":
          return "운동";
        case "red":
          return "음식";
        case "yellow":
          return "생활루틴";
        case "purple":
          return "셀럽";
        case "gray":
          return "기타";
        default:
          return "Click";
      }
    }
    return "Click";
  };

  return (
    <div
      className="category-item"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 호버 상태와 클릭 상태에 따라 이미지 변경 */}
      <img
        src={
          isHovered || isActive
            ? `/images/${color}_envelope_open.png`
            : `/images/${color}_envelope_closed.png`
        }
        alt={`${color} envelope`}
        className="envelope-image"
      />
      <div className="index-wrapper">
        <img
          src={`/images/${color}_index.png`}
          alt={`${color} index`}
          className="index-image"
        />
        <span className={`index-text ${color}`}>{getText()}</span>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired, // 현재 활성화 여부
};

export default CategoryItem;
