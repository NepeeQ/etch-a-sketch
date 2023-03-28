const canvas = document.querySelector("#canvas");

for (let i = 0; i < 16; i++)
{
    const column = document.createElement("div");
    column.classList.add("col");
    canvas.appendChild(column);
    for (let j = 0; j < 16; j++)
    {
        const block = document.createElement("div");
        block.classList.add("block");
        column.appendChild(block);
    }
}

const blocks = document.querySelectorAll(".block");


function draw()
{
    console.log(this);
    this.style.backgroundColor="black";
}


for (let i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener('click', draw);
}


