// GLOBAL VARIABLES
var classicMode = document.querySelector('#classic');
var hippieMode = document.querySelector('#hippie');
var choiceViews = Array.from(document.querySelectorAll('.fighter-choice-view'));
var changeGameBtn = document.querySelector('.change-game-button');
var homeView = document.querySelector('.home-view');
var mainMsg = document.querySelector('.main-message');
var winnerView = document.querySelector('.winner-view');
var humanSelection = document.querySelector('.human-selection');
var computerSelection = document.querySelector('.computer-selection');
var humanWins = document.querySelector('.human-wins');
var computerWins = document.querySelector('.computer-wins');
var consoleIcons = Array.from(document.querySelectorAll('.console-person-icon'))
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
changeGameBtn.addEventListener('click', switchToHome);

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
  changeView(winnerView, 'hide');
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
    currentGame = adjustWins(game, 'player1');
    return `${humanToken}${humanSelection} beats ${computerSelection} -- ${game.player1.name} wins!${humanToken}`
  } else {
    currentGame = adjustWins(game, 'player2');
    return `${computerToken}${computerSelection} beats ${humanSelection} -- ${game.player2.name} wins!${computerToken}`
  }
}

function adjustWins(game, player) {
  var updatedGame = game;
  updatedGame[player].wins += 1;
  return updatedGame;
}

function takeTurn(e) {
  var selection1 = e.target.closest('section').classList[1];
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  var winMsg = checkWins(currentGame, selection1, selection2);
  showPersonIcon(e);
  setTimeout(removePersonIcon, 500);
  setTimeout(displayResults, 500, winMsg, selection1, selection2);
  setTimeout(updateWinsDisplay, 500, currentGame.player1, currentGame.player2)
  setTimeout(showFighterChoices, 2000, currentGame.mode);
  setTimeout(changeView, 2000, changeGameBtn, 'show');
}

function displayResults(msg, selection1, selection2) {
  choiceViews.forEach((view) => changeView(view, 'hide'));
  humanSelection.innerHTML = fighters[selection1].innerHTML;
  computerSelection.innerHTML = fighters[selection2].innerHTML;
  mainMsg.innerText = msg;
  changeView(winnerView, 'show');
}

function updateWinsDisplay(firstPlayer, secondPlayer) {
  humanWins.innerText = `Wins: ${firstPlayer.wins}`;
  computerWins.innerText = `Wins: ${secondPlayer.wins}`;
}

function switchToHome() {
  choiceViews.forEach((view) => changeView(view, 'hide'))
  changeView(homeView, 'show');
  changeView(changeGameBtn, 'hide');
  mainMsg.innerText = 'Choose your game!';
}

function showPersonIcon(e) {
  e.target.closest('section').children[1].classList.remove('hidden')
}

function removePersonIcon() {
  consoleIcons.forEach((icon) => changeView(icon, 'hide'))
}
