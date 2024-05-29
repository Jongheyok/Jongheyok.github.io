import React, { useState } from 'react';
import './components/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert('사용자 이름과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 서버로 로그인 요청 보내기
      const response = await axios.post('/api/login', { username, password });

      // 로그인 성공 시 메인 페이지로 이동
      console.log(response.data); // 로그인 성공 메시지
      navigate('/');
    } catch (error) {
      // 서버로부터 오류 응답 받을 경우
      alert('잘못된 사용자 이름 또는 비밀번호입니다.');
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Log In</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">ID:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <label htmlFor="password">PASSWORD:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input type="submit" value="로그인" />
        {/* 아이디와 비밀번호 찾기 버튼 */}
        <div>
          <button onClick={() => navigate('/find_username')}>아이디 찾기</button>
          <button onClick={() => navigate('/reset_password')} style={{ marginLeft: '15px' }}>비밀번호 찾기</button>
          <button onClick={() => navigate('/register')} style={{ marginLeft: '15px' }}>회원가입</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
