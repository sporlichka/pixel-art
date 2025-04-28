
import '../styles/main.css'; // Импортирует все стили через @import

export default function Canvas({ pixels, onPixelClick, brushSize, canvasSize }) {
    const getPixelColor = (x, y) => {
      const pixel = pixels.find(p => p.x === x && p.y === y);
      return pixel ? pixel.color : '#FFFFFF';
    };
  
    return (
      <div 
        className="canvas-grid"
        style={{
          gridTemplateColumns: `repeat(${canvasSize}, ${10 * brushSize}px)`
        }}
      >
        {Array(canvasSize).fill().map((_, y) => (
          Array(canvasSize).fill().map((_, x) => (
            <div 
              key={`${x}-${y}`}
              className="pixel"
              style={{ 
                backgroundColor: getPixelColor(x, y),
                width: `${10 * brushSize}px`,
                height: `${10 * brushSize}px`
              }}
              onClick={() => onPixelClick(x, y)}
              onMouseOver={(e) => {
                if (e.buttons === 1) {
                  onPixelClick(x, y);
                }
              }}
            />
          ))
        ))}
      </div>
    );
  }