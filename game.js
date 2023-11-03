let userScore = 0;
let computerScore = 0;

document.getElementById("rock").addEventListener("click", function () {
  playRound(1);
});

document.getElementById("paper").addEventListener("click", function () {
  playRound(2);
});

document.getElementById("scissors").addEventListener("click", function () {
  playRound(3);
});

function playRound(userChoice) {
  const computerChoice = Math.floor(Math.random() * 3) + 1;

  let winner = determineWinner(userChoice, computerChoice);

  if (winner === "user") {
    userScore++;
  } else {
    computerScore++;
  }

  document.getElementById("userScore").innerText = userScore;
  document.getElementById("computerScore").innerText = computerScore;

  alert(displayResult(winner));
}

function determineWinner(user, computer) {
  if (user === computer) {
    return "tie";
  } else if (
    (user === 1 && computer === 3) ||
    (user === 2 && computer === 1) ||
    (user === 3 && computer === 2)
  ) {
    return "user";
  } else {
    return "computer";
  }
}

function displayResult(winner) {
  if (winner === "user") {
    return "사용자가 승리했습니다!";
  } else if (winner === "computer") {
    return "컴퓨터가 승리했습니다!";
  } else {
    return "무승부입니다.";
  }
}
