const canvas = document.getElementById("jsCanvas");
const canvasContext = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
let isPainting = false;
let isFilling = false;

canvas.width = 700;
canvas.height = 700;
canvasContext.fillStyle = "white";
canvasContext.fillRect(0,0,canvas.width,canvas.height);
canvasContext.strokeStyle = "#2c2c2c";
canvasContext.fillStyle = "#2c2c2c";
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

function onMouseDown(event){
    if (isFilling === false){isPainting = true;}
}

function onMouseUp(event){isPainting = false;}

function onMouseLeave(event){isPainting = false;}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    canvasContext.strokeStyle = color;
    canvasContext.fillStyle = color;
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

function handleCanvasClick(){
    if (isFilling){
        canvasContext.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){event.preventDefault();}

function handleSaveClick(){
    const image = canvas.toDataURL("")
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS"
    link.click();
}

canvas.addEventListener("mousemove",onMouseMove);
canvas.addEventListener("mousedown",onMouseDown);
canvas.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("mouseleave",onMouseLeave);
canvas.addEventListener("click",handleCanvasClick);
canvas.addEventListener("contextmenu",handleCM);

Array.from(colors).forEach((color)=>color.addEventListener("click",handleColorClick));

range.addEventListener("input",handleRangeChange);
mode.addEventListener("click",handleModeClick);
saveBtn.addEventListener("click",handleSaveClick);