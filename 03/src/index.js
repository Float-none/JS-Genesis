import Point2D from "./primitives/point2D.js";
import Segment from "./primitives/segment.js";
import Graph from "./math/graph.js";
import GraphEditor from "./editors/graphEditor.js";

export default class World {
  constructor(canvas, width = 600, height = 600) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;

    // 1. 初始化空图
    this.graph = new Graph();
    // 2. 初始化编辑器
    this.editor = new GraphEditor(this.canvas, this.graph);

    // 3. 启动动画循环
    this.animate();
  }

  animate() {
    // 清空画布（重要！否则画面会重叠）
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 让编辑器去决定画什么（它包含图和交互UI）
    this.editor.display();

    // 递归调用，保持 60FPS
    requestAnimationFrame(() => this.animate());
  }
}
