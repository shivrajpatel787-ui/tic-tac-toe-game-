 
const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let gameOver = false;

// Handle clicks on all nine boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver || box.innerText !== "") {
            return;
        }

        box.innerText = currentPlayer;
        box.disabled = true;

        if (checkWinner()) {
            statusText.innerText =
                `Congratulations! Player ${currentPlayer} wins!`;

            gameOver = true;
            disableBoxes();
            return;
        }

        const isDraw = [...boxes].every(
            (box) => box.innerText !== ""
        );

        if (isDraw) {
            statusText.innerText = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        statusText.innerText =
            `Player ${currentPlayer}'s turn`;
    });
});

// Check all possible winning combinations
function checkWinner() {
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;

        const valueA = boxes[a].innerText;
        const valueB = boxes[b].innerText;
        const valueC = boxes[c].innerText;

        if (
            valueA !== "" &&
            valueA === valueB &&
            valueB === valueC
        ) {
            return true;
        }
    }

    return false;
}

// Disable all boxes after a win
function disableBoxes() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Start a new game
function resetGame() {
    currentPlayer = "X";
    gameOver = false;

    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });

    statusText.innerText = "Player X's turn";
}

// Reset button event
resetButton.addEventListener("click", resetGame);
