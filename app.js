const canvas = document.getElementById("jsCanvas");
const canvasContext = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
let canPaint = false;
let canFill = false;

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
    if (canPaint) {
        canvasContext.lineTo(x,y);
        canvasContext.stroke();
    } else {
        canvasContext.beginPath();
    }
}

function onMouseDown(event){
    if (canFill === false){canPaint = true;}
}

function onMouseUp(event){canPaint = false;}

function onMouseLeave(event){canPaint = false;}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    canvasContext.strokeStyle = color;
    canvasContext.fillStyle = color;
}

function handleRangeChange(event){
    canvasContext.lineWidth = event.target.value
}

function handleModeClick(){
    if (canFill) {
        canFill = false;
        mode.innerText = "fill"
    } else{
        canFill = true;
        mode.innerText = "paint"
    }
}

function handleCanvasClick(){
    if (canFill){
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