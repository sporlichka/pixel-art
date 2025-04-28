import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNickname, getNickname } from '../utils/storage';
import { getCanvases, createCanvas } from '../utils/api';
import '../styles/main.css'; // Импортирует все стили через @import

export default function Home() {
  const [nickname, setNickname] = useState(getNickname() || '');
  const [canvases, setCanvases] = useState([]);
  const [newCanvasName, setNewCanvasName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getNickname()) navigate('/canvases');
    fetchCanvases();
  }, []);

  const fetchCanvases = async () => {
    const { data } = await getCanvases();
    setCanvases(data);
  };

  const handleNicknameSubmit = () => {
    saveNickname(nickname);
    navigate('/canvases');
  };

  const handleCreateCanvas = async () => {
    await createCanvas(newCanvasName);
    fetchCanvases();
  };

  return (
    <div>
      {!getNickname() && (
        <div>
          <input 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Введите никнейм"
          />
          <button onClick={handleNicknameSubmit}>Сохранить</button>
        </div>
      )}

      <div>
        <input 
          value={newCanvasName}
          onChange={(e) => setNewCanvasName(e.target.value)}
          placeholder="Название холста"
        />
        <button onClick={handleCreateCanvas}>Создать холст</button>
      </div>

      <div>
        {canvases.map(canvas => (
          <div key={canvas.id}>
            <span>{canvas.name}</span>
            <button onClick={() => navigate(`/canvas/${canvas.id}`)}>
              Присоединиться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}