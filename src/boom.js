import { getRandom, getImageData } from './tool';
import Fireworks from './fireworks';

const ySpeedRange = [7, 20]; // y初始速度范围
const xSpeedRange = [0, 1];  // x初始速度范围
const yVelocity = 0.08;  // y摩擦力
const xVelocity = 0.01;   // x摩擦力
const shapeText = [
  '新年快乐',
  '阖家欢乐',
  '万事如意',
  '心想事成',
]

export default class Boom {

  boomed = false;  // 是否已经爆炸
  finished = false;  // 是否已经结束
  fireworkses = [];  // 爆炸后的烟花

  constructor(x, y, radius, type, boomArea, context, width, height) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type;
    this.context = context;
    this.width = width;
    this.height = height;
    this.boomArea = boomArea;
    this.color = 'rgba(255, 228, 150, 0.3)';
    this.vy = getRandom(...ySpeedRange); // y速度
    this.vx = getRandom(...xSpeedRange); // x速度
  }

  /**
   * 画发射过程中的散光
   */
  drawLight() {
    const ctx = this.context;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius + 3 * Math.random() + 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  draw() {
    const ctx = this.context;
    if (this.boomed) {
      let finished = true;
      this.fireworkses.forEach(fireworks => {
        if (!fireworks.finished) {
          fireworks.paint();
          finished = false;
        }
      });
      this.finished = finished;
    } else {
      this.drawLight();
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 移动
   */
  move() {
    if (this.boomed) {
      this.fireworkses.forEach(fireworks => fireworks.move())
    } else {
      
      const { boomArea } = this;
      this.vy = this.vy - yVelocity;
      this.vx = this.vx <= 0 ? this.vx : (this.vx - xVelocity);
      this.x = this.x + this.vx;
      this.y = this.y - this.vy;
  
      if (
        boomArea.y - this.y >= 0 || // 到爆炸区域爆炸
        (this.vy <= 0 && this.vx <= 0) // 速度为零爆炸
      ) {
        this.boom()
      }
    }
  }

  boom() {
    this.boomed = true;
    if (this.type <= 7) {
      this.boomDefault();
    } else {
      this.boomText();
    }
  }

  boomDefault() {
    const fragNum = getRandom(30, 200);
    const style = getRandom(0, 10) >= 5 ? 2 : 1;
    let color;
    if (style === 1) {
      color = `rgba(${parseInt(getRandom(128, 255))},${parseInt(getRandom(128, 255))},${parseInt(getRandom(128, 255))},1)`;
    }

    const range = parseInt(getRandom(300, 400));
    for (var i = 0; i < fragNum; i++) {
      if (style === 2) {
        color = `rgba(${parseInt(getRandom(128, 255))},${parseInt(getRandom(128, 255))},${parseInt(getRandom(128, 255))},1)`;
      }
      var a = getRandom(-Math.PI, Math.PI);
      var x = getRandom(0, range) * Math.cos(a) + this.x;
      var y = getRandom(0, range) * Math.sin(a) + this.y;
      var radius = getRandom(0, 2)
      var fireworks = new Fireworks(this.x, this.y, radius, color, x, y, this.context);
      this.fireworkses.push(fireworks);
    }
  }

  boomText() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const context = canvas.getContext('2d');
    const text = shapeText[Math.round(getRandom(0, shapeText.length - 1))]
    context.save();
    const fontSize = 200;
    context.font = fontSize + "px 宋体 bold";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgba(" + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + "," +
      parseInt(getRandom(128, 255)) + " , 1)";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    context.restore();
    const dots = getImageData(context, this.width, this.height, 5);
    const radius = 1;
    const dx = canvas.width / 2 - this.x;
    const dy = canvas.height / 2 - this.y;
    dots.forEach(dot => {
      const fireworks = new Fireworks(this.x, this.y, radius, `rgba(${dot.a},${dot.b},${dot.c},1)`, dot.x - dx, dot.y - dy, this.context);
      this.fireworkses.push(fireworks);
    })
  }

  paint() {
    if (!this.finished) {
      this.move();
      this.draw();
    }
  }
}