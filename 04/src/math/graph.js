export default class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  // 添加点
  addPoint(point) {
    this.points.push(point);
  }

  // 判断是否已经有点在这个位置了（防止重叠点）
  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  // 添加线段
  addSegment(seg) {
    this.segments.push(seg);
  }

  // 判断线段是否已存在
  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  // 尝试添加点（去重）
  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // 尝试添加线段（去重）
  tryAddSegment(seg) {
    if (!this.containsSegment(seg)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  // 删除点（非常重要：删点的时候，连着这个点的线也要一起删掉！）
  removePoint(point) {
    // 1. 从 points 数组移除
    this.points.splice(this.points.indexOf(point), 1);
    // 2. 过滤掉所有包含这个点的线段
    const segs = this.segments.filter((s) => s.includes(point));
    for (const seg of segs) {
      this.removeSegment(seg);
    }
  }

  // 删除线
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  // 这里的 draw 只是一个简单的代理，把任务分发给具体的元素
  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
