import Point2D from "../primitives/point2D.js";

export default class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    // 这里的 offset 就是我们一共平移了多少距离
    this.offset = new Point2D(0, 0);

    // 拖拽计算用的临时变量
    this.drag = {
      start: new Point2D(0, 0),
      end: new Point2D(0, 0),
      offset: new Point2D(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  // 计算：鼠标在屏幕上的点，对应的真实世界坐标在哪里
  getMouse(evt, subtractDragOffset = false) {
    const p = new Point2D(
      (evt.offsetX - this.canvas.width / 2) * this.zoom - this.offset.x,
      (evt.offsetY - this.canvas.height / 2) * this.zoom - this.offset.y
    );
    return p;
  }

  // 给 Canvas 渲染用的，告诉它该平移多少
  getOffset() {
    return new Point2D(
      this.offset.x + this.canvas.width / 2,
      this.offset.y + this.canvas.height / 2
    );
  }

  #addEventListeners() {
    // 记录空格键状态
    this.isSpacePressed = false;

    window.addEventListener("keydown", (evt) => {
      if (evt.code === "Space") {
        this.isSpacePressed = true;
      }
    });

    window.addEventListener("keyup", (evt) => {
      if (evt.code === "Space") {
        this.isSpacePressed = false;
      }
    });

    this.canvas.addEventListener("mousedown", (evt) => {
      // 只有按住空格 + 左键，才开始拖拽视口
      if (this.isSpacePressed && evt.button === 0) {
        this.drag.start = this.getMouse(evt);
        this.drag.active = true;
      }
    });

    this.canvas.addEventListener("mousemove", (evt) => {
      if (this.drag.active) {
        this.drag.end = this.getMouse(evt);
        // 计算这一瞬间移动了多少
        this.drag.offset = new Point2D(
          this.drag.end.x - this.drag.start.x,
          this.drag.end.y - this.drag.start.y
        );
        // 累加到总偏移量里
        this.offset.x += this.drag.offset.x;
        this.offset.y += this.drag.offset.y;

        // 重要：重置 start，因为我们已经处理了这段位移
        // 如果不重置，你会发现画面飞得越来越快
        this.drag.start = this.getMouse(evt);
      }
    });

    this.canvas.addEventListener("mouseup", () => {
      if (this.drag.active) {
        this.drag.active = false;
      }
    });
  }
}
