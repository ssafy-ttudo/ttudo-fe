import React from 'react';
import '../CSS/DduduList.css';
import viewimg from '../image/Union.png';

const DduduList = ({ data = [] }) => {
  return (
    <div className="ddudulist-container">
      <div className="ddudulist-title">마이 뚜두 리스트</div>
      <div className="ddudulist-content">
        <table className="ddudu-table">
          <thead>
            <tr className="ddudulist-col">
              <th>카테고리</th>
              <th>뚜두 제목</th>
              <th>좋아요 수</th>
              <th>달성자 수</th>
              <th>달성 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="ddudulist-row" key={index}>
                {/* 카테고리 */}
                <td className={`category ${item.category?.toLowerCase() || 'default'}`}>
                  {item.category || '기본 카테고리'}
                </td>
                {/* 뚜두 제목 */}
                <td>{item.title}</td>
                {/* 좋아요 수 */}
                <td>{item.likes || 0}회</td>
                {/* 달성자 수 */}
                <td>{item.achievers || 0}명</td>
                {/* 달성 여부 */}
                <td className={`status ${item.completed ? 'completed' : 'not-completed'}`}>
                  {item.completed ? 'Y' : 'N'}
                </td>
                {/* 보기 버튼 */}
                <td>
                  <button className="ddudu-view-button">
                    <img src={viewimg} alt="보기" className="view-img" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DduduList;
