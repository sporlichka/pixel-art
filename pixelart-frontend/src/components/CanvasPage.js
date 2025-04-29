import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Canvas.css'; // Подключаем стили для холста
import '../css/Pixel.css';
import { getPixels, updatePixels, joinCanvas, getParticipants, leaveCanvas } from '../services/api';

const CanvasPage = ({ nickname }) => {
  const { canvasId } = useParams();
  const navigate = useNavigate(); // Для навигации на главную страницу
  const [pixels, setPixels] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#000000');

  useEffect(() => {
    const fetchPixels = async () => {
      const data = await getPixels(canvasId);
      setPixels(data);
    };
    fetchPixels();
  }, [canvasId]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants(canvasId);
      setParticipants(data);
    };
    fetchParticipants();
  }, [canvasId]);

  useEffect(() => {
    const fetchCanvasAndJoin = async () => {
      if (nickname) {
        await joinCanvas(canvasId, nickname);
      }
    };
    fetchCanvasAndJoin();
  }, [nickname, canvasId]);

  const handlePixelClick = async (x, y) => {
    const updatedPixels = [...pixels];
    const pixelIndex = updatedPixels.findIndex((pixel) => pixel.x === x && pixel.y === y);
    if (pixelIndex >= 0) {
      updatedPixels[pixelIndex].color = selectedColor;
    } else {
      updatedPixels.push({ x, y, color: selectedColor });
    }
    setPixels(updatedPixels);
    await updatePixels(canvasId, updatedPixels);
  };

  const handleLeaveCanvas = async () => {
    if (nickname) {
      await leaveCanvas(canvasId, nickname); // Вызов функции выхода
    }
    navigate('/'); // Перенаправление на главную страницу после выхода
  };

  return (
    <div>
      <h2>Canvas {canvasId}</h2>

      <div>
        <h3>Participants</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.user.nickname}</li>
          ))}
        </ul>
      </div>

      <div>
        <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(64, 20px)` }}>
        {Array.from({ length: 64 * 64 }).map((_, index) => {
          const x = index % 64;
          const y = Math.floor(index / 64);
          const pixel = pixels.find((p) => p.x === x && p.y === y);
          return (
            <div
              key={index}
              onClick={() => handlePixelClick(x, y)}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: pixel ? pixel.color : '#ffffff',
                border: '1px solid #ccc',
              }}
            ></div>
          );
        })}
      </div>

      <div>
        <button onClick={handleLeaveCanvas}>Leave Canvas</button> {/* Кнопка выхода */}
      </div>
    </div>
  );
};

export default CanvasPage;
