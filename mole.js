let currmoletile;
let currplanttile1;
let currplanttile2;
let score = 0;
let gameover= false;
let moleInterval;
let plantInterval1;
let plantInterval2;

let ispaused = false;
let gamestarted = false;

window.onload = function(){
    document.getElementById("startgame").addEventListener('click', startgame);
    document.getElementById("inst").addEventListener('click', showinstructions);
    function startgame(){
        if(!gamestarted){
            gamestarted=true;
            setgame();
        }
    }
}

function showinstructions(){
    var instructions = document.getElementById('gameInstructions');
  if (instructions.style.display === 'none') {
    instructions.style.display = 'block';
  } else {
    instructions.style.display = 'none';
  }

}


function setgame(){
    //set up the grid
    for(let i =0;i<9;i++){
        let tile = document.createElement("div");
        tile.id=i.toString();
        tile.addEventListener('click', selecttile);
        document.getElementById("board").appendChild(tile);

    }
    // moleInterval = setInterval(setmole, 1000); //1000ms = 1s
    // plantInterval = setInterval(setplant,2000);
    moleInterval = setInterval(function() {
        if(!ispaused){
            setmole();
        }
    },800);
    plantInterval1 = setInterval(function() {
        if(!ispaused){
            setplant(1);
        }
    }, 800);
    plantInterval2 = setInterval(function() {
        if(!ispaused){
            setplant(2);
        }
    }, 800);
    
    document.getElementById("newgame").addEventListener("click", newgame);
    document.getElementById("pausegame").addEventListener('click', 
    function(){
        ispaused = !ispaused;
        document.getElementById("pausegame").innerText = ispaused?"Resume Game":"Pause Game";
    });
}


function getRandomTile(){
    let num = Math.floor(Math.random()*9);
    return num.toString();
}

function setmole(){
    if(gameover || !gamestarted){
        return;
    }

    if(currmoletile){
        currmoletile.innerHTML ="";
    }

    let mole=document.createElement("img");
    mole.src = './monty-mole.png';

    let num = getRandomTile();
    // if(currplanttile1 && currplanttile1.id==num){
    //     return;
    // }
    // if(currplanttile2 && currplanttile2.id==num){
    //     return;
    // }

    while (currplanttile1 && (currplanttile1.id === num || currplanttile2 && currplanttile2.id === num)) {
        num = getRandomTile(); // Select a different tile
    }

    currmoletile = document.getElementById(num);
    currmoletile.appendChild(mole);
}

function newgame(){
    location.reload();
}

function setplant(plantnumber){
    if(gameover || !gamestarted)
    {
        return;
    }
    let currplanttile;
    if(plantnumber==1){
        currplanttile = currplanttile1;
    }
    else{
        currplanttile = currplanttile2;
    }

    if(currplanttile){
        currplanttile.innerHTML="";
    }

    let plant = document.createElement("img");
    plant.src = './piranha-plant.png';

    let num = getRandomTile();
    // if(currmoletile && currmoletile.id==num){
    //     return;
    // }

    while (currmoletile && (currmoletile.id === num || (currplanttile1 && currplanttile1.id === num) || (currplanttile2 && currplanttile2.id === num))) {
        num = getRandomTile(); // Select a different tile
    }

    currplanttile = document.getElementById(num);
    currplanttile.appendChild(plant);

    if(plantnumber==1){
        currplanttile1=currplanttile;
    }
    else{
        currplanttile2=currplanttile;
    }
}

function selecttile(){
    if(gameover){
        return;
    }
    if(this==currmoletile){
        score+=10;
        document.getElementById("score").innerText = score.toString();
    }
    else if(this==currplanttile1 || this==currplanttile2)
    {
        document.getElementById("score").innerText = "GAME OVER: "+ score.toString();
        gameover = true;
        clearInterval(moleInterval);
        clearInterval(plantInterval1);
        clearInterval(plantInterval2);
    }
}