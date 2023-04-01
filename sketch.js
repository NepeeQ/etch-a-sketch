const canvas = document.querySelector("#canvas");
const slider = document.querySelector("#gridsize");
const sliderLabel = document.querySelector("#squareNum");
const resetButton = document.querySelector("#reset");
const colorPick = document.querySelector("#colorPick");
const rainbowButton = document.querySelector("#rainbow");
const modeInfo = document.querySelector("#modeInf");

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BLOCK_SIZE = 15;

let currentColor = "black";

let rainbowSet = false;

let mousePressed = false;


rainbowButton.addEventListener("click", function()
{
    rainbowSet = true;
    console.log(rainbowSet);
    modeInfo.textContent = " ";
    let info = "Rainbow Mode On!"
    for (let i = 0; i < info.length; i++)
    {
        let letter = document.createElement("span");
        letter.innerText = info.charAt(i);
        let randColor = "#";
        for (let i = 0; i < 6; i++)
        {
            randColor += Math.floor(Math.random() * 16).toString(16);
        }
        letter.style.color = randColor;
        modeInfo.appendChild(letter); 
    }
   
    modeInfo.style.opacity = "100%";
} )

colorPick.addEventListener("change", function()
{
    currentColor = colorPick.value;
    modeInfo.style.opacity = "0%";
    rainbowSet = false;
})

resetButton.addEventListener("click", function(){
    const blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "white";
    }
})



function showVal(val){
    sliderLabel.textContent = val + "x" + val;
    clearGrid();
    createGrid(val);
}

function clearGrid()
{
    canvas.innerHTML = "";
}



function createGrid(num)
{
    for (let i = 0; i < 32; i++)
    {
        const column = document.createElement("div");
        column.classList.add("col");
        canvas.appendChild(column);
        for (let j = 0; j < 50; j++)
        {
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.width = (DEFAULT_BLOCK_SIZE * 16 / num ) + "px";
            block.style.height = (DEFAULT_BLOCK_SIZE * 16 / num) + "px";
            if(i == 0)
            {
                block.style.borderTop = "0px"
                if(j == 0)block.style.borderRadius = "7px 0 0 0";
                if(j == 49)block.style.borderRadius = "0 7px 0 0";
            }
            else if(i == 31)
            {
                block.style.borderBottom = "0px"
                if(j == 0)block.style.borderRadius = "0 0 0 7px";
                if(j == 49)block.style.borderRadius = "0 0 7px 0";
            }
            if(j == 0)
            {
                block.style.borderLeft = "0px"
            }
            else if(j == 49){
                block.style.borderRight = "0px"
            }
            column.appendChild(block);
            block.addEventListener('mouseover', draw);
            block.addEventListener('mousedown', draw)
            block.addEventListener('mouseup', deactivate)
        }
    }
}

function deactivate()
{
    mousePressed = false;
}

function draw(e)
{
    if(e.type === "mousedown" )
    {
        mousePressed = true;
    }
  if(mousePressed === true) {
    if (rainbowSet === true)
    {
        rainbowMode();
    }
    
    this.style.backgroundColor = currentColor;
}

}


function rainbowMode (){
    let color = "#"
    for (let i = 0; i < 6; i++)
    {
        color += Math.floor(Math.random() * 16).toString(16);
    }
    currentColor = color;
}

window.onload = () => {
    createGrid(DEFAULT_GRID_SIZE);
}
