

export default class Star {
  color = "rgba(255, 255, 255, 1)"; // 颜色

  constructor(x, y, radius, context) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.context = context;
  }

  paint() {
    const ctx = this.context;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
