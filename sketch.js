//Getting main elements
const canvas = document.querySelector("#canvas");
const slider = document.querySelector("#gridsize");
const sliderLabel = document.querySelector("#squareNum");
const resetButton = document.querySelector("#reset");
const colorPick = document.querySelector("#colorPick");
const rainbowButton = document.querySelector("#rainbow");
const modeInfo = document.querySelector("#modeInf");
const panel = document.querySelector("#panel");
const outside = document.querySelector("#outside");
const screen = document.querySelector("#screen");

//Setting const defaults
const DEFAULT_GRID_SIZE = 32; //Vertical
const DEFAULT_BLOCK_SIZE = 15;

//Setting changable default 
let currentColor = "black";
let rainbowSet = false;
let mousePressed = false;

//Setting menu states and applying default
const menuStates = ['colorBtn', 'rainbow', 'gridPick']
let currentMenuState = "colorBtn";

//Changing menu states
const buttons = document.querySelectorAll(".control-btn");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if(menuStates.includes(buttons[i].id))
        {
            currentMenuState = buttons[i].id;
            console.log(currentMenuState);
            menuChange();
        }
        else{
            return;
        };
    });
}

//Applying menu change
function menuChange(){
    if (currentMenuState == menuStates[0])
    {
        let parentDiv = colorPick.parentElement;
        clearMenu();
        parentDiv.style.display = "flex";
    }
    else if(currentMenuState == menuStates[1])
        {
            clearMenu();
            modeInfo.style.display = "block";
            rainbowModeOn();
        }
    else if(currentMenuState == menuStates[2])
    {
        let parentDiv = slider.parentElement;
        clearMenu();
        parentDiv.style.display = "flex";
    }
}


function clearMenu()
{
    for(let i = 0; i < screen.children.length; i++)
    {
        screen.children[i].style.display = "none";
    }
    rainbowSet = false;
    currentColor = "black";
}
//Function for getting the horizontal ratio using 16:9
function getRatio(vert)
{
    return vert * 16 / 9;
}

//Function for calculation panel width based on grid size
function setPanelWidth()
{
    panel.style.width = (outside.offsetWidth + 20) + "px" ;
}

//Function for adding multicolor description about turning On rainbow mode
function rainbowModeOn()
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
} 

//Function for changing the drawing color
colorPick.addEventListener("change", function()
{
    currentColor = colorPick.value;
    modeInfo.style.opacity = "0%";
    rainbowSet = false;
})

//Function for clearing the drawing
resetButton.addEventListener("click", function(){
    const blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "white";
    }
})


//Function for changing the grid and info about current state of grid
function showVal(val){
    sliderLabel.textContent = val + "x" + (val * 9 / 16);
    clearGrid();
    createGrid(val);
}

//Function for clearing the whole grid (in order to build a new one)
function clearGrid()
{
    canvas.innerHTML = "";
}


//Function for creating the grid
function createGrid(num)
{
    for (let i = 0; i < num; i++)
    {
        const column = document.createElement("div");
        column.classList.add("col");
        canvas.appendChild(column);
        for (let j = 0; j < getRatio(num); j++)
        {
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.width = (DEFAULT_BLOCK_SIZE * DEFAULT_GRID_SIZE / num ) + "px";
            block.style.height = (DEFAULT_BLOCK_SIZE * DEFAULT_GRID_SIZE / num) + "px";
            if(i == 0)
            {
                block.style.borderTop = "0px"
                if(j == 0)block.style.borderRadius = "7px 0 0 0";
                if(j == getRatio(num) - 1)block.style.borderRadius = "0 7px 0 0";
            }
            else if(i == num - 1)
            {
                block.style.borderBottom = "0px"
                if(j == 0)block.style.borderRadius = "0 0 0 7px";
                if(j == getRatio(num)- 1)block.style.borderRadius = "0 0 7px 0";
            }
            if(j == 0)
            {
                block.style.borderLeft = "0px"
            }
            else if(j == getRatio(num) - 1){
                block.style.borderRight = "0px"
            }
            column.appendChild(block);
            block.addEventListener('mouseover', draw);
            block.addEventListener('mousedown', draw)
            block.addEventListener('mouseup', deactivate)
        }
    }
}

//Function to change state and stop drawing on leaving the mouse button
function deactivate()
{
    mousePressed = false;
}

//Function for applting the color to current grid block with current mode
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

//Function for changing the current color to make rainbow-like drawing
function rainbowMode (){
    let color = "#"
    for (let i = 0; i < 6; i++)
    {
        color += Math.floor(Math.random() * 16).toString(16);
    }
    currentColor = color;
}

//Creating grid and outside panel on page load
window.onload = () => {
    createGrid(DEFAULT_GRID_SIZE);
    setPanelWidth();
}
