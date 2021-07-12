let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let tot =0;
let snake = [];
snake[0] = {
    x: 8 * box , 
    y: 8 * box
}

// direção da cobra
let direction = "right";

//direção da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box ,
    y: Math.floor(Math.random() * 15 + 1) * box
};

//Cria o background
function criarBG(){
    context.fillStyle = "green";
    context.fillRect(0, 0, 16 * box , 16 * box);
}

//Cria a Cobrinha 
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        // cor da cobra
        context.fillStyle = "white";
        //tamanho da cobra 
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//cria comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x , food.y, box, box);
}

document.addEventListener('keydown', update);
//mudando as direções 
function update(event){
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarJogo(){
    // fazer cobrinha parar de ir em bora
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 
    
    for (i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); 
            alert("GAME OVER! =( Total de pontos: " + tot)
            window.location.reload()
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //coodernadas da cobrinha 
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
        
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box ;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        tot++
        let point = document.getElementById('ponto')
        point.innerHTML = tot
    }

    //dando movimento para ela
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo , 100);