import React from "react";
import CategoryItem from "./CategoryItem";
import DescriptionBox from "./DescriptionBox";
import "./CategoryList.css";

const leftCategories = [
  {
    color: "blue",
    image: "/images/description_blue.png",
    description: "Web 프로젝트 UI 수정\n늦어도 내일까지\n마무리하기",
    backgroundColor: "#81AFEE",
    text: "학습",
  },
  {
    color: "red",
    image: "/images/description_red.png",
    description: "고대 연어이야기 가서\n연어 특대 사이즈에\n연어초밥까지 뿌시기",
    backgroundColor: "#F4989D",
    text: "음식",
  },
  {
    color: "purple",
    image: "/images/description_purple.png",
    description: "아이유 추천 플레이리스트\n아침에 새로\n멜론에 업데이트하기",
    backgroundColor: "#C8A2DA",
    text: "셀럽",
  },
];

const rightCategories = [
  {
    color: "green",
    image: "/images/description_green.png",
    description: "SSAFY 일과 종료 후\n청계천에서\n30분 러닝하기",
    backgroundColor: "#9CD1A7",
    text: "운동",
  },
  {
    color: "yellow",
    image: "/images/description_yellow.png",
    description: "매일 아침\n일어나자마자\n이부자리 정리하기",
    backgroundColor: "#F3D37B",
    text: "생활루틴",
  },
  {
    color: "gray",
    image: "/images/description_gray.png",
    description: "외할머니댁 가서\n김장 김치\n가지고 오기",
    backgroundColor: "#B2B2B2",
    text: "기타",
  },
];

const CategoryList = ({ onCategoryClick, currentCategory }) => {
  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category); // 클릭된 카테고리를 상위 컴포넌트에 전달
    }
  };

  return (
    <div className="category-layout">
      <div className="category-column left-column">
        {leftCategories.map((category) => (
          <CategoryItem
            key={category.color}
            color={category.color}
            isActive={currentCategory?.color === category.color}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <div className="description-wrapper">
        <DescriptionBox
          image={currentCategory?.image || "/images/description_default.png"}
          description={currentCategory?.description || "오늘 하루 다른 사람들은\n어떤 뚜두를 실천하고 있을까요?\n양옆의 편지 봉투를 눌러 보세요."}
          color={currentCategory?.color || "default"} 
        />
      </div>

      <div className="category-column right-column">
        {rightCategories.map((category) => (
          <CategoryItem
            key={category.color}
            color={category.color}
            isActive={currentCategory?.color === category.color}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
