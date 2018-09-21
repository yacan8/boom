export default class Fireworks {

  constructor(centerX, centerY, radius, color, tx, ty, context) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.finished = false;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
    this.context = context;
  }

  paint() {
    const ctx = this.context;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill()
    ctx.restore();
  }
  move() {
    this.ty = this.ty + 0.3;
    const dx = this.tx - this.x,
      dy = this.ty - this.y;
    this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.1);
    this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.1);
    if (dx === 0 && Math.abs(dy) <= 80) {
      this.finished = true;
    }
  }
}