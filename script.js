let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let currentAnt = null;
let antTimeout = null;
let gameTimer = null;
let timeLeft = 90;
let gameRunning = false;

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const resetHighScoreBtn = document.getElementById('resetHighScoreBtn');
const gameArea = document.getElementById('gameArea');
const smashSound = document.getElementById('smashSound');
smashSound.volume = 0.1;

highScoreDisplay.textContent = highScore;
timerDisplay.textContent = timeLeft;

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 10) {
        timerDisplay.style.color = 'red'; // Change color to red when time is low
        timerDisplay.style.fontWeight = 'bold'; // Make it bold
    } else if (timeLeft <= 30) {
        timerDisplay.style.color = 'orange'; // Change color to orange when time is moderate
        timerDisplay.style.fontWeight = 'normal'; // Reset to normal weight
    } else {
        timerDisplay.style.color = 'black'; // Reset color to black when time is sufficient
        timerDisplay.style.fontWeight = 'normal'; // Reset to normal weight
    }

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(gameTimer);
    clearTimeout(antTimeout);

    if (currentAnt) {
        currentAnt.remove(); // Remove the current ant if it exists
        currentAnt = null; // Reset current ant
    }

 // Show game over message
    gameArea.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #333;
            font-size: 1.5rem;
            font-weight: bold;
        ">
            <h2>🎮 Game Over!</h2>
            <p>Final Score: ${score}</p>
            <p>Time's Up!</p>
        </div>
    `;
    
    // Check if new high score
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('highScore', highScore);
        alert('🏆 New High Score! ' + score + ' points!');
    }
}

function spawnAnt() {
    if (currentAnt || !gameRunning) {
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
// Reset game state
    score = 0;
    timeLeft = 90;
    gameRunning = true;
    currentAnt = null;
    
    // Update displays
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.color = '#333';
    timerDisplay.style.fontWeight = 'normal';
    
    // Clear game area
    gameArea.innerHTML = '';
    
    // Clear any existing intervals
    clearInterval(gameInterval);
    clearInterval(gameTimer);
    clearTimeout(antTimeout);
    
    // Start timers
    gameTimer = setInterval(updateTimer, 1000);
    gameInterval = setInterval(spawnAnt, 1000);
    
    // Spawn first ant immediately
    spawnAnt();
}

//restart game
function restartGame() {
    startGame();
}

restartBtn.addEventListener('click', restartGame);
resetHighScoreBtn.addEventListener('click', resetHighScore);

startGame();
