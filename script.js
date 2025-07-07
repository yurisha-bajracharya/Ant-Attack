let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let currentAnt = null;
let antTimeout = null;

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');
const resetHighScoreBtn = document.getElementById('resetHighScoreBtn');
const gameArea = document.getElementById('gameArea');
const smashSound = document.getElementById('smashSound');
smashSound.volume = 0.1;

highScoreDisplay.textContent = highScore;

function spawnAnt() {
    if (currentAnt) {
        return; // Prevent spawning multiple ants at the same time
    }
    const ant = document.createElement('div');
    ant.className = 'ant';
    currentAnt = ant; // Set current ant

    // random position
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);

    ant.style.left = `${x}px`;
    ant.style.top = `${y}px`;

    //click to smash
    ant.addEventListener('click', () => {
        clearTimeout(antTimeout); // Clear the timeout if the ant is clicked
        ant.remove();
        currentAnt = null; // Reset current ant
        score++;
        scoreDisplay.textContent = score;
        if (smashSound) {
            smashSound.volume = 0.1; // Set volume for the sound
            smashSound.play();
        }

        //high score checking
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }

        spawnAnt();
    });

    gameArea.appendChild(ant);

    antTimeout = setTimeout(() => {
        ant.remove();
        currentAnt = null; // Reset current ant
        spawnAnt(); // Spawn a new ant after the timeout
    }, 1000); // Ant disappears after 1 second if not clicked

}

function resetHighScore() {
    highScore = 0;
    highScoreDisplay.textContent = highScore;
    localStorage.removeItem('highScore');
    alert('High score has been reset!');
}

function startGame() {
    clearInterval(gameInterval);
    currentAnt = null; // Reset current ant
    gameInterval = setInterval(spawnAnt, 1000);
}

//restart game
function restartGame() {
    score = 0;
    scoreDisplay.innerText = 0;
    gameArea.innerHTML = '';
    currentAnt = null; // Reset current ant
    startGame();
}

restartBtn.addEventListener('click', restartGame);
resetHighScoreBtn.addEventListener('click', resetHighScore);

startGame();
