document.addEventListener('DOMContentLoaded', () => {
  function clamp(value) {
    return Math.max(0, Math.min(255, value));
  }

  function getGridSize() {
    return Math.min(2 + level, 8);
  }

  function generateColors() {
    const baseR = Math.floor(Math.random() * 200);
    const baseG = Math.floor(Math.random() * 200);
    const baseB = Math.floor(Math.random() * 200);

    const diff = Math.max(3, 40 - level * 3);

    return {
      normal: `rgb(${baseR}, ${baseG}, ${baseB})`,
      different: `rgb(${clamp(baseR + diff)}, ${clamp(baseG + diff)}, ${clamp(baseB + diff)})`
    };
  }

  function startTimer() {
    if (timer) clearInterval(timer);

    timeLeft = Math.max(2, 6 - Math.floor(level / 2));
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time Up! Game Over');
        resetGame();
      }
    }, 1000);
  }

  function createBoard() {
    gameArea.innerHTML = '';

    const size = getGridSize();
    gameArea.style.gridTemplateColumns = `repeat(${size}, 60px)`;

    const totalTiles = size * size;
    const { normal, different } = generateColors();
    const differentIndex = Math.floor(Math.random() * totalTiles);

    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = (i === differentIndex) ? different : normal;

      tile.addEventListener('click', () => {
        if (!gameStarted) return;

        if (i === differentIndex) {
          score++;
          level++;
          updateUI();
          startTimer();
          createBoard();
        } else {
          alert('Wrong! Game Over');
          resetGame();
        }
      });

      gameArea.appendChild(tile);
    }
  }

  function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
  }

  function resetGame() {
    gameStarted = false;
    score = 0;
    level = 1;
    updateUI();
    gameArea.innerHTML = '';
    timerDisplay.textContent = 0;
    if (timer) clearInterval(timer);
  }

  startBtn.addEventListener('click', () => {
    console.log('Start button clicked');
    gameStarted = true;
    score = 0;
    level = 1;
    updateUI();
    createBoard();
    startTimer();
  });
});
