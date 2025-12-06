import Point2D from "../primitives/point2D.js";
import Segment from "../primitives/segment.js";

export default class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = canvas.getContext("2d");

    // 状态机
    this.selected = null; // 当前选中的点（用于连线起点）
    this.hovered = null; // 鼠标悬停的点
    this.dragging = false; // 预留给未来拖拽用
    this.mouse = null; // 当前鼠标位置

    // 启动监听
    this.#addEventListeners();
  }

  #addEventListeners() {
    // 1. 鼠标按下事件
    this.canvas.addEventListener("mousedown", (evt) => {
      // 只有左键(0)和右键(2)才处理
      if (evt.button == 2) {
        // 右键逻辑
        if (this.selected) {
          this.selected = null; // 取消当前选中，停止连线
        } else if (this.hovered) {
          this.#removePoint(this.hovered); // 删除点
        }
      }

      if (evt.button == 0) {
        // 左键逻辑
        // 如果鼠标在某个点上，就选中它；如果不在，就新建一个点并选中它
        if (this.hovered) {
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }
        this.graph.tryAddPoint(this.mouse);
        this.#select(this.mouse); // 自动选中新点，方便连续画线
        this.hovered = this.mouse;
        this.dragging = true;
      }
    });

    // 2. 鼠标移动事件
    this.canvas.addEventListener("mousemove", (evt) => {
      // 获取鼠标在 Canvas 里的坐标（即使 Canvas 缩放或偏移也能用）
      // 这里先简化处理，假设 Canvas 铺满或者无偏移
      // 实际上我们应该写个 getViewportPoint，但暂时先直接读取 offsetX/Y
      this.mouse = new Point2D(evt.offsetX, evt.offsetY);

      // 检查鼠标有没有悬停在某个点上
      this.hovered = this.#getNearestPoint(this.mouse);

      // 移动的时候不需要重绘吗？需要的，但我们会在 World 里统一驱动动画循环
    });

    // 3. 禁止右键菜单弹出
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

    // 4. 鼠标抬起（结束拖拽状态）
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  #select(point) {
    // 如果之前已经选中了一个点，现在又选了一个点，说明要连线
    if (this.selected) {
      // 尝试添加线段
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  // 辅助函数：找离鼠标最近的点
  #getNearestPoint(point, minThreshold = 15) {
    let nearest = null;
    let minDist = Number.MAX_SAFE_INTEGER;

    for (const p of this.graph.points) {
      const dist = Math.hypot(p.x - point.x, p.y - point.y);
      if (dist < minThreshold && dist < minDist) {
        minDist = dist;
        nearest = p;
      }
    }
    return nearest;
  }

  // 专门负责画编辑器相关的 UI（比如高亮、虚线）
  display() {
    this.graph.draw(this.ctx);

    // 如果有悬停的点，画个特殊的样式
    if (this.hovered) {
      this.hovered.draw(this.ctx, { outline: true });
    }

    // 如果有选中的点，也高亮一下
    if (this.selected) {
      // 获取鼠标位置作为意图终点
      const intent = this.hovered ? this.hovered : this.mouse;
      // 画出“虚拟线条”：从选中点 -> 鼠标位置
      new Segment(this.selected, intent).draw(this.ctx, {
        color: "rgba(0,0,0,0.5)",
        width: 1,
        dash: [3, 3],
      });
      this.selected.draw(this.ctx, { outline: true, outlineColor: "blue" });
    }
  }
}
