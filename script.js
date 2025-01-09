let rows = document.querySelectorAll(".row");
let resetButton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  count = 0;
  enablerows();
  msgContainer.classList.add("hide");
};
rows.forEach((row) => {
    row.addEventListener("click", () => {
    if (turnO) {
        row.innerText = "O";
      turnO = false;
    } else {
        row.innerText = "X";
      turnO = true;
    }
    row.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disablerows();
};
const disablerows = () => {
  for (let row of rows) {
    row.disabled = true;
  }
};
const enablerows = () => {
  for (let row of rows) {
    row.disabled = false;
    row.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disablerows();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = rows[pattern[0]].innerText;
    let pos2Val = rows[pattern[1]].innerText;
    let pos3Val = rows[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
newgameButton.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);
