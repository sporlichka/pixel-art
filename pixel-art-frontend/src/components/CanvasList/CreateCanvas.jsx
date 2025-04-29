import { useState } from 'react';
import api from '../../utils/api';

export default function CreateCanvas({ onCreate }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Введите название холста');
      return;
    }

    setLoading(true);
    try {
      const response = await api.createCanvas(name.trim());
      onCreate(response.data);
      setName('');
      setError('');
    } catch (err) {
      setError('Ошибка при создании холста');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-canvas">
      <h3>Создать новый холст</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="Название холста"
          maxLength={50}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}