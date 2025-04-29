import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NicknameForm from '../components/Auth/NicknameForm';
import CanvasList from '../components/CanvasList/CanvasList';
import CreateCanvas from '../components/CanvasList/CreateCanvas';
import api from '../utils/api';
import '../styles/main.css';

export default function Homepage() {
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') || '');
  const [canvases, setCanvases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const response = await api.getCanvases();
        setCanvases(response.data);
      } catch (err) {
        setError('Не удалось загрузить холсты');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (nickname) {
      fetchCanvases();
    }
  }, [nickname]);

  const handleCanvasCreated = (newCanvas) => {
    setCanvases([...canvases, newCanvas]);
  };

  if (!nickname) {
    return (
      <div className="auth-container">
        <NicknameForm onSuccess={(nick) => {
          setNickname(nick);
          localStorage.setItem('nickname', nick);
        }} />
      </div>
    );
  }

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
      <header>
        <h1>Pixel Art</h1>
        <div className="user-info">
          <span>Вы: {nickname}</span>
          <button onClick={() => {
            localStorage.removeItem('nickname');
            setNickname('');
          }}>Выйти</button>
        </div>
      </header>

      <main>
        <CreateCanvas onCreate={handleCanvasCreated} />
        <CanvasList canvases={canvases} />
      </main>
    </div>
  );
}