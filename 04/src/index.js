import Graph from "./math/graph.js";
import GraphEditor from "./editors/graphEditor.js";
import Viewport from "./view/viewport.js"; // 引入新成员

export default class World {
  constructor(canvas, width = 600, height = 600) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;

    this.graph = new Graph();
    // 1. 先初始化视口
    this.viewport = new Viewport(this.canvas);
    // 2. 把视口传给编辑器
    this.editor = new GraphEditor(this.canvas, this.graph, this.viewport);

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // [核心步骤] 保存当前状态 -> 移动画布 -> 画画 -> 恢复状态
    this.ctx.save();
    
    // 获取视口当前的偏移，并应用平移变换
    // 注意：这里我们用 scale(1/zoom) 是为了配合鼠标计算，暂时还没做缩放，
    // 但我们可以把 translate 先写好
    const offset = this.viewport.getOffset();
    this.ctx.translate(offset.x, offset.y);
    
    // 所有的绘制现在都在"移动后"的坐标系里进行了
    this.editor.display();
    
    this.ctx.restore();

    requestAnimationFrame(() => this.animate());
  }
}