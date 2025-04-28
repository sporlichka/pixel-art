import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';

// Замените вызовы:
// Было: getCanvas(id)
// Стало: api.getCanvas(id)
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';
import '../styles/main.css';

export default function CanvasPage() {
  const { id } = useParams();
  const [pixels, setPixels] = useState([]);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(1);
  const [isErasing, setIsErasing] = useState(false);
  const [canvasName, setCanvasName] = useState('');
  const canvasSize = 64;

  // Загрузка данных холста
  useEffect(() => {
    const loadCanvas = async () => {
      try {
        const response = await api.getCanvas(id);
        setPixels(response.data.pixels || []);
        setCanvasName(response.data.name);
      } catch (error) {
        console.error('Error loading canvas:', error);
      }
    };
    
    loadCanvas();
  }, [id]);

  // Обработка клика по пикселю
  const handlePixelClick = (x, y) => {
    const currentColor = isErasing ? '#FFFFFF' : color;
    const newPixel = { x, y, color: currentColor };
    
    // Обновляем пиксель (или добавляем новый)
    const newPixels = [
      ...pixels.filter(p => !(p.x === x && p.y === y)),
      newPixel
    ];
    
    setPixels(newPixels);
    updateCanvasData(newPixels);
  };

  // Заливка всего холста
  const handleFill = () => {
    const fillColor = isErasing ? '#FFFFFF' : color;
    const newPixels = Array(canvasSize * canvasSize)
      .fill()
      .map((_, index) => ({
        x: index % canvasSize,
        y: Math.floor(index / canvasSize),
        color: fillColor
      }));
    
    setPixels(newPixels);
    updateCanvasData(newPixels);
  };

  // Переключение ластика
  const handleErase = () => {
    setIsErasing(prev => !prev);
  };

  // Отправка обновлений на сервер
  const updateCanvasData = async (updatedPixels) => {
    try {
      await api.updateCanvas(id, updatedPixels);
    } catch (error) {
      console.error('Error updating canvas:', error);
    }
  };

  return (
    <div className="canvas-page">
      <header className="canvas-header">
        <h1>{canvasName || `Холст #${id}`}</h1>
      </header>
      
      <div className="canvas-wrapper">
        <Toolbar
          color={color}
          onColorChange={setColor}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          isErasing={isErasing}
          onErase={handleErase}
          onFill={handleFill}
        />
        
        <Canvas
          pixels={pixels}
          onPixelClick={handlePixelClick}
          brushSize={brushSize}
          canvasSize={canvasSize}
        />
      </div>
    </div>
  );
}