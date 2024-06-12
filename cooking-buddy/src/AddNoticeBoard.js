import React, { useState } from 'react';
import axios from 'axios';
import './components/AddNoticeBoard.css';

function AddNoticeBoard({ addNotice }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [publicity, setPublicity] = useState('public');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('publicity', publicity);

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      addNotice(response.data);
      setTitle('');
      setContent('');
      setImage(null);
      setPublicity('public');
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div className="add-notice-board">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="editor-toolbar">
          {/* 에디터 툴바 버튼들 추가 */}
          <button type="button"><b>B</b></button>
          <button type="button"><i>I</i></button>
          <button type="button"><u>U</u></button>
          <button type="button">H1</button>
          <button type="button">H2</button>
          <button type="button">Link</button>
          <button type="button">Image</button>
          <button type="button">Video</button>
          <button type="button">Quote</button>
          <button type="button">List</button>
          <button type="button">Code</button>
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        
        <div className="form-group">
          <select value={publicity} onChange={(e) => setPublicity(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="submit-buttons">
          <button type="submit" className="publish">Publish</button>
          <button type="button" className="save-draft">Save Draft</button>
        </div>
      </form>
    </div>
  );
}

export default AddNoticeBoard;
