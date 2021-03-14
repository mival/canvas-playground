const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d');
const FPS = 30;

let WIDTH, HEIGHT;

const setDimensions = () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

setDimensions();

const getRandom = (min = 0, max = WIDTH) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}


const drawLine = () => {
  ctx.beginPath();
  ctx.lineWidth = getRandom(0, 10);
  ctx.strokeStyle = `#${getRandomColor()}`;

  ctx.moveTo(getRandom(), getRandom());
  ctx.lineTo(getRandom(), getRandom());
  ctx.stroke();
}


const drawRectangle = () => {
  ctx.beginPath();
  ctx.lineWidth = getRandom(0, 10);
  ctx.strokeStyle = `#${getRandomColor()}`;
  ctx.rect(getRandom(), getRandom(), getRandom(), getRandom());
  ctx.stroke();
}

const drawCircle = () => {
  ctx.beginPath();
  ctx.lineWidth = getRandom(0, 10);
  ctx.strokeStyle = `#${getRandomColor()}`;
  ctx.arc(getRandom(), getRandom(), getRandom(0, Math.min(WIDTH, HEIGHT) / 2), 0, 2 * Math.PI);
  ctx.stroke();
}

let typeIndex = 0;

const changeType = () => {
  const TYPES = [drawLine, drawRectangle, drawCircle]
  typeIndex = (typeIndex + 1) % TYPES.length
  console.log('typeIndex', typeIndex)
  return TYPES[typeIndex];
}

let selectedDrawFce = changeType();

const reset = () => {
  console.log('reset', typeIndex)
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  selectedDrawFce = changeType();
}


const draw = () => {
  selectedDrawFce();
}


let start, counter = 0, counterTreshold = getRandom(0, 1000);
function step(timestamp) {
  if (start === undefined)
    start = timestamp;

  const elapsed = timestamp - start;

  // `Math.min()` is used here to make sure that the element stops at exactly 200px.

  if (counter > counterTreshold) {
    counter = 0;
    counterTreshold = getRandom(0, 1000);
    reset();
  }

  if (elapsed > (1000 / FPS) ) {
    start = timestamp;
    counter++;
    draw();
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);


window.addEventListener('resize', () => {
  console.log('resize')
  setDimensions();
});