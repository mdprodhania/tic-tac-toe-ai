// This file contains the logic for the Tic Tac Toe game, including functions to handle player moves, check for wins or draws, and reset the game.

const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const statusDisplay = document.getElementById('msg');
const boxes = document.querySelectorAll('.box');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleBoxClick(event) {
    const clickedBox = event.target;
    const boxIndex = Array.from(boxes).indexOf(clickedBox);

    if (board[boxIndex] !== '' || !gameActive) {
        return;
    }

    board[boxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    board.fill('');
    boxes.forEach(box => box.textContent = '');
    statusDisplay.textContent = '';
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
document.getElementById('reset-btn').addEventListener('click', resetGame);