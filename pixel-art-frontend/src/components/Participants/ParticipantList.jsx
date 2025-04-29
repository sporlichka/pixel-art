import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ParticipantsList({ canvasId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/canvases/${canvasId}/participants/`);
        setParticipants(response.data);
      } catch (err) {
        setError('Не удалось загрузить участников');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();

    // Подписка на обновления через WebSocket или polling
    const interval = setInterval(fetchParticipants, 10000);
    return () => clearInterval(interval);
  }, [canvasId]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="participants-list">
      <h3>Участники ({participants.length})</h3>
      <ul>
        {participants.map((user, index) => (
          <li key={index} className="participant">
            <span className="nickname">{user.nickname}</span>
            {user.is_online && <span className="online-badge">online</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}