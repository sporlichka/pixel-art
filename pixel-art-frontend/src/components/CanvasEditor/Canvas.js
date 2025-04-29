export class PixelCanvas {
    constructor(container, size = 32, options = {}) {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.size = size;
      this.cellSize = options.cellSize || 20;
      this.colors = {
        background: options.background || '#ffffff',
        border: options.border || '#cccccc'
      };
      this.currentColor = '#000000';
      this.pixels = {};
      
      container.appendChild(this.canvas);
      this.init();
    }
  
    init() {
      this.canvas.width = this.size * this.cellSize;
      this.canvas.height = this.size * this.cellSize;
      this.drawGrid();
      this.setupEventListeners();
    }
  
    drawGrid() {
      this.ctx.fillStyle = this.colors.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.strokeStyle = this.colors.border;
      this.ctx.lineWidth = 1;
      
      for (let i = 0; i <= this.size; i++) {
        // Вертикальные линии
        this.ctx.beginPath();
        this.ctx.moveTo(i * this.cellSize, 0);
        this.ctx.lineTo(i * this.cellSize, this.canvas.height);
        this.ctx.stroke();
        
        // Горизонтальные линии
        this.ctx.beginPath();
        this.ctx.moveTo(0, i * this.cellSize);
        this.ctx.lineTo(this.canvas.width, i * this.cellSize);
        this.ctx.stroke();
      }
    }
  
    setupEventListeners() {
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        
        this.pixels[`${x},${y}`] = this.currentColor;
        this.drawPixel(x, y);
        
        // Отправка на сервер
        this.onPixelChange && this.onPixelChange(x, y, this.currentColor);
      });
    }
  
    drawPixel(x, y, color = this.currentColor) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        x * this.cellSize + 1, 
        y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
    }
  
    setColor(color) {
      this.currentColor = color;
    }
  
    clear() {
      this.pixels = {};
      this.drawGrid();
    }
  }