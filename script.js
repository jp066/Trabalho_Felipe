const canvas = document.getElementById('game');
canvas.width = 2600;
canvas.height = 1280;
const context = canvas.getContext('2d');

const box = 20;
let gameWidth = Math.floor(canvas.width / box);
let gameHeight = Math.floor(canvas.height / box);

let snake = [];
snake[0] = {
    x: Math.floor(gameWidth / 2) * box,
    y: Math.floor(gameHeight / 2) * box
}

let direction = "right";

let words = [
    { word: 'Em cima', pronunciation: '', isCorrect: true },
    { word: 'Igual', pronunciation: '', isCorrect: true },
    { word: 'Xicara', pronunciation: '', isCorrect: true },
    { word: 'Esparadrapo', pronunciation: '', isCorrect: true },
    { word: 'Beneficente', pronunciation: '', isCorrect: true },
    { word: 'Exceção', pronunciation: '', isCorrect: true },

    { word: 'Encima', pronunciation: '', isCorrect: false },
    { word: 'Ingual', pronunciation: '', isCorrect: false },
    { word: 'Chicara', pronunciation: '', isCorrect: false },
    { word: 'Espraradapo', pronunciation: '', isCorrect: false },
    { word: 'Beneficiente', pronunciation: '', isCorrect: false },
    { word: 'Excessão', pronunciation: '', isCorrect: false },

];

function createFood(isCorrect) {
    let wordList = words.filter(word => word.isCorrect === isCorrect);
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    return {
        x: Math.floor(Math.random() * (gameWidth - 1) + 1) * box,
        y: Math.floor(Math.random() * (gameHeight - 1) + 1) * box,
        word: word
    }
}

function checkWord(word) {
    return word.isCorrect;
}

let food1 = createFood(true);
let food2 = createFood(false);
let food3 = createFood(true);
let food4 = createFood(false);
let food5 = createFood(true);
let food6 = createFood(false);
let food7 = createFood(true);
let food8 = createFood(false);
let food9 = createFood(true);
let food10 = createFood(false);
let food11 = createFood(true);
let food12 = createFood(false);

let score = 0;

function drawScore() {
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, box, box);
}

/*function drawFood() {
    context.fillStyle = "red";
    const foodList = [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10, food11, food12];
    foodList.forEach((food) => {
        if (!snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
            context.fillRect(food.x, food.y, box, box);
            context.fillText(food.word.word + '' + food.word.pronunciation + '', food.x, food.y - 5);
        }
    });
}
*/

function drawFood() {
    context.fillStyle = "red";
    const foodList = [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10, food11, food12];
    const usedWords = [];
    foodList.forEach((food) => {
        if (!snake.some((segment) => segment.x === food.x && segment.y === food.y) && !usedWords.includes(food.word.word)) {
            // Check if the word will fit within the canvas
            const textWidth = context.measureText(food.word.word + '' + food.word.pronunciation + '').width;
            if (food.x + textWidth <= canvas.width && food.y + box <= canvas.height) {
                context.fillRect(food.x, food.y, box, box);
                context.fillText(food.word.word + '' + food.word.pronunciation + '', food.x, food.y - 5);
                usedWords.push(food.word.word);
            }
        }
    });
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, gameWidth * box, gameHeight * box);
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


document.addEventListener('keydown', update);

function update(event) {
    switch(event.keyCode) {
        case 37:
            if(direction != 'right') direction = 'left';
            break;
        case 38:
            if(direction != 'down') direction = 'up';
            break;
        case 39:
            if(direction != 'left') direction = 'right';
            break;
        case 40:
            if(direction != 'up') direction = 'down';
            break;
    }
}

function iniciarJogo() {
    if(snake[0].x > (gameWidth - 1) * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = gameWidth * box;
    if(snake[0].y > (gameHeight - 1) * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = gameHeight * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    drawScore();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    let collidedFood = null;

    for (let i = 1; i <= 12; i++) {
        const food = eval(`food${i}`);
        if (snakeX == food.x && snakeY == food.y) {
            collidedFood = food;
            break;
        }
    }

    if (collidedFood) {
        if (checkWord(collidedFood.word)) {
            score++;
        } else {
            gameOver();
        }

        let correctWords = words.filter(word => checkWord(word));
        collidedFood.word = correctWords[Math.floor(Math.random() * correctWords.length)];

        collidedFood.x = Math.floor(Math.random() * (gameWidth - 1) + 1) * box;
        collidedFood.y = Math.floor(Math.random() * (gameHeight - 1) + 1) * box;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
function gameOver() {
    clearInterval(jogo);
    alert('Game Over :(');
}