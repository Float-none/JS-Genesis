import World from './src/index.js';
const canvas = document.getElementById('world');
const world = new World(canvas,window.innerWidth)

world.display()