import React, { useState } from 'react';
import Header from "./Header";
import './BoardDetail.css';

import boardMainImage from "../../assets/board/boardmain.png";
import subtractImage from "../../assets/board/Subtract.png";
import heartImage from "../../assets/board/Heart.png"

const BoardDetail = () => {
  const [post] = useState({
    id: 1,
    author: "이해인",
    content: "후후 아침은 메시지 첫 줄이는 책 워시리스트등입니다 답례 게다 다 또 판매를 좋아하는선데(최 영 울사님 또 들고 바쁜 것은 좋아요 뒤죄송이나 낭만인듯 ㅎㅎ) 짐싸여 일주일는 식감이 같지 가 계시나시네 맛커 때패를 또 딘테로 가고 또 가서 처럭",
    date: "2024.11.2",
    title: "오늘은 코딩공부를 열심히 했어요!",
    category: "운동",
    isAuthor: true,
    like_count: 2,
    achievementCount: 45,
    isAchieved: false,
    comments: [
      {
        id: 1,
        author: "박보성",
        content: "저도많이 먹어 최선인데? 히 최선인가요 아아 얼떨어 ㅋ...",
        date: "2024.11.2",
        likes: 1,
        replies: [ // 대댓글 추가
          {
            id: 2,
            author: "이해인",
            content: "울산이면 오세카 하더가...__,_;;",
            date: "2024.11.2",
            likes: 5
          }
        ]
      }
    ]
  });

  const handleEdit = () => {
    // 수정 기능 구현
    console.log("수정하기");
  };

  const handleDelete = () => {
    // 삭제 기능 구현
    console.log("삭제하기");
  };

  const handleAchievement = () => {
    // 달성 기능 구현
    console.log("달성 토글");
  };

  return (
    <>
      <Header />
      <div className="detail-container">
        <div className="detail-frame">
          <div className="detail-wrapper">
            <img src={boardMainImage} alt="main area" className="detail-main-image" />
            <img src={subtractImage} alt="top bar" className="detail-top-bar" />

            <div className="detail-post-container">
              <div className="detail-post-content">
                {/* 프로필 및 액션 영역 */}
                <div className="detail-header">
                  <div className="detail-profile">
                    <div className="detail-profile-circle"></div>
                    <span className="detail-profile-name">{post.author}</span>
                    <span className="detail-category">{post.category}</span>
                    <span className="detail-date">{post.date}</span>
                  </div>
                  {post.isAuthor && (
                    <div className="detail-actions">
                      <button className="detail-action-btn">수정</button>
                      <button className="detail-action-btn">삭제</button>
                    </div>
                  )}
                </div>

                <div className="detail-title">
                  {post.title}
                </div>
                {/* 본문 영역 */}
                <div className="detail-main-content">
                  <div className="detail-content-wrapper">
                    <div className="detail-text">
                      {post.content}
                    </div>
                  </div>
                </div>

                {/* 달성 영역 */}
                <div className="detail-footer">
                  <div className="detail-like-achievement">
                    <div className="detail-like-count">
                      좋아요 {post.like_count}회 <img src={heartImage} alt="heartImage" className='heart-image' />
                    </div>
                    <p>|</p>
                    <div className="detail-achievement-count">
                      {post.achievementCount}명 달성
                    </div>
                  </div>
                  <button 
                    className={`detail-achievement-btn ${post.isAchieved ? 'achieved' : ''}`}
                    onClick={handleAchievement}
                  >
                    {post.isAchieved ? '✓ 달성 완료' : '아직 달성하지 않았어요'}
                  </button>
                </div>

                {/* 댓글 영역 */}
                <div className="detail-comments">
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      {/* 원댓글 */}
                      <div className="detail-comment-item">
                        <div className="detail-comment-profile">
                          <div className="detail-comment-profile-circle"></div>
                          <span className="detail-comment-name">{comment.author}</span>
                          <span className="detail-comment-date">{comment.date}</span>
                          <span className="detail-comment-likes">신고 {comment.likes}</span>
                        </div>
                        <div className="detail-comment-text">
                          {comment.content}
                        </div>
                      </div>
                      
                      {/* 대댓글 */}
                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="detail-comment-reply">
                          <div className="detail-comment-profile">
                            <div className="detail-comment-profile-circle"></div>
                            <span className="detail-comment-name">{reply.author}</span>
                            <span className="detail-comment-date">{reply.date}</span>
                            <span className="detail-comment-likes">신고 {reply.likes}</span>
                          </div>
                          <div className="detail-comment-text">
                            {reply.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;