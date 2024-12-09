import React from 'react';

const DduduList = ({ data }) => {
  return (
    <div className="ddudulist-container">
      <div className="ddudulist-title">마이 뚜두 리스트</div>
      <div className="ddudulist-content">
        <table className="ddudu-table">
          <thead>
            <tr>
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
              <tr key={index}>
                <td> category</td>
                {/* <td className={`category ${item.category.toLowerCase()}`}>{item.category}</td> */}
                <td>{item.title}</td>
                <td>{item.likes}회</td>
                <td>{item.achievers}명</td>
                <td>{item.completed ? 'Y' : 'N'}</td>
                <td><button className="view-button">🔍</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DduduList;
