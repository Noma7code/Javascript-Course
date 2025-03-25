const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

//Another form of the code just commented above
/*
if(!score){
  score={
    wins:0,
    losses:0,
    ties: 0
  } 
}*/
//atuomatically play against itself.
let ifAutoPlay = true;
let intervalId;
function autoplay() {
  if (ifAutoPlay) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    ifAutoPlay = false;
  } else {
    clearInterval(intervalId);
    ifAutoPlay = true; //update ifautoplay to be able execute the function again
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose!";
    } else if (computerMove === "paper") {
      result = "You Win!";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove == "paper") {
    if (computerMove === "rock") {
      result = "You Win!";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose!";
    }
  } else {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose!";
    } else if (computerMove === "scissors") {
      result = "You Win!";
    }

    //updated the game with a score using object
  }

  if (result === "You Win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score)); //localStorage only supports strings

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-move").innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}
function pickComputerMove() {
  const randonNumber = Math.random();
  let computerMove = "";
  if (randonNumber >= 0 && randonNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randonNumber >= 1 / 3 && randonNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
//keydown event 

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});



