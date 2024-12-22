// BoardCreate.jsx
import React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import boardMainImage from "../../assets/board/boardmain.png"
import subtractImage from "../../assets/board/Subtract.png"
import DetailHeader from "./DetailHeader"
import "./BoardCreate.css"
import ImageUpload from "./ImageUpload"

const BoardCreate = () => {
 const navigate = useNavigate();
 const [selectedCategory, setSelectedCategory] = useState('');
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');

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

 const getCategoryEnglishName = (koreanName) => {
   const categoryMap = {
     '학습': 'learning',
     '운동': 'exercise',
     '음식': 'food',
     '생활루틴': 'lifestyle',
     '셀럽': 'celebrity',
     '기타': 'etc'
   };
   return categoryMap[koreanName];
 };

 const handleSave = async () => {
   if (!title || !content || !selectedCategory) {
     alert('모든 필드를 입력해주세요.');
     return;
   }

   try {
     const response = await axios.post('http://127.0.0.1:8000/boards/article_create/', {
       category_name: getCategoryEnglishName(selectedCategory),
       title: title,
       content: content,
       image: null,
       user: null
     });

     if (response.status === 201 || response.status === 200) {
       navigate('/boards');
     }
   } catch (error) {
     console.error('Error creating post:', error);
     alert('게시글 작성에 실패했습니다.');
   }
 };

 const handleCancel = () => {
   navigate('/boards');
 };

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
                  backgroundColor: selectedCategory === category ? categoryColors[category].background : '#EAF3FF',  // 여기를 수정
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
             <button onClick={handleSave}>저 장</button>
           </div>
         </div>
       </div>
     </div>
   </>
 );
};

export default BoardCreate;