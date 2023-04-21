function switchView(domElement, display) {
  if (display === 'show') {
    domElement.classList.remove('hidden');
  } else if (display === 'hide') {
    domElement.classList.add('hidden');
  } else {
    var allViews = Array.from(document.querySelectorAll('.view'));
    domElement.classList.remove('hidden');
    var hiddenViews = allViews.filter((view) => view !== domElement);
    hiddenViews.forEach((view) => view.classList.add('hidden'));
  }
}

function changeTokenDisplay(e) {
  document
    .querySelectorAll('.token-option')
    .forEach((token) => token.classList.remove('selected-token'));
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

  document.querySelector('.player-name').innerText = human.name;
  document.querySelector('.person-icon').src = tokens[human.token];
  consoleIcons.forEach((icon) => (icon.src = tokens[human.token]));
}

function switchToHome() {
  switchView(homeView);
  switchView(changeGameBtn, 'hide');
  mainMsg.innerText = 'Choose your game!';
}

function showFighterChoices(mode) {
  var chosenView = choiceViews.find((view) => view.classList.contains(mode));
  switchView(chosenView);
  mainMsg.innerText = 'Choose your fighter!';
}

function displayResults() {
  uploadResults(currentGame);
  displayGif();
  switchView(winnerView);
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