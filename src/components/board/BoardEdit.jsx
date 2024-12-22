import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import boardMainImage from "../../assets/board/boardmain.png"
import subtractImage from "../../assets/board/Subtract.png"
import DetailHeader from "./DetailHeader"
import "./BoardCreate.css"
import ImageUpload from "./ImageUpload"

const BoardEdit = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 카테고리 매핑 정보 추가
  const categoryMapping = {
    'learning': '학습',
    'exercise': '운동',
    'food': '음식',
    'lifestyle': '생활루틴',
    'celebrity': '셀럽',
    'etc': '기타'
  };

  // 역방향 매핑 추가 (한글 -> 영문)
  const reverseCategoryMapping = {
    '학습': 'learning',
    '운동': 'exercise',
    '음식': 'food',
    '생활루틴': 'lifestyle',
    '셀럽': 'celebrity',
    '기타': 'etc'
  };

  const categories = [
    '학습', '운동', '음식', '생활루틴', '셀럽', '기타'
  ];

  const categoryColors = {
    '학습': {
      border: '#51A9E8',
      background: '#F0F7FF'
    },
    '운동': {
      border: '#2FCC6B',
      background: '#F0FFF4'
    },
    '음식': {
      border: '#FE6364',
      background: '#FFF0F0'
    },
    '생활루틴': {
      border: '#B69619',
      background: '#FFFBEB'
    },
    '셀럽': {
      border: '#AE5DDD',
      background: '#FAF5FF'
    },
    '기타': {
      border: '#8C8C8C',
      background: '#F8F9FA'
    }
  };

  // 게시글 정보 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/boards/article/${articleId}/detail_update_delete/`);
        setTitle(response.data.title);
        setContent(response.data.content);
        // API에서 받은 영문 카테고리를 한글로 변환
        setSelectedCategory(categoryMapping[response.data.category_name] || response.data.category_name);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [articleId]);

  // 수정 완료 핸들러
  const handleSave = async () => {
    if (!title || !content || !selectedCategory) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/boards/article/${articleId}/detail_update_delete/`, {
        title: title,
        content: content,
        // 선택된 한글 카테고리를 영문으로 변환하여 전송
        category_name: reverseCategoryMapping[selectedCategory],
        image: null,
        user: null
      });

      if (response.status === 200) {
        navigate(`/article/${articleId}/detail_update_delete`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(`/article/${articleId}/detail_update_delete`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DetailHeader />
      <div className="create-container">
        <div className="create-frame">
          <div className="create-wrapper">
            <img src={boardMainImage} alt="main area" className="create-main-image" />
            <img src={subtractImage} alt="top bar" className="create-top-bar" />
          </div>
          <div className="create-content">
            <div className="create-input">
              <input 
                type="text" 
                placeholder="제목을 입력하세요" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="create-category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    borderColor: selectedCategory === category ? categoryColors[category].border : '#EDF2F7',
                    backgroundColor: selectedCategory === category ? categoryColors[category].background : '#EAF3FF',
                    color: selectedCategory === category ? categoryColors[category].border : '#94A3B8',
                    borderWidth: selectedCategory === category ? '2px' : '2px',
                    fontWeight: selectedCategory === category ? 'bold' : 'normal'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="create-textarea">
              <textarea 
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <ImageUpload />
            <div className="create-button">
              <button onClick={handleCancel}>취 소</button>
              <button onClick={handleSave}>수정완료</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardEdit;