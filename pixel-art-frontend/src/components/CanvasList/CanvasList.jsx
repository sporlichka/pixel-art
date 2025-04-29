import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

export default function CanvasList() {
  const [canvases, setCanvases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const response = await api.getCanvases();
        setCanvases(response.data);
      } catch (error) {
        console.error('Error fetching canvases:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCanvases();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="canvas-list">
      <h2>Доступные холсты</h2>
      
      {canvases.length === 0 ? (
        <p>Пока нет созданных холстов</p>
      ) : (
        <ul>
          {canvases.map(canvas => (
            <li key={canvas.id}>
              <Link to={`/canvas/${canvas.id}`}>
                {canvas.name} (участников: {canvas.participants_count})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}