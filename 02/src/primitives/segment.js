export default class Segment {
  // 传入Point类
  // p1 p2
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(ctx, { width = 2, color = "black" } = {}) {
    ctx.beginPath(); // 开始绘制
    ctx.lineWidth = width; // 设置线的宽度
    ctx.strokeStyle = color; // 设置线的颜色
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
