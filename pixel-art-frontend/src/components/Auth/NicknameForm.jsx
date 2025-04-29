import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NicknameForm() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    
    localStorage.setItem('nickname', nickname.trim());
    navigate('/canvases');
  };

  return (
    <form onSubmit={handleSubmit} className="nickname-form">
      <h2>Введите ваш никнейм</h2>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Ваш творческий псевдоним"
        required
        minLength={3}
        maxLength={20}
      />
      <button type="submit">Продолжить</button>
    </form>
  );
}