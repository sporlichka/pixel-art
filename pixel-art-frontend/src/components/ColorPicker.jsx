import { useState } from 'react';
import '../styles/main.css'; // Импортирует все стили через @import
export default function ColorPicker({ selectedColor, onColorChange }) {
  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#000000', '#FFFFFF', '#808080', '#FFA500', '#800080', '#008000'
  ];

  return (
    <div className="color-picker">
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
      />
      <div className="color-grid">
        {colors.map((color) => (
          <div
            key={color}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
}