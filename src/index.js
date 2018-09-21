import Boom from './boom';
import Star from './star';
import { getRandom, requestAnimationFrame } from './tool';

class Portal {

  starCount = 40;
  stars = [];  // 背景星星
  booms = [];  // 烟花
  stepTime = 500;  // 发射时间间隔

  constructor({ele, width, height}) {
    this.canvas = document.getElementById(ele);
    this.context = this.canvas.getContext('2d');
    this.toolCanvasEle = document.createElement('canvas'); // 像素计算canvas
    this.canvas.width = this.toolCanvasEle.width = width;
    this.canvas.height = this.toolCanvasEle.height = height;
    this.height = height; 
    this.width = width;
    this.lastTime = new Date().getTime(); // 上一个烟花发射时间
    this.initBg(); // 初始化背景
  }

  initBg() {
    const rangeX = [this.width / 10, this.width * 9 / 10];
    const rangeY = [this.height / 10, this.height * 3 / 4];
    const rangeRadius = [0.5, 1.5];
    for (let index = 0; index < this.starCount; index++) {
      const x = getRandom(...rangeX), y = getRandom(...rangeY), raduis = getRandom(...rangeRadius);
      this.stars.push(new Star(x, y, raduis, this.context))
    }
    const ctx = this.context;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  drawStars() {
    this.stars.forEach(star => star.paint())
  }

  clearForLongTail() {  // 长尾效果
    const ctx = this.context;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  run() {
    this.clearForLongTail();
    this.drawStars();
    const newTime = new Date().getTime();

    if (newTime - this.lastTime > this.stepTime) {
      const centerX = this.width / 2;
      const boomType = Math.round(getRandom(1, 8));
      const startXRange = [centerX - centerX / 8, centerX + centerX / 8];
      const x = getRandom(...startXRange);
      const radius = getRandom(2, 3);
      const y = this.height + radius;
      const leftRight = getRandom(0, 10) > 5 ? 1 : -1;
      const boomArea = {
        x: x + (leftRight * this.width / 10),
        y: getRandom(this.height / 8, this.height / 2)
      }
      this.booms.push(new Boom(x, y, radius, boomType, boomArea, this.context, this.width, this.height));
      this.booms = this.booms.filter(boom => !boom.finished);
      this.lastTime = newTime;

    }

    
    this.booms.forEach(boom => boom.paint())

    requestAnimationFrame(this.run.bind(this))
  }
}

new Portal({
  ele: 'canvas',
  width: window.innerWidth,
  height: window.innerHeight
}).run();