const gameArea = document.getElementById('gameArea');
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);

  const diff = Math.max(3, 40 - level * 3);

  return {
    normal: `rgb(${r}, ${g}, ${b})`,
    different: `rgb(${clamp(r + diff)}, ${clamp(g + diff)}, ${clamp(b + diff)})`
  };
}

function startTimer() {
  clearInterval(timer);

  timeLeft = Math.max(2, 6 - Math.floor(level / 2));
  timerDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Time Up!');
      resetGame();
    }
  }, 1000);
}

function createBoard() {
  gameArea.innerHTML = '';

  const size = getGridSize();
  gameArea.style.gridTemplateColumns = `repeat(${size}, 60px)`;

  const total = size * size;
  const { normal, different } = generateColors();
  const target = Math.floor(Math.random() * total);

  for (let i = 0; i < total; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.backgroundColor = i === target ? different : normal;

    tile.onclick = () => {
      if (!gameStarted) return;

      if (i === target) {
        score++;
        level++;
        updateUI();
        startTimer(); // reset timer
        createBoard();
      } else {
        alert('Wrong!');
        resetGame();
      }
    };

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
  clearInterval(timer);
}

// ===== FIX UTAMA DI SINI =====
startBtn.onclick = function () {
  gameStarted = true;
  score = 0;
  level = 1;
  updateUI();
  createBoard();
  startTimer();
};
