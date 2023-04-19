// GLOBAL VARIABLES
var classicMode = document.querySelector('#classic');
var hippieMode = document.querySelector('#hippie');
var choiceViews = Array.from(document.querySelectorAll('.fighter-choice-view'));
var homeView = document.querySelector('.home-view');
var mainMsg = document.querySelector('.main-message');
var winnerView = document.querySelector('.winner-view');
var humanSelection = document.querySelector('.human-selection');
var computerSelection = document.querySelector('.computer-selection');
var fighters = {
  rock: document.querySelector('.rock'),
  paper: document.querySelector('.paper'),
  scissors: document.querySelector('.scissors'),
  love: document.querySelector('.love'),
  peace: document.querySelector('.peace'),
};

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


// EVENT LISTENERS
window.addEventListener('load', function () {
  humanPlayer = createPlayer('human');
  computerPlayer = createPlayer('computer')
})
classicMode.addEventListener('click', startNewGame);
hippieMode.addEventListener('click', startNewGame);
choiceViews.forEach((view) => view.addEventListener('click', takeTurn));


//EVENT HANDLERS 
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function changeView(domElement, display) {
  if (display === 'show') {
    domElement.classList.remove('hidden')
  } else if (display === 'hide') {
    domElement.classList.add('hidden')
  }
}

function createPlayer(name, token) {
  return {
    name: name,
    token: token || 'x',
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

function startNewGame(e) {
  currentGame = createGame(e.target.parentNode.id, humanPlayer, computerPlayer);
  showFighterChoices(currentGame.mode);
}

function showFighterChoices(mode) {
  var chosenView = choiceViews.filter((view) => view.classList.contains(mode));
  changeView(chosenView[0], 'show');
  changeView(homeView, 'hide');
  mainMsg.innerText = 'Choose your fighter!';
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

function takeTurn(e) {
  var selection1 = e.target.closest('section').classList[1];
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  var winMsg = checkWins(currentGame, selection1, selection2);
  displayResults(winMsg, selection1, selection2)
}

function displayResults(msg, selection1, selection2) {
  choiceViews.forEach((view) => changeView(view, 'hide'));
  humanSelection.innerHTML = '';
  computerSelection.innerHTML = '';
  humanSelection.innerHTML += fighters[selection1].innerHTML;
  computerSelection.innerHTML += fighters[selection2].innerHTML;
  mainMsg.innerText = msg;
  changeView(winnerView, 'show');
}