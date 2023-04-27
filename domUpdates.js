function switchView(domElement, display) {
  if (display === 'show') {
    domElement.classList.remove('hidden');
  } else if (display === 'hide') {
    domElement.classList.add('hidden');
  } else {
    var allViews = Array.from(document.querySelectorAll('.view'));
    var hiddenViews = allViews.filter((view) => view !== domElement);
    hiddenViews.forEach((view) => view.classList.add('hidden'));
    domElement.classList.remove('hidden');
  }
}

function logOut() {
  var hiddenElements = [
    errorMsg, 
    logOutBtn, 
    changeGameBtn, 
    humanWins, 
    computerWins
  ];
  hiddenElements.forEach((element) => switchView(element, 'hide'));
  switchView(resumeGameBtn, 'show');
  clearLoginPage();
  switchView(loginView);
}

function showResumeView(game) {
  if (!game.mode) {
    switchView(resumeGameBtn, 'hide')
  }
  switchView(resumeView);
  mainMsg.innerText = '';
}

function clearLoginPage() {
  resetDataModel();
  userName.value = '';
  playerName.innerText = 'Human'
  playerIcon.src = './icons/person-icon.webp';
  tokenOptions.forEach((token) => token.classList.remove('selected-token'));
}

function changeTokenDisplay(e) {
  tokenOptions.forEach((token) => token.classList.remove('selected-token'));
  e.target.classList.add('selected-token');
}

function updatePlayerInfo(human) {
  var tokens = {
    '💁‍♀️': 'icons/waving-person.png',
    '🤠': 'icons/cowboy.png',
    '🦋': 'icons/butterfly.png',
    '🦄': 'icons/unicorn.png',
    '🌸': 'icons/flower.png'
  };

  playerName.innerText = human.name;
  playerIcon.src = tokens[human.token];
  consoleIcons.forEach((icon) => (icon.src = tokens[human.token]));
}

function switchToHome() {
  switchView(homeView);
  switchView(changeGameBtn, 'hide');
  switchView(logOutBtn, 'show')
  mainMsg.innerText = 'Choose your game!';
  clearTimeout(timer);
}

function showFighterChoices(mode) {
  var chosenView = choiceViews.find((view) => view.classList.contains(mode));
  switchView(chosenView);
  mainMsg.innerText = 'Choose your fighter!';
}

function displayResults() {
  removePersonIcon();
  uploadResults(currentGame);
  displayGif();
  switchView(winnerView);
  updateWinsDisplay(currentGame.player1, currentGame.player2);
}

function returnToGame(){
  showFighterChoices(currentGame.mode);
  [changeGameBtn, logOutBtn].forEach((btn) => switchView(btn, 'show'));
}

function uploadResults(game) {
  winMsg = createWinMsg(game);
  document.querySelector('.human-selection').innerHTML = game.player1.selection.innerHTML;
  document.querySelector('.computer-selection').innerHTML = game.player2.selection.innerHTML;
  mainMsg.innerText = winMsg[game.winner];
}

function displayGif() {
  var gifs = Array.from(document.querySelectorAll('.gif'));
  gifs.forEach((gif) => switchView(gif, 'hide'));
  var selectedGif = gifs.find((gif) =>
    gif.classList.contains(currentGame.winner)
  );
  switchView(selectedGif, 'show');
}

function updateWinsDisplay(firstPlayer, secondPlayer) {
  humanWins.innerText = `Wins: ${firstPlayer.wins}`;
  computerWins.innerText = `Wins: ${secondPlayer.wins}`;
}

function showPersonIcon(e) {
  switchView(e.target.closest('section').children[1], 'show');
}

function removePersonIcon() {
  consoleIcons.forEach((icon) => switchView(icon, 'hide'));
}