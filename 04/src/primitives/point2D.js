export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // 判断两个点坐标是否一样
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }

  // 绘制点
  draw(
    ctx,
    {
      size = 10,
      color = "black",
      outline = false,
      outlineColor = "yellow",
    } = {}
  ) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = outlineColor;
      ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
