import React, { useState } from 'react';
import Board from "./components/board/Board";
import BoardDetail from "./components/board/BoardDetail";
import BoardCreate from './components/board/BoardCreate';

function App() {
  const [currentPage, setCurrentPage] = useState('board');

  // 페이지 렌더링 함수
  const renderPage = () => {
    switch(currentPage) {
      case 'board':
        return <Board />;
      case 'detail':
        return <BoardDetail />;
      case 'create':
        return <BoardCreate />;
      default:
        return <Board />;
    }
  };

  return (
    <div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentPage('board')}
          style={{ 
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: currentPage === 'board' ? '#1A415D' : '#fff',
            color: currentPage === 'board' ? '#fff' : '#1A415D',
            border: '1px solid #1A415D',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Board
        </button>
        <button 
          onClick={() => setCurrentPage('detail')}
          style={{ 
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: currentPage === 'detail' ? '#1A415D' : '#fff',
            color: currentPage === 'detail' ? '#fff' : '#1A415D',
            border: '1px solid #1A415D',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          BoardDetail
        </button>
        <button
          onClick={() => setCurrentPage('create')}
          style={{ 
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: currentPage === 'create' ? '#1A415D' : '#fff',
            color: currentPage === 'create' ? '#fff' : '#1A415D',
            border: '1px solid #1A415D',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          BoardCreate
        </button>
      </div>
      
      {renderPage()}
    </div>
  );
}

export default App;