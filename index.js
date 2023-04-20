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
var userIcon = document.querySelector('.person-icon');
var consoleIcons = Array.from(document.querySelectorAll('.console-person-icon'));
var loginView = document.querySelector('.login-view')
var userName = document.querySelector('#name');
// var playerName = document.querySelector('.player-name');
var loginBtn = document.querySelector('.login-button');
var errorMsg = document.querySelector('.error-message');
var tokenSection = document.querySelector('.token-wrapper');
var tokenOptions = Array.from(document.querySelectorAll('.token-option'));
var fighters = {
  rock: document.querySelector('.rock'),
  paper: document.querySelector('.paper'),
  scissors: document.querySelector('.scissors'),
  love: document.querySelector('.love'),
  peace: document.querySelector('.peace'),
};

// var humanWinKeys = {
//   rock: ['scissors', 'love'],
//   paper: ['rock', 'peace'],
//   scissors: ['paper', 'love'],
//   love: ['paper', 'peace'],
//   peace: ['rock', 'scissors'],
// };

var currentGame;
var humanPlayer;
var computerPlayer;
var selectedToken;


// EVENT LISTENERS
tokenSection.addEventListener('click', selectToken);
loginBtn.addEventListener('click', logIn);
classicMode.addEventListener('click', startNewGame);
hippieMode.addEventListener('click', startNewGame);
choiceViews.forEach((view) => view.addEventListener('click', takeTurn));
changeGameBtn.addEventListener('click', switchToHome);

//EVENT HANDLERS 
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function switchView(domElement, display) {
  if (display === 'show') {
    domElement.classList.remove('hidden')
  } else if (display === 'hide') {
    domElement.classList.add('hidden')
  } else {
    var allViews = Array.from(document.querySelectorAll('.view'))
    domElement.classList.remove('hidden')
    var hiddenViews = allViews.filter((view) => view !== domElement);
    hiddenViews.forEach((view) => view.classList.add('hidden'));
  }
}

function selectToken(e) {
  if (e.target.classList.contains('token-option')) {
    selectedToken = e.target.classList[1];
    tokenOptions.forEach((token) => token.classList.remove('selected-token'))
    e.target.classList.add('selected-token');
  }
}

function updatePlayerInfo() {
  var tokens = {
    '💁‍♀️': 'icons/waving-person.png',
    '🤠': 'icons/cowboy.png',
    '🦋': 'icons/butterfly.png',
    '🦄': 'icons/unicorn.png',
    '🌸': 'icons/flower.png'
  }

  document.querySelector('.player-name').innerText = humanPlayer.name
  userIcon.src = tokens[humanPlayer.token]
  consoleIcons.forEach((icon) => icon.src = tokens[humanPlayer.token])
}

function logIn() {
  if(!userName.value || !selectedToken) {
    switchView(errorMsg, 'show');
  } else {
    humanPlayer = createPlayer(userName.value, selectedToken);
    computerPlayer = createPlayer('computer', '💻');
    updatePlayerInfo();
    switchToHome();
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
  switchView(chosenView);
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
  var humanChoice = updatedGame.player1.selection.classList[1];
  var computerChoice = updatedGame.player2.selection.classList[1];
  var humanWinKeys = {
    rock: ['scissors', 'love'],
    paper: ['rock', 'peace'],
    scissors: ['paper', 'love'],
    love: ['paper', 'peace'],
    peace: ['rock', 'scissors'],
  };
 
  if (humanChoice === computerChoice) {
    currentGame = adjustWins(updatedGame, 'draw');
  } else if (humanWinKeys[humanChoice].includes(computerChoice)) {
    currentGame = adjustWins(updatedGame, 'player1');
  } else {
    currentGame = adjustWins(updatedGame, 'player2');
  }
}

function adjustWins(game, player) {
  var updatedGame = game;
  updatedGame.winner = player;
  if(player !== 'draw') {
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
  setTimeout(updateWinsDisplay, 500, currentGame.player1, currentGame.player2)
  setTimeout(showFighterChoices, 2000, currentGame.mode);
  setTimeout(switchView, 2000, changeGameBtn, 'show');
}

function displayResults() {
  uploadResults(currentGame);
  displayGif();
  switchView(winnerView);
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
  gifs.forEach((gif) => switchView(gif, 'hide'));
  var selectedGif = gifs.find((gif) => gif.classList.contains(currentGame.winner));
  switchView(selectedGif, 'show');
}

function updateWinsDisplay(firstPlayer, secondPlayer) {
  humanWins.innerText = `Wins: ${firstPlayer.wins}`;
  computerWins.innerText = `Wins: ${secondPlayer.wins}`;
}

function switchToHome() {
  switchView(homeView);
  switchView(changeGameBtn, 'hide');
  mainMsg.innerText = 'Choose your game!';
}

function showPersonIcon(e) {
  e.target.closest('section').children[1].classList.remove('hidden')
}

function removePersonIcon() {
  consoleIcons.forEach((icon) => switchView(icon, 'hide'))
}
