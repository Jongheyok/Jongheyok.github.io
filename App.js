import React, { useState } from 'react';
import './components/App.css';
import NoticeBoard from './NoticeBoard';
import Map from './Map';
import Login from './Login';
import Register from './Register';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';


function App() {
  const [isSearchPopupVisible, setSearchPopupVisible] = useState(false); 
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigate = useNavigate(); //useNavigate 훅 사용

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
    // 검색 로직 구현 필요
  };

  const goToLogin = () => {
    navigate('/login'); //navigate 함수로 이동
  };

  const goToRegister =() => {
    navigate('/register'); //navigate 함수로 이동
  };  

  return (
    <div className="App">
      <header>
        <Link id="homeButton" to="/">HOME</Link>
        <h1>Cooking Buddy</h1>
        <div id="notification">

          {/* 검색 */}
          <button id="searchRecipesButton" onClick={toggleSearchPopup} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src="png/search.png" alt="Recipe search button" />
          </button>

          {/* 채팅 */}
          <button id="chatNotificationButton" onClick={toggleNotification} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src="png/speech_bubble.png" alt="Chat notification image" />
            {notificationVisible && (
              <span id="notificationBadge" style={{ display: 'block', position: 'absolute', top: 0, right: 0, backgroundColor: 'red', width: '20px', height: '20px', borderRadius: '50%', color: 'white', textAlign: 'center', lineHeight: '20px' }}>!</span>
            )}
          </button>

          {/* 로그인 및 회원가입 */}
          <button id = "loginButton" onClick={goToLogin}>log in</button>|
          <button id="registerButton" onClick={goToRegister}>sign up</button>
        </div>
        
        {/* 검색 */}
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <NoticeBoard />
      <Map />
    </div>
  );
}
export default App;
