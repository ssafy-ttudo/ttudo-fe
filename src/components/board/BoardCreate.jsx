import React from "react"
import { useState } from "react"
import axios from "axios"
import boardMainImage from "../../assets/board/boardmain.png"
import subtractImage from "../../assets/board/Subtract.png"
import Header from "./Header"
import "./BoardCreate.css"

const BoardCreate = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // 기본값 설정

  const categories = [
    '학습', '운동', '음식', '생활루틴', '셀럽', '기타'
  ];

  return (
    <>
      <Header />
      <div className="create-container">
        <div className="create-frame">
          <div className="create-wrapper">
            <img src={boardMainImage} alt="main area" className="create-main-image" />
            <img src={subtractImage} alt="top bar" className="create-top-bar" />
          </div>
          <div className="create-content">
            <div className="create-input">
              <input type="text" placeholder="제목을 입력하세요" />
            </div>
            <div className="create-category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="create-textarea">
              <textarea placeholder="내용을 입력하세요" />
            </div>
            <div className="create-button">
              <button>취 소</button>
              <button>저 장</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCreate
