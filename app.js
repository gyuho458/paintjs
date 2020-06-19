const canvas = document.getElementById("jsCanvas");
const canvasContext = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

let isPainting = false;
let isFilling = false;

canvas.width = 700;
canvas.height = 700;
canvasContext.strokeStyle = "#2c2c2c";
canvasContext.lineWidth = 2.5;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (isPainting) {
        canvasContext.lineTo(x,y);
        canvasContext.stroke();
    } else {
        canvasContext.beginPath();
    }
}

function onMouseDown(event){isPainting = true;}

function onMouseUp(event){isPainting = false;}

function onMouseLeave(event){isPainting = false;}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    canvasContext.strokeStyle = color;
}

function handleRangeChange(event){
    canvasContext.lineWidth = event.target.value
}

function handleModeClick(){
    if (isFilling) {
        isFilling = false;
        mode.innerText = "fill"
    } else{
        isFilling = true;
        mode.innerText = "paint"
    }
}

canvas.addEventListener("mousemove",onMouseMove);
canvas.addEventListener("mousedown",onMouseDown);
canvas.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("mouseleave",onMouseLeave);

Array.from(colors).forEach((color)=>color.addEventListener("click",handleColorClick));

range.addEventListener("input",handleRangeChange);
mode.addEventListener("click",handleModeClick);