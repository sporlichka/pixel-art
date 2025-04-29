import React, { useEffect, useState } from 'react';
import { getCanvases, createCanvas } from '../services/api';
import { Link } from 'react-router-dom';
import '../css/Canvas.css'; // Подключаем стили для холста
import '../css/Pixel.css';
const Canvas = ({ nickname }) => {
  const [canvases, setCanvases] = useState([]); // Инициализация пустым массивом
  const [newCanvasName, setNewCanvasName] = useState('');

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const data = await getCanvases();
        // Проверяем, что данные пришли в виде массива
        if (Array.isArray(data)) {
          // Фильтруем только те холсты, которые имеют id
          const validCanvases = data.filter((canvas) => canvas && canvas.id);
          setCanvases(validCanvases);
        } else {
          setCanvases([]); // Если данные не массив, устанавливаем пустой массив
        }
      } catch (error) {
        console.error("Ошибка при получении холстов:", error);
        setCanvases([]); // В случае ошибки очищаем список
      }
    };
    fetchCanvases();
  }, []);

  const handleCreateCanvas = async () => {
    if (newCanvasName) {
      const canvasData = {
        name: newCanvasName,
        width: 64,
        height: 64,
        background_color: '#ffffff',
      };
      try {
        const createdCanvas = await createCanvas(canvasData);
        console.log('Созданный холст:', createdCanvas); // Логируем данные холста
        if (createdCanvas && createdCanvas.id) {
          setCanvases([...canvases, createdCanvas]);
        } else {
          console.error('Полученные данные не содержат id холста:', createdCanvas);
        }
      } catch (error) {
        console.error('Ошибка при создании холста:', error);
      }
    }
  };

  return (
    <div>
      <br></br><br></br>
      <h2>Available Canvases</h2>
      <input
        type="text"
        placeholder="New canvas name"
        value={newCanvasName}
        onChange={(e) => setNewCanvasName(e.target.value)}
      />
      <button onClick={handleCreateCanvas}>Create New Canvas</button>
      <ul>
        {canvases.length > 0 ? (
          canvases.map((canvas) => (
            // Добавляем проверку на null или undefined
            canvas && canvas.id ? (
              <li key={canvas.id}>
                <Link to={`/canvas/${canvas.id}`}>{canvas.name}</Link>
              </li>
            ) : (
              <li key={Math.random()}>Invalid canvas data</li> // Если id нет, выводим сообщение об ошибке
            )
          ))
        ) : (
          <li>No canvases available</li>
        )}
      </ul>
    </div>
  );
};

export default Canvas;
