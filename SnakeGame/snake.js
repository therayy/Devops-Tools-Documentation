window.onload = function(){
    const start = getElementById("start");
    start.play();
}

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images
const ground = new Image();
ground.src = "images/background.jpg";

const foodImg = new Image();
foodImg.src = "images/food.png"


//load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/move.mp3";
left.src = "audio/move.mp3";
right.src = "audio/move.mp3";
down.src = "audio/move.mp3";


//create the snake
let snake = [];

snake[0] = {
    x : 15* box,
    y: 10 * box
};


// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//create the score 
let score = 0;

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event) { 
    if(event.keyCode == 37 && d !="RIGHT"){
        left.play();
        d="LEFT";
    }else if(event.keyCode == 38 && d !="DOWN") {
        up.play();
        d="UP";
    }else if(event.keyCode == 39 && d !="LEFT") {
        right.play();
        d="RIGHT";
    }else if(event.keyCode == 40 && d !="UP") {
        down.play();
        d="DOWN";
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// draw everything in the canvas
function draw(){
    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    //if the snake eats the food
    if (snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
             y : Math.floor(Math.random()*15+3) * box
        }
    }else {
        //remove the tail
        snake.pop();
    }

    // add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

        
    //game over
    if (snakeX < 0* box || snakeX > 18 * box || snakeY < 0*box || snakeY > 18*box || 
        collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        const go = document.getElementById("go");
        go.style.display = "block";
        go.style.position = "absolute";
        go.style.top = "20%";
        go.style.left = "10%";
        go.style.zIndex = "1";
        go.style.fontSize = "45px";

        const alert = document.getElementById("Trybtn");
        alert.style.display = "block";
        alert.style.position = "absolute";
        alert.style.top = "30%";
        alert.style.left = "13%";
        alert.style.zIndex = "1";
        alert.style.width = "150px";
        alert.style.height = "40px";
    }
  

    snake.unshift(newHead);

    ctx.fillStyle = "#000";
    ctx.font = "45px Change one";
    ctx.fillText(score,0.5*box,1.6*box);

}


let game = setInterval(draw,100);