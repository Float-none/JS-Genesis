export default class Segment {
  // 传入Point类
  // p1 p2
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  // 判断线段是否包含某个点
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  // 判断两条线是否一样（方向不同也算同一条线）
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash); // 新增：支持虚线
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]); // 重置，防止影响其他绘制
  }
}
