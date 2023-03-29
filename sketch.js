const canvas = document.querySelector("#canvas");
const slider = document.querySelector("#gridsize");
const sliderLabel = document.querySelector("#squareNum");
const resetButton = document.querySelector("#reset");
const colorPick = document.querySelector("#colorPick")


const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BLOCK_SIZE = 40;

let currentColor = "black";





colorPick.addEventListener("change", function()
{
    currentColor = colorPick.value;
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
    for (let i = 0; i < num; i++)
    {
        const column = document.createElement("div");
        column.classList.add("col");
        canvas.appendChild(column);
        for (let j = 0; j < num; j++)
        {
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.width = DEFAULT_BLOCK_SIZE / num * 16 + "px";
            block.style.height = (DEFAULT_BLOCK_SIZE - 10) / num * 16 + "px";
            column.appendChild(block);
        }
    }
    const blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('mouseover', draw);
    }
}



function draw()
{
    console.log(this);
    this.style.backgroundColor= currentColor;
}




window.onload = () => {
    createGrid(DEFAULT_GRID_SIZE);
}
