import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailHeader from "./DetailHeader";
import './BoardDetail.css';
import boardMainImage from "../../assets/board/boardmain.png";
import subtractImage from "../../assets/board/Subtract.png";
import heartImage from "../../assets/board/Heart.png";
import heartCompleteImage from "../../assets/board/heart2.png";
import clickImage from "../../assets/board/clickimage.png";
import completeImage from "../../assets/board/complete.png";
import commentLike from "../../assets/board/commentlike.png";
import commentLikeComplete from "../../assets/board/commentlike2.png";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const BoardDetail = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isAchieved, setIsAchieved] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const categoryColors = {
    '학습': { border: '#51A9E8', background: '#F0F7FF' },
    '운동': { border: '#2FCC6B', background: '#F0FFF4' },
    '음식': { border: '#FE6364', background: '#FFF0F0' },
    '생활루틴': { border: '#B69619', background: '#FFFBEB' },
    '셀럽': { border: '#AE5DDD', background: '#FAF5FF' },
    '기타': { border: '#8C8C8C', background: '#F8F9FA' }
  };

  const categories = [
    { id: "all", label: "전체" },
    { id: "learning", label: "학습" },
    { id: "exercise", label: "운동" },
    { id: "food", label: "음식" },
    { id: "lifestyle", label: "생활루틴" },
    { id: "celebrity", label: "셀럽" },
    { id: "etc", label: "기타" },
  ];

  const getCategoryLabel = (categoryName) => {
    const category = categories.find(cat => cat.id === categoryName);
    return category ? category.label : categoryName;
  };

  const getCategoryStyle = (categoryLabel) => {
    const colors = categoryColors[categoryLabel];
    return colors ? {
      border: `2px solid ${colors.border}`,
      backgroundColor: colors.background,
      color: colors.border,
      padding: '4px 14px',
      margin: '0 55px',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '18px'
    } : {};
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await api.get(`/boards/article/${articleId}/detail_update_delete/`);
        const postWithCommentLikes = {
          ...response.data,
          comment_set: response.data.comment_set.map(comment => ({
            ...comment,
            is_liked: comment.is_liked || false,
            like_count: comment.like_count || 0
          }))
        };
        setPost(postWithCommentLikes);
        setIsLiked(response.data.is_liked || false);
        setIsAchieved(response.data.is_achieved || false);
      } catch (error) {
        console.log('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [articleId]);

  const handleEdit = () => {
    navigate(`/article/${articleId}/edit`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('게시글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await api.delete(`/boards/article/${articleId}/detail_update_delete/`);
        if (response.status === 204) {
          alert('게시글이 삭제되었습니다.');
          navigate('/boards');
        } else {
          alert('게시글 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await api.post(`/boards/article/${articleId}/like/`);
      if (response.status === 200 || response.status === 201) {
        setIsLiked(!isLiked);
        setPost(prevPost => ({
          ...prevPost,
          like_count: isLiked ? prevPost.like_count - 1 : prevPost.like_count + 1,
          is_liked: !isLiked
        }));
      }
    } catch (error) {
      console.log('Error toggling post like:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await api.post(`/boards/article/${articleId}/comment_create/`, {
          content: newComment
        });
        if (response.status === 201) {
          setPost(prevPost => ({
            ...prevPost,
            comment_set: [...prevPost.comment_set, response.data]
          }));
          setNewComment('');
        }
      } catch (error) {
        console.log('Error submitting comment:', error);
      }
    }
  };

  const handleCommentEdit = async (commentId) => {
    try {
      const response = await api.put(`/boards/article/${articleId}/comment/${commentId}/detail_update_delete/`, {
        content: editCommentContent
      });
      if (response.status === 200) {
        setPost(prevPost => ({
          ...prevPost,
          comment_set: prevPost.comment_set.map(comment => 
            comment.id === commentId
              ? { ...comment, content: editCommentContent }
              : comment
          )
        }));
        setEditingCommentId(null);
        setEditCommentContent('');
      }
    } catch (error) {
      console.log('Error editing comment:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await api.delete(`/boards/article/${articleId}/comment/${commentId}/detail_update_delete/`);
        if (response.status === 204) {
          setPost(prevPost => ({
            ...prevPost,
            comment_set: prevPost.comment_set.filter(comment => comment.id !== commentId)
          }));
        }
      } catch (error) {
        console.log('Error deleting comment:', error);
      }
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (newReply.trim()) {
      try {
        const response = await api.post(`/boards/article/${articleId}/comment_create/`, {
          content: newReply,
          parent_comment: commentId
        });
        if (response.status === 201) {
          setPost(prevPost => ({
            ...prevPost,
            comment_set: prevPost.comment_set.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), response.data]
                };
              }
              return comment;
            })
          }));
          setNewReply('');
          setReplyingTo(null);
        }
      } catch (error) {
        console.log('Error submitting reply:', error);
      }
    }
  };

  const handleReplyEdit = async (commentId, replyId, content) => {
    try {
      const response = await api.put(`/boards/article/${articleId}/comment/${replyId}/detail_update_delete/`, {
        content: content
      });
      if (response.status === 200) {
        setPost(prevPost => ({
          ...prevPost,
          comment_set: prevPost.comment_set.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === replyId
                    ? { ...reply, content: content }
                    : reply
                )
              };
            }
            return comment;
          })
        }));
        setEditingCommentId(null);
        setEditCommentContent('');
      }
    } catch (error) {
      console.log('Error editing reply:', error);
    }
  };

  const handleReplyDelete = async (commentId, replyId) => {
    const isConfirmed = window.confirm('답글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await api.delete(`/boards/article/${articleId}/comment/${replyId}/detail_update_delete/`);
        if (response.status === 204) {
          setPost(prevPost => ({
            ...prevPost,
            comment_set: prevPost.comment_set.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.filter(reply => reply.id !== replyId)
                };
              }
              return comment;
            })
          }));
        }
      } catch (error) {
        console.log('Error deleting reply:', error);
      }
    }
  };
  
  const handleCommentLike = async (commentId) => {
    try {
      const response = await api.post(`/boards/article/comment/${commentId}/like/`);
      if (response.status === 200 || response.status === 201) {
        setPost(prevPost => ({
          ...prevPost,
          comment_set: prevPost.comment_set.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                is_liked: !comment.is_liked,
                like_count: comment.is_liked ? comment.like_count - 1 : comment.like_count + 1
              };
            }
            return comment;
          })
        }));
      }
    } catch (error) {
      console.log('Error toggling comment like:', error);
    }
  };

  const handleAchievement = async () => {
    try {
      const response = await api.post(`/boards/article/${articleId}/is_completed/`);
      if (response.status === 200 || response.status === 201) {
        setIsAchieved(response.data.is_completed);
        setPost(prevPost => ({
          ...prevPost,
          is_completed: response.data.is_completed
        }));
      }
    } catch (error) {
      console.log('Error toggling achievement:', error);
    }
  };

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  const categoryLabel = getCategoryLabel(post.category_name);

  return (
    <>
      <DetailHeader />
      <div className="detail-container">
        <div className="detail-frame">
          <div className="detail-wrapper">
            <img src={boardMainImage} alt="main area" className="detail-main-image" />
            <img src={subtractImage} alt="top bar" className="detail-top-bar" />
            <div className="detail-post-container">
              <div className="detail-post-content">
                <div className="detail-header">
                  <div className="detail-profile">
                    <div className="detail-profile-circle"></div>
                    <div className="detail-profile-name">{post.user || '익명'}</div>
                    <span style={getCategoryStyle(categoryLabel)}>{categoryLabel}</span>
                    <span className="detail-date">{formatDate(post.create_date)}</span>
                  </div>
                  <div className="detail-actions">
                    <button className="detail-action-btn" onClick={handleEdit}>수 정</button>
                    <button className="detail-action-btn" onClick={handleDelete}>삭 제</button>
                  </div>
                </div>
                <div className="detail-title">
                  {post.title}
                </div>
                <div className="detail-main-content">
                  <div className="detail-content-wrapper">
                    <div className="detail-text">
                      {post.content}
                    </div>
                  </div>
                </div>
                <div className="detail-footer">
                  <div className="detail-like-achievement">
                    <div className="detail-like-count">
                      좋아요 {post.like_count}회
                      <img
                        src={isLiked ? heartCompleteImage : heartImage}
                        alt="heartImage"
                        className='heart-image'
                        onClick={handleLike}
                      />
                    </div>
                    <p>|</p>
                    <div className="detail-achievement-count">
                      {post.achieved_count}명 달성
                    </div>
                  </div>
                  <button className="detail-achievement-btn" onClick={handleAchievement}>
                    <img
                      src={isAchieved ? completeImage : clickImage}
                      alt="achievement"
                      className="achievement-image"
                    />
                  </button>
                </div>

                {/* 댓글 입력 폼 */}
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className='comment-textarea'
                  />
                  <button type="submit">등 록</button>
                </form>

                {/* 댓글 목록 */}
                <div className="detail-comments">
                  {post.comment_set && post.comment_set.map((comment) => (
                    <div key={comment.id}>
                      <div className="detail-comment-item">
                        <div className="detail-comment-profile-circle"></div>
                        <div className="comment-content-wrapper">
                          <div className="comment-header">
                            <span className="detail-comment-name">{comment.user || '익명'}</span>
                            <span className="detail-comment-date">{formatDate(comment.created_at)}</span>
                          </div>
                          <div className="comment-body">
                            {editingCommentId === comment.id ? (
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                handleCommentEdit(comment.id);
                              }}>
                                <textarea
                                  value={editCommentContent}
                                  onChange={(e) => setEditCommentContent(e.target.value)}
                                  className="comment-edit-textarea"
                                />
                                <div className="comment-edit-actions">
                                  <button type="button" onClick={() => {
                                    setEditingCommentId(null);
                                    setEditCommentContent('');
                                  }}>취소</button>
                                  <button type="submit">수정완료</button>
                                </div>
                              </form>
                            ) : (
                              <>
                                <div className="detail-comment-text">
                                  {comment.content}
                                </div>
                                <div className="comment-actions">
                                  <button className="reply-button"
                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                  >
                                    답글
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setEditingCommentId(comment.id);
                                      setEditCommentContent(comment.content);
                                    }}
                                    className="comment-edit-btn"
                                  >
                                    수정
                                  </button>
                                  <button 
                                    onClick={() => handleCommentDelete(comment.id)}
                                    className="comment-delete-btn"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="detail-comment-likes">
                          <img
                            src={comment.is_liked ? commentLikeComplete : commentLike}
                            alt="like"
                            className="comment-heart-image"
                            onClick={() => handleCommentLike(comment.id)}
                          />
                          <span className="detail-comment-like-count">{comment.like_count}</span>
                        </div>
                      </div>

                      {/* 답글 입력 폼 */}
                      {replyingTo === comment.id && (
                        <form 
                          onSubmit={(e) => handleReplySubmit(e, comment.id)} 
                          className="reply-form"
                        >
                          <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="답글을 입력하세요..."
                            className="reply-textarea"
                          />
                          <div className="reply-form-actions">
                            <button type="button" onClick={() => setReplyingTo(null)}>취소</button>
                            <button type="submit">답글 작성</button>
                          </div>
                        </form>
                      )}

                      {/* 답글 목록 */}
                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="detail-comment-reply">
                          <div className="detail-comment-profile-circle"></div>
                          <div className="comment-content-wrapper">
                            <div className="comment-header">
                              <span className="detail-comment-name">{reply.user || '익명'}</span>
                              <span className="detail-comment-date">{formatDate(reply.created_at)}</span>
                            </div>
                            <div className="comment-body">
                              {editingCommentId === reply.id ? (
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  handleReplyEdit(comment.id, reply.id, editCommentContent);
                                }}>
                                  <textarea
                                    value={editCommentContent}
                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                    className="comment-edit-textarea"
                                  />
                                  <div className="comment-edit-actions">
                                    <button type="button" onClick={() => {
                                      setEditingCommentId(null);
                                      setEditCommentContent('');
                                    }}>취소</button>
                                    <button type="submit">수정완료</button>
                                  </div>
                                </form>
                              ) : (
                                <>
                                  <div className="detail-comment-text">
                                    {reply.content}
                                  </div>
                                  <div className="comment-actions">
                                    <button 
                                      onClick={() => {
                                        setEditingCommentId(reply.id);
                                        setEditCommentContent(reply.content);
                                      }}
                                      className="comment-edit-btn"
                                    >
                                      수정
                                    </button>
                                    <button 
                                      onClick={() => handleReplyDelete(comment.id, reply.id)}
                                      className="comment-delete-btn"
                                    >
                                      삭제
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="detail-comment-likes">
                            <img
                              src={reply.is_liked ? commentLikeComplete : commentLike}
                              alt="like"
                              className="comment-heart-image"
                              onClick={() => handleCommentLike(reply.id)}
                            />
                            <span className="like-count">{reply.like_count}</span>
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