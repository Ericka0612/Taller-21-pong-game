let canvas; //elemento en el html
let context; 
let gameLoop; //actualiza varias veces
//constantes que no cambian durante el juego, dimensiones del universo, el alto, posicion vertical, ancho de la paleta
const boardX = 300; //tamano del universo del canvas
const boardY = 300;
const paddleH = 10; //ancho del la paleta
const paddleD = boardY - paddleH;
const paddleW = 75;

let paddleX = 150;
let ballX = 150;
let ballY = 150;
let ballDX = 2; //direcciones
let ballDY = -4; //direcciones, valor que agrego para mover la bola de lugar
//funcion principal
function drawGameCanvas () {
    canvas = document.getElementById('gameBoard');
    if (canvas.getContext) {
        context = canvas.getContext('2d');
    }
    gameLoop = setInterval(draw, 16) //permite llamar constantemente a una funcion
    window.addEventListener('keydown', keyStroke, true)
}

drawGameCanvas();

function draw () {
    context.clearRect(0, 0, boardX, boardY);

    context.fillStyle = 'thistle';
    context.beginPath();
    context.rect(0, 0, boardX, boardY);
    context.closePath();
    context.fill();

    context.fillStyle = 'tomato';
    context.beginPath();
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    context.fillStyle = 'navy';
    context.beginPath();
    context.rect(paddleX, paddleD, paddleW, paddleH);
    context.closePath();
    context.fill();

    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15){
        ballDX = -ballDX;
    }

    if (ballY + ballDY < 15) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > boardY -15) {
        if (ballX > paddleX && ballX < paddleX + paddleW){
            ballDY = -ballDY;
        } else {
            clearInterval(gameLoop);
            alert('Game Over!');
        }
    }
}

function keyStroke (event) {
    switch(event.keyCode) {
        case 37:
            paddleX -= 20;
            if(paddleX < 0) {
                paddleX = 0 
            }
            break;
        case 39:
            paddleX += 20;
            if (paddleX > boardX - paddleW) {
                paddleX = boardX - paddleW
            }
    }
 }