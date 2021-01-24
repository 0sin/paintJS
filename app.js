const canvas = document.getElementById('jsCanvas');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const colors = document.getElementsByClassName('jscolor');
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//ctx.fillRect(20, 20, 200, 100); //x, y, width, height
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleBrushSize(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(e) {
  if(filling === true) {
    filling = false;
    mode.innerText = 'Fill'
  } else {
    filling = true;
    mode.innerText = 'Paint' 
  }
}


function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if(!painting) { //painting 하고 있지 않을때!
    // console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in ", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    // ctx.closePath();
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/jpeg'); //default는 PNG();
  const link = document.createElement('a');
  link.href = image
  link.download = "PaintJS[🖼]";
  link.click(); //가상의 link <a>를 누른것처럼 작동
  console.log(link);
}

if(canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

// console.log(colors); //HTMLCollection
// console.log(Array.from(colors)); //Array.from(Obj)배열 만들기

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if(range) {
  range.addEventListener('input', handleBrushSize);
  // range.addEventListener('click', handleBrushSize); //이것도 되던데...
}

if(mode) {
  mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick)
}