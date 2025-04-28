import '../styles/main.css'; // Импортирует все стили через @import
export default function Toolbar({
    selectedColor,
    onColorChange,
    onFill,
    onErase,
    isErasing
  }) {
    return (
      <div className="toolbar">
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={onColorChange}
        />
  
        <div className="toolbar-buttons">
          <button
            onClick={onFill}
            className="tool-button"
            title="Залить весь холст"
          >
            🎨 Заливка
          </button>
  
          <button
            onClick={onErase}
            className={`tool-button ${isErasing ? 'active' : ''}`}
            title="Ластик"
          >
            🧽 Ластик
          </button>
        </div>
      </div>
    );
  }