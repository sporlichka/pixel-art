import React, { useState } from 'react';

const Header = ({ setNickname }) => {
  const [nicknameInput, setNicknameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nicknameInput) {
      localStorage.setItem('nickname', nicknameInput);
      setNickname(nicknameInput);
    }
  };

  return (
    <header>
      <h1>PixelArt Maker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
          placeholder="Enter your nickname"
          required
        />
        <button type="submit">Set Nickname</button>
      </form>
    </header>
  );
};

export default Header;
