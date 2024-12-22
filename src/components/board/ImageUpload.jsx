import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            alert('이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('category_name', '학습');
        formData.append('title', '과제');
        formData.append('content', '내일까지 과제 완료!');

        try {
            const response = await axios.post('http://127.0.0.1:8000/boards/article/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.status === 201) {
                alert('이미지 업로드 성공!');
                setSelectedImage(null);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <div className="upload-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    className="image-input"
                    placeholder="이미지를 업로드하세요"
                    value={selectedImage ? selectedImage.name : ''}
                    readOnly
                />
                <label className="file-input-label">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <span className="upload-button">파일 첨부</span>
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
