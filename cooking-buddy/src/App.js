import React, { useState } from 'react';
import './components/App.css';
import NoticeBoard from './NoticeBoard';
import AddNoticeBoard from './AddNoticeBoard';
import Map from './Map';
import Login from './Login';
import Register from './Register';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [isSearchPopupVisible, setSearchPopupVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notices, setNotices] = useState([]); // 게시판을 관리하는 상태

  const toggleSearchPopup = () => {
    setSearchPopupVisible(!isSearchPopupVisible);
  };

  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible);
  };

  const searchRecipes = (event) => {
    event.preventDefault();
    const input = event.target.elements.recipeSearchInput.value;
    console.log('Searching for recipes:', input);
  };

  // addNotice 함수 정의
  const addNotice = (notice) => {
    setNotices([...notices, notice]);
  };

  return (
    <div className="App">
      <header>
        <Link id="homeButton" to="/">HOME</Link>
        <h1>Cooking Buddy</h1>
        <div id="notification">
          <button id="searchRecipesButton" onClick={toggleSearchPopup} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src="png/search.png" alt="Search" />
          </button>
          <button id="chatNotificationButton" onClick={toggleNotification} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}>
            <img src="png/speech_bubble.png" alt="Chat" />
            {notificationVisible && (
              <span id="notificationBadge" style={{
                display: 'block',
                position: 'absolute',
                top: '-5px', // 적절히 조정하여 아이콘 위에 위치하게 함
                right: '-5px', // 적절히 조정하여 아이콘의 오른쪽 상단에 위치하게 함
                backgroundColor: 'red',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                color: 'white',
                textAlign: 'center',
                lineHeight: '20px',
                zIndex: 1 // 다른 요소들 위에 보이도록 설정
              }}>
                !
              </span>
            )}
          </button>
          <Link to="/login">log in</Link>|
          <Link to="/register">sign up</Link>
        </div>
        {isSearchPopupVisible && (
          <div id="searchPopup" style={{ display: 'block', position: 'fixed', top: '20%', left: '30%', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '40%' }}>
            <form onSubmit={searchRecipes}>
              <input type="text" name="recipeSearchInput" placeholder="Search recipes..." style={{ width: '70%', padding: '10px' }} />
              <button type="submit">Search</button>
              <button type="button" onClick={toggleSearchPopup}>x</button>
            </form>
          </div>
        )}
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <NoticeBoard notices={notices} />
            <h2>Map</h2>
            <Map />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-notice" element={<AddNoticeBoard addNotice={addNotice} />} />
      </Routes>
    </div>
  );
}

export default App;
