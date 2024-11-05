import React, { useState } from "react"

// 게시글 하나를 렌더링하는 컴포넌트
const Post = ({ title, content, img }) => (
  <div className="post">
    <h3>{title}</h3>
    <p>{content}</p>
    <img src="" alt="이미지" />
  </div>
)

// 게시판 컴포넌트
const Board = () => {
  // 여기에 받아와야함 (게시판 DB)
  const [posts, setPosts] = useState([
    { title: "1", content: "1", image: "이미지" },
    { title: "2", content: "2", image: "이미지" },
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "" })

  // 새 게시글 추가 함수
  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost])
      setNewPost({ title: "", content: "" })
    }
  }

  return (
    <div className="board">
      <h2>게시판</h2>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} title={post.title} content={post.content} />
        ))}
      </div>

      <div className="new-post">
        <input
          type="text"
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={addPost}>게시글 추가</button>
      </div>
    </div>
  )
}

export default Board
