var humanWinKeys = {
  rock: ['scissors', 'love'],
  paper: ['rock', 'peace'],
  scissors: ['paper', 'love'],
  love: ['paper', 'peace'],
  peace: ['rock', 'scissors'],
};
var currentGame;


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createGame(mode, player1, player2) {
  var boardType = {
    classic: ['rock', 'paper', 'scissors'],
    hippie: ['rock', 'paper', 'scissors', 'love', 'peace'],
  };
  return {
    mode: mode,
    board: boardType[mode],
    player1: player1,
    player2: player2,
  };
}

function checkWins(game, selection1, selection2) {
  var humanSelection = selection1;
  var computerSelection = selection2;
 
  if (humanSelection === computerSelection) {
    return `it\'s a draw`
  } else if (humanWinKeys[humanSelection].includes(computerSelection)) {
    return `${humanSelection} beats ${computerSelection} -- ${game.player1} wins!`
  } else {
    return `${computerSelection} beats ${humanSelection} -- ${game.player2} wins!`
  }
}

function takeTurn(currentGame, selection1) {
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  var winMsg = checkWins(currentGame, selection1, selection2);
  console.log(winMsg);
}
currentGame = createGame('classic', 'laura', 'computer')
takeTurn(currentGame, 'rock')