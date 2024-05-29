import React from 'react';

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="username">ID:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">PASSWORD:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;
