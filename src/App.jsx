import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from "./components/board/Board";
import BoardDetail from "./components/board/BoardDetail";
import BoardCreate from './components/board/BoardCreate';
import BoardEdit from './components/board/BoardEdit'; // BoardEdit 컴포넌트 추가

function App() {
 return (
   <Router>
     <div>
       <Routes>
         <Route path="/boards" element={<Board />} />
         <Route path="/article/:articleId/detail_update_delete" element={<BoardDetail />} />
         <Route path="/article/create" element={<BoardCreate />} />
         <Route path="/article/:articleId/edit" element={<BoardEdit />} /> {/* BoardEdit 라우트 추가 */}
         <Route path="/" element={<Board />} />
       </Routes>
     </div>
   </Router>
 );
}

export default App;
