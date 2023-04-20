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
    selection: null
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
    winner: null,
  };
}

function startNewGame(e) {
  currentGame = createGame(e.target.parentNode.id, humanPlayer, computerPlayer);
  showFighterChoices(currentGame.mode);
}

function showFighterChoices(mode) {
  var chosenView = choiceViews.find((view) => view.classList.contains(mode));
  changeView(chosenView, 'show');
  changeView(homeView, 'hide');
  changeView(winnerView, 'hide');
  mainMsg.innerText = 'Choose your fighter!';
}

function chooseFighters(game, selection1, selection2) {
  var updatedGame = game;
  updatedGame.player1.selection = fighters[selection1];
  updatedGame.player2.selection = fighters[selection2];
  return updatedGame;
}

function checkWins(game, selection1, selection2) {
  var updatedGame = chooseFighters(game, selection1, selection2);
  var humanSelection = updatedGame.player1.selection.classList[1];
  var computerSelection = updatedGame.player2.selection.classList[1];
 
  if (humanSelection === computerSelection) {
    currentGame = adjustWins(updatedGame, 'draw');
  } else if (humanWinKeys[humanSelection].includes(computerSelection)) {
    currentGame = adjustWins(updatedGame, 'player1');
  } else {
    currentGame = adjustWins(updatedGame, 'player2');
  }
}

function adjustWins(game, player) {
  var updatedGame = game;
  updatedGame.winner = player;
  updatedGame[player].wins += 1;
  return updatedGame;
}

function takeTurn(e) {
  var selection1 = e.target.closest('section').classList[1];
  var selection2 = currentGame.board[getRandomIndex(currentGame.board)];
  checkWins(currentGame, selection1, selection2);
  showPersonIcon(e);
  setTimeout(removePersonIcon, 500);
  setTimeout(displayResults, 500);
  setTimeout(updateWinsDisplay, 500, currentGame.player1, currentGame.player2)
  setTimeout(showFighterChoices, 2000, currentGame.mode);
  setTimeout(changeView, 2000, changeGameBtn, 'show');
}

function displayResults() {
  choiceViews.forEach((view) => changeView(view, 'hide'))
  uploadResults(currentGame);
  displayGif();
  changeView(winnerView, 'show');
}

function createWinMsg(game) {
  var humanToken = game.player1.token;
  var computerToken = game.player2.token;
  var humanChoice = game.player1.selection.classList[1];
  var computerChoice = game.player2.selection.classList[1];
  return {
    player1: `${humanToken}${humanChoice} beats ${computerChoice} -- ${game.player1.name} wins!${humanToken}`,
    player2: `${computerToken}${computerChoice} beats ${humanChoice} -- ${game.player2.name} wins!${computerToken}`,
    draw:`💖it\'s a draw💖`
  }
}

function uploadResults(game) {
  winMsg = createWinMsg(game);
  humanSelection.innerHTML = game.player1.selection.innerHTML;
  computerSelection.innerHTML = game.player2.selection.innerHTML;
  mainMsg.innerText = winMsg[game.winner];
}

function displayGif() {
  var gifs = Array.from(document.querySelectorAll('.gif'));
  gifs.forEach((gif) => changeView(gif, 'hide'));
  var selectedGif = gifs.find((gif) => gif.classList.contains(currentGame.winner));
  changeView(selectedGif, 'show');
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
