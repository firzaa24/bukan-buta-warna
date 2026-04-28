const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;

function generateColors() {
  const baseR = Math.floor(Math.random() * 200);
  const baseG = Math.floor(Math.random() * 200);
  const baseB = Math.floor(Math.random() * 200);

  const diff = Math.max(5, 30 - score);

  return {
    normal: `rgb(${baseR}, ${baseG}, ${baseB})`,
    different: `rgb(${baseR + diff}, ${baseG + diff}, ${baseB + diff})`
  };
}

function createBoard() {
  gameArea.innerHTML = '';

  const { normal, different } = generateColors();
  const differentIndex = Math.floor(Math.random() * 36);

  for (let i = 0; i < 36; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.backgroundColor = i === differentIndex ? different : normal;

    tile.addEventListener('click', () => {
      if (i === differentIndex) {
        score++;
        scoreDisplay.textContent = score;
        createBoard();
      } else {
        alert('Wrong! Game Over');
        score = 0;
        scoreDisplay.textContent = score;
        createBoard();
      }
    });

    gameArea.appendChild(tile);
  }
}

createBoard();
