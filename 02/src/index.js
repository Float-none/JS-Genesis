import Point2D from "./primitives/point2D.js";
import Segment from "./primitives/segment.js";
export default class World {
  constructor(canvas, width = 600, height = 600) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // 设置宽高
    this.canvas.width = width;
    this.canvas.height = height;
  }
  // 用于绘制所有图形
  display() {
    // new Segment(new Point2D(200, 200), new Point2D(400, 400)).draw(this.ctx);
    const fractalTree = (p1, length, angle, depth, ctx) => {
      if (depth <= 0) return;

      const p2 = new Point2D(
        p1.x + Math.cos(angle) * length,
        p1.y + Math.sin(angle) * length
      );

      new Segment(p1, p2).draw(this.ctx);

      const nextLength = length * 0.7;

      fractalTree(p2, nextLength, angle - 0.5, depth - 1, ctx); // 左叉
      fractalTree(p2, nextLength, angle + 0.5, depth - 1, ctx); // 右叉
    }

    fractalTree(new Point2D(300, 500), 120, -Math.PI / 2, 10, this.ctx);
  }
}
