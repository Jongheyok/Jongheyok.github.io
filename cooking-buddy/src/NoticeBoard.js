import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './components/NoticeBoard.css';
import { Link } from 'react-router-dom';

function NoticeBoard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  return (
    <div id="NoticeBoard">
      <h2>Notice Board</h2>
      <Link to="/add-notice">
        <button id="addPostButton" style={{ padding: '0.5em', margin: '10px', fontSize: '1em', cursor: 'pointer' }}>+</button>
      </Link>
      <div className="posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} fetchPosts={fetchPosts} />
        ))}
      </div>
    </div>
  );
}

function Post({ post, fetchPosts }) {
  const handleRecommend = async () => {
    try {
      await axios.post(`/api/posts/${post._id}/recommend`);
      fetchPosts();
    } catch (error) {
      console.error('Error recommending post', error);
    }
  };

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image && <img src={`/uploads/${post.image}`} alt={post.title} />}
      <button onClick={handleRecommend}>Recommend {post.recommendations}</button>
      <Comments postId={post._id} />
    </div>
  );
}

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/posts/${postId}/comments`, { content: comment });
      fetchComments();
      setComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default NoticeBoard;
