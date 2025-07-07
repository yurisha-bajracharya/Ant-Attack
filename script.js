let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');
const gameArea = document.getElementById('gameArea');
const smashSound = document.getElementById('smashSound');
const ant = document.createElement('div');

highScoreDisplay.textContent = highScore;

function spawnAnt() {
    ant.className = 'ant';

    // random position
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);

    ant.style.left = `${x}px`;
    ant.style.top = `${y}px`;

    //click to smash
    ant.addEventListener('click', () => {
        ant.remove();
        score++;
        scoreDisplay.textContent = score;
        smashSound.play();

        //high score checking
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }

        spawnAnt();
    });

    gameArea.appendChild(ant);
}

function startGame() {
    clearInterval(gameInterval);
    gameInterval = setInterval(spawnAnt, 1000);
}

//restart game
function restartGame() {
    score = 0;
    scoreDisplay.innerText = 0;
    gameArea.innerHTML = '';
    startGame();
}

restartBtn.addEventListener('click', restartGame);

startGame();
