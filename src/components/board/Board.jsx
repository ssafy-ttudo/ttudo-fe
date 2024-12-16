import React, { useState } from "react";
import './Board.css';
import Header from "./Header";

// 기본 카테고리 이미지들
import allImage from '../../assets/board/all.png';
import learningImage from '../../assets/board/learning.png';
import exerciseImage from '../../assets/board/exercise.png';
import foodImage from '../../assets/board/food.png';
import routineImage from '../../assets/board/routine.png';
import celebImage from '../../assets/board/celeb.png';
import etcImage from '../../assets/board/etc.png';
import boardMainImage from '../../assets/board/boardmain.png';
import subtractImage from '../../assets/board/Subtract.png';

// 카테고리 gun 이미지들
import learningGunImage from '../../assets/board/learninggun.png';
import exerciseGunImage from '../../assets/board/exercisegun.png';
import foodGunImage from '../../assets/board/foodgun.png';
import routineGunImage from '../../assets/board/routinegun.png';
import celebGunImage from '../../assets/board/celebgun.png';
import etcGunImage from '../../assets/board/etcgun.png';

const Board = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 게시물 데이터
  const postsData = [
    {
      id: 1,
      content: "오늘은 코딩공부를 열심히 했어요!",
      category_name: "learning",
      like_count: 2,
      create_date: "2021-10-01T12:00:00",
    },
    {
      id: 2,
      content: "오늘은 헬스장에서 운동을 했어요!",
      category_name: "exercise",
      like_count: 3,
      create_date: "2021-10-02T12:00:00",
    },
    {
      id: 3,
      content: "오늘은 친구와 맛있는 저녁을 먹었어요!",
      category_name: "food",
      like_count: 1,
      create_date: "2021-10-03T12:00:00",
    },
    {
      id: 4,
      content: "오늘은 일찍 일어나서 운동을 했어요!",
      category_name: "routine",
      like_count: 0,
      create_date: "2021-10-04T12:00:00",
    },
    {
      id: 5,
      content: "오늘은 셀럽을 만났어요!",
      category_name: "celeb",
      like_count: 5,
      create_date: "2021-10-05T12:00:00",
    },
    {
      id: 6,
      content: "오늘은 새로운 취미를 시작했어요!",
      category_name: "etc",
      like_count: 0,
      create_date: "2021-10-06T12:00:00",
    },
  ];

  // 카테고리 정보 (색상 및 이미지)
  const categoryInfo = {
    'learning': {
      color: '#2B3A55',
      gunImage: learningGunImage,
    },
    'exercise': {
      color: '#116D6E',
      gunImage: exerciseGunImage,
    },
    'food': {
      color: '#CD1818',
      gunImage: foodGunImage,
    },
    'routine': {
      color: '#5C4B99',
      gunImage: routineGunImage,
    },
    'celeb': {
      color: '#FF9B9B',
      gunImage: celebGunImage,
    },
    'etc': {
      color: '#726A95',
      gunImage: etcGunImage,
    }
  };

  // 카테고리 목록
  const categories = [
    { id: "all", label: "전체", image: allImage },
    { id: "learning", label: "학습", image: learningImage },
    { id: "exercise", label: "운동", image: exerciseImage },
    { id: "food", label: "음식", image: foodImage },
    { id: "routine", label: "생활루틴", image: routineImage },
    { id: "celeb", label: "셀럽", image: celebImage },
    { id: "etc", label: "기타", image: etcImage },
  ];

  // 카테고리 필터링
  const filteredPosts = activeCategory === "all"
    ? postsData
    : postsData.filter((post) => post.category_name === activeCategory);

  // 페이지네이션
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 날짜 포맷팅
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays}일 전`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}개월 전`;
    }
  };

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="board-container">
        <div className="main-frame-container">
          <div className="main-content-wrapper">
            <img src={boardMainImage} alt="main area" className="main-area-image" />
            
            {/* 카테고리 선택 영역 */}
            <div className="category-list">
              {categories.map((category) => (
                <img
                  key={category.id}
                  src={category.image}
                  className={`category-button ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                  alt={category.label}
                />
              ))}
            </div>

            <img src={subtractImage} alt="top bar" className="top-bar-image" />

            {/* 게시물 목록 */}
            <div className="posts-container">
              <div className="posts-grid">
                {currentPosts.map((post) => (
                  <div key={post.id} className="post-item">
                    {/* 프로필 영역 */}
                    <div className="post-profile">
                      <div className="profile-circle"></div>
                      <span className="profile-name">닉네임</span>
                      <span className="post-date">{formatTimeAgo(post.create_date)}</span>
                    </div>

                    {/* 컨텐츠 영역 */}
                    <div className="post-content">
                      <div className="content-wrapper">
                        <div className="text-content">
                          {post.content}
                        </div>
                        {post.category_name !== 'all' && (
                          <div className="category-image">
                            <img 
                              src={categoryInfo[post.category_name].gunImage}
                              alt={post.category_name}
                              className="category-gun-image"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 좋아요 카운트 */}
                    <div className="like-count">
                      {post.like_count > 0 ? `${post.like_count}명이 담았어요` : '아직 담은 사람이 없어요'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="board-pagination">
            <button 
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className="pagination-arrow"
            >
              ◀
            </button>
            {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "pagination-number active" : "pagination-number"}
              >
                {index + 1}
              </button>
            ))}
            <button 
              onClick={() => currentPage < Math.ceil(filteredPosts.length / postsPerPage) && paginate(currentPage + 1)}
              className="pagination-arrow"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;