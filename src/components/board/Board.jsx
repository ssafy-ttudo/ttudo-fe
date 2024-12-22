import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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

// axios 인스턴스 생성
const api = axios.create({
 baseURL: 'http://127.0.0.1:8000',
 timeout: 10000,
 headers: {
   'Content-Type': 'application/json',
 }
});

const Board = () => {
 const navigate = useNavigate();
 const [activeCategory, setActiveCategory] = useState("all");
 const [currentPage, setCurrentPage] = useState(1);
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [totalPages, setTotalPages] = useState(1);
 const postsPerPage = 6;

 // 게시글 클릭 핸들러
 const handlePostClick = (articleId) => {
   navigate(`/article/${articleId}/detail_update_delete`);
 };

 // API에서 데이터 가져오기 및 필터링
 useEffect(() => {
   const fetchFilteredPosts = async () => {
     try {
       const url = activeCategory === "all" 
         ? `/boards/?page=${currentPage}`
         : `/boards/${activeCategory}/?page=${currentPage}`;
       
       const response = await api.get(url);
       
       // 백엔드 응답 구조에 맞게 수정
       setPosts(response.data.results);
       // 전체 페이지 수 계산 (총 아이템 수 / 페이지당 아이템 수)
       const totalItems = response.data.count;
       setTotalPages(Math.ceil(totalItems / postsPerPage));
       
     } catch (error) {
       if (axios.isAxiosError(error)) {
         if (error.response) {
           console.log('Response error:', error.response.data);
         } else if (error.request) {
           console.log('Request error:', error.request);
         }
       }
       console.log('Error fetching data:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchFilteredPosts();
 }, [currentPage, activeCategory]);

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
   'lifestyle': {
     color: '#5C4B99',
     gunImage: routineGunImage,
   },
   'celebrity': {
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
   { id: "lifestyle", label: "생활루틴", image: routineImage },
   { id: "celebrity", label: "셀럽", image: celebImage },
   { id: "etc", label: "기타", image: etcImage },
 ];

 // 페이지 변경 핸들러
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 if (loading) {
   return <div>Loading...</div>;
 }

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
                 onClick={() => {
                   setActiveCategory(category.id);
                   setCurrentPage(1); // 카테고리 변경시 첫 페이지로
                 }}
                 alt={category.label}
               />
             ))}
           </div>

           <img src={subtractImage} alt="top bar" className="top-bar-image" />

           {/* 게시물 목록 */}
           <div className="posts-container">
             <div className="posts-grid">
               {posts.map((post) => (
                 <div 
                   key={post.id} 
                   className="post-item"
                   onClick={() => handlePostClick(post.id)}
                   style={{ cursor: 'pointer' }}
                 >
                   {/* 프로필 영역 */}
                   <div className="post-profile">
                     <div className="profile-circle"></div>
                     <span className="profile-name">닉네임</span>
                     <span className="post-date">{post.days_since_created}일 전</span>
                   </div>

                  {/* 컨텐츠 영역 */}
                  <div className="post-content">
                    <div className="content-wrapper">
                      {post.image && (
                        <div className="image-container">
                          <img 
                            src={`http://127.0.0.1:8000${post.image}`} 
                            alt="게시글 이미지" 
                            className="post-image"
                          />
                        </div>
                      )}
                      <div className="text-content">
                        <h3 className="post-title">{post.title}</h3>
                      </div>
                      {post.category_name !== 'all' && categoryInfo[post.category_name] && (
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
                     {post.like_count > 0 
                       ? `${post.like_count}명이 담았어요` 
                       : '아직 담은 사람이 없어요'
                     }
                     {post.recent_liked_user && ` (${post.recent_liked_user}님 외)`}
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
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "pagination-number active" : "pagination-number"}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            className="pagination-arrow"
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
          <button 
            onClick={() => navigate('/article/create')} 
            className="create-post-button"
          >
            포스트 작성하기
          </button>
        </div>
       </div>
     </div>
   </>
 );
};

export default Board;