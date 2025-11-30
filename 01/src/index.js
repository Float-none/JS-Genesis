import Point2D from "./primitives/point2D.js";
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
    new Point2D(200, 200).draw(this.ctx);

    // 随机绘制
    for (let i = 0; i < 1000; i++) {
      new Point2D(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height
      ).draw(this.ctx, {
        size: Math.random() * (50 - 5) + 5,
        color:
        `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`,
      });
    }
  }
}
