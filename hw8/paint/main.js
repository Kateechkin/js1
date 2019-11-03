const doc = document
const canvas = doc.querySelector ('#canv')
const ctx = canvas.getContext ('2d')
const xCoordBlock = doc.querySelector ('#x-coord')
const yCoordBlock = doc.querySelector ('#y-coord')
const system = {

    width: canvas.getAttribute ('width'),
    height: canvas.getAttribute ('height'),
    currentTool: 'brush',
    currentColor: '#b5943a',
    brushSize: 10

}
//Изменение системных объектов
function renderSystem(elem,action) {
    system [elem] = action //system ['currentTool'] = 'brash'
}
//Берем координаты курсора
function getCoordinates (evt) {
   
    dx = evt.movementX
    dy = evt.movementY
    x = xCoordBlock.innerText = evt.offsetX
    y = yCoordBlock.innerText = evt.offsetY
}
// Для элементов инструменты "tool-.."
function clicker (evt) {
    if (evt.target.classList.contains ('tool-button') || ( evt.target.tagName === 'IMG' && evt.target.classList.contains ('imgclass'))) {
        renderSystem ('currentTool',evt.target.dataset['name'])
    }
}

// Для элементов инструменты "select-.."
function inputer (evt) {
    if (evt.target.id === 'select-size') {
        renderSystem ('brushSize',evt.target.value)
    }
    if (evt.target.id === 'select-color') {
        renderSystem ('currentColor',evt.target.value)
    }
}

//Рисовательные функции

function startDraw (evt) {
    if (system.currentTool) {
        if (system.currentTool === 'brush') {
            drawBrush (evt)
        } else if (system.currentTool === 'circle') {
            drawCircle (evt)
        } else if (system.currentTool === 'eraser') {
            drawEraser (evt)
        } else if (system.currentTool === 'background') {
            allfill ()
        } else if (system.currentTool === 'polygon') {
            drawPolygon()
        }            
     } else {
        alert ('Choose tool')
    }
}

function endDraw () {
    canvas.onmousemove = null
}

function drawBrush (evt) {
    canvas.onmousemove = function (evt) {
        ctx.fillStyle = system.currentColor
        ctx.fillRect (+xCoordBlock.innerText, +yCoordBlock.innerText, system.brushSize, system.brushSize)
    }
}


function drawCircle(evt) {
    canvas.onmousemove = function (evt) {
    ctx.fillStyle = system.currentColor
    ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')'
    radius = system.brushSize
    ctx.beginPath()
    ctx.arc(x,y,radius,0,2*Math.PI)
    ctx.fill();    
    ctx.stroke();  
    }
}

//Ластик
function drawEraser(evt) {
    canvas.onmousemove = function (evt) {
        ctx.fillStyle = 'white'
        ctx.fillRect(+xCoordBlock.innerText, +yCoordBlock.innerText, system.brushSize, system.brushSize)
    }
}

//Закраска фона 
function allfill() {
      document.querySelector ('.canv').classList.toggle ('.plus') //смена класса(toggle)
      ctx.fillStyle = system.currentColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    
}
//Полигон
function drawPolygon() {
    ctx.fillStyle = system.currentColor
    ctx.strokeStyle = 'red'
    ctx.arc(x,y,2,0,2*Math.PI)
    ctx.fill();
    ctx.stroke();
}

//listeners
doc.addEventListener ('input', inputer)
doc.addEventListener ('click',clicker)
canvas.addEventListener ('mousemove', getCoordinates)
canvas.addEventListener ('mousedown', startDraw)
canvas.addEventListener('mouseup', endDraw)