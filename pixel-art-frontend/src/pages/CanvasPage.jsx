import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PixelCanvas } from '../components/CanvasEditor/Canvas';
import ParticipantsList from '../components/Participants/ParticipantsList';
import Toolbar from '../components/CanvasEditor/Toolbar';
import api from '../utils/api';

export default function CanvasPage() {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [nickname] = useState(localStorage.getItem('nickname'));
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Загрузка холста
    const loadCanvas = async () => {
      try {
        const response = await api.getCanvas(id);
        const canvasData = response.data;
        
        // Инициализация холста
        const pixelCanvas = new PixelCanvas(canvasRef.current, 32, {
          background: '#ffffff'
        });
        
        // Восстановление пикселей
        canvasData.pixels.forEach(pixel => {
          pixelCanvas.drawPixel(pixel.x, pixel.y, pixel.color);
        });
        
        pixelCanvas.onPixelChange = (x, y, color) => {
          api.updatePixel(id, x, y, color);
        };
        
        setCanvas(pixelCanvas);
        
        // Присоединение к холсту
        await api.joinCanvas(id, nickname);
        const participantsRes = await api.getCanvasParticipants(id);
        setParticipants(participantsRes.data);
        
      } catch (error) {
        console.error('Error loading canvas:', error);
      }
    };
    
    loadCanvas();
    
    return () => {
      // Очистка
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [id, nickname]);

  return (
    <div className="canvas-page">
      <div className="canvas-container" ref={canvasRef}></div>
      
      <div className="sidebar">
        <Toolbar canvas={canvas} />
        <ParticipantsList participants={participants} />
      </div>
    </div>
  );
}