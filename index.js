var humanWinKeys = {
  rock: ['scissors', 'love'],
  paper: ['rock', 'peace'],
  scissors: ['paper', 'love'],
  love: ['paper', 'peace'],
  peace: ['rock', 'scissors'],
};
var currentGame;
var humanPlayer;
var computerPlayer;


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createPlayer(name, token) {
  return {
    name: name,
    token: token,
    wins: 0,
  }
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
  var humanToken = game.player1.token;
  var computerToken = game.player2.token;
 
  if (humanSelection === computerSelection) {
    return `it\'s a draw`
  } else if (humanWinKeys[humanSelection].includes(computerSelection)) {
    return `${humanToken}${humanSelection} beats ${computerSelection} -- ${game.player1.name} wins!${humanToken}`
  } else {
    return `${computerToken}${computerSelection} beats ${humanSelection} -- ${game.player2.name} wins!${computerToken}`
  }
}

function takeTurn(currentGame, selection1) {
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  var winMsg = checkWins(currentGame, selection1, selection2);
  console.log(winMsg);
}

humanPlayer = createPlayer('laura', '<3');
computerPlayer = createPlayer('computer', 'x')
currentGame = createGame('hippie', humanPlayer, computerPlayer)
takeTurn(currentGame, 'love')