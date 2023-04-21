// GLOBAL VARIABLES
var gameModes = document.querySelectorAll('.game-mode');
var choiceViews = Array.from(document.querySelectorAll('.fighter-choice-view'));
var changeGameBtn = document.querySelector('.change-game-button');
var homeView = document.querySelector('.home-view');
var mainMsg = document.querySelector('.main-message');
var winnerView = document.querySelector('.winner-view');
var humanSelection = document.querySelector('.human-selection');
var computerSelection = document.querySelector('.computer-selection');
var humanWins = document.querySelector('.human-wins');
var computerWins = document.querySelector('.computer-wins');
var consoleIcons = document.querySelectorAll('.console-person-icon');
var loginView = document.querySelector('.login-view');
var loginBtn = document.querySelector('.login-button');
var tokenSection = document.querySelector('.token-wrapper');

var currentGame;
var humanPlayer;
var computerPlayer;
var selectedToken;


// EVENT LISTENERS
tokenSection.addEventListener('click', selectToken);
loginBtn.addEventListener('click', logIn);
gameModes.forEach((mode) => mode.addEventListener('click', startNewGame));
choiceViews.forEach((view) => view.addEventListener('click', takeTurn));
changeGameBtn.addEventListener('click', switchToHome);

//EVENT HANDLERS 
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function selectToken(e) {
  if (e.target.classList.contains('token-option')) {
    selectedToken = e.target.classList[1];
    changeTokenDisplay(e);
  }
}

function logIn() {
  var userName = document.querySelector('#name');
  var existingUser = localStorage.getItem(userName.value.toLowerCase());
  var errorMsg = document.querySelector('.error-message');
  if (!userName.value || !selectedToken) {
    switchView(errorMsg, 'show');
    return null; 
  } if (existingUser) {
    var player = JSON.parse(existingUser);
    player.token = selectedToken;
    humanPlayer = player;
    computerPlayer = createPlayer('computer', '💻');
    updatePlayerInfo();
    updateWinsDisplay(humanPlayer, computerPlayer);
    switchToHome();
  } else  {
    humanPlayer = createPlayer(userName.value, selectedToken);
    localStorage.setItem(humanPlayer.name.toLowerCase(), JSON.stringify(humanPlayer));
    computerPlayer = createPlayer('computer', '💻');
    updatePlayerInfo();
    switchToHome();
  }
}

function createPlayer(name, token) {
  return {
    name: name,
    token: token,
    wins: 0,
    selection: null
  };
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
    winner: null
  };
}

function startNewGame(e) {
  currentGame = createGame(e.target.parentNode.id, humanPlayer, computerPlayer);
  showFighterChoices(currentGame.mode);
}

function chooseFighters(game, selection1, selection2) {
  var fighters = {
    rock: document.querySelector('.rock'),
    paper: document.querySelector('.paper'),
    scissors: document.querySelector('.scissors'),
    love: document.querySelector('.love'),
    peace: document.querySelector('.peace')
  };

  var updatedGame = game;
  updatedGame.player1.selection = fighters[selection1];
  updatedGame.player2.selection = fighters[selection2];
  return updatedGame;
}

function checkWins(game, selection1, selection2) {
  var updatedGame = chooseFighters(game, selection1, selection2);
  var humanChoice = updatedGame.player1.selection.classList[1];
  var computerChoice = updatedGame.player2.selection.classList[1];
  var humanWinKeys = {
    rock: ['scissors', 'love'],
    paper: ['rock', 'peace'],
    scissors: ['paper', 'love'],
    love: ['paper', 'peace'],
    peace: ['rock', 'scissors']
  };

  if (humanChoice === computerChoice) {
    currentGame = adjustWins(updatedGame, 'draw');
  } else if (humanWinKeys[humanChoice].includes(computerChoice)) {
    currentGame = adjustWins(updatedGame, 'player1');
  } else {
    currentGame = adjustWins(updatedGame, 'player2');
  }
  localStorage.setItem(humanPlayer.name, JSON.stringify(currentGame.player1));
}

function adjustWins(game, player) {
  var updatedGame = game;
  updatedGame.winner = player;
  if (player !== 'draw') {
    updatedGame[player].wins += 1;
  }
  return updatedGame;
}

function takeTurn(e) {
  var selection1 = e.target.closest('section').classList[1];
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  checkWins(currentGame, selection1, selection2);
  showPersonIcon(e);
  setTimeout(removePersonIcon, 500);
  setTimeout(displayResults, 500);
  setTimeout(updateWinsDisplay, 500, currentGame.player1, currentGame.player2);
  setTimeout(showFighterChoices, 2000, currentGame.mode);
  setTimeout(switchView, 2000, changeGameBtn, 'show');
}

function createWinMsg(game) {
  var humanToken = game.player1.token;
  var computerToken = game.player2.token;
  var humanChoice = game.player1.selection.classList[1];
  var computerChoice = game.player2.selection.classList[1];
  return {
    player1: `${humanToken}${humanChoice} beats ${computerChoice} -- ${game.player1.name} wins!${humanToken}`,
    player2: `${computerToken}${computerChoice} beats ${humanChoice} -- ${game.player2.name} wins!${computerToken}`,
    draw: `💖it\'s a draw💖`
  };
}