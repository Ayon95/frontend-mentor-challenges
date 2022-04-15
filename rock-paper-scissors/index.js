const scoreNumber = document.querySelector(".score__number");
const optionsElem = document.querySelector(".options");
const playerSelectionElem = document.querySelector(".selection--player");
const computerSelectionElem = document.querySelector(".selection--computer");
const playerSelectionIconOuterContainer = document.querySelector(
  ".selection--player .selection__image-outer-container"
);
const computerSelectionIconOuterContainer = document.querySelector(
  ".selection--computer .selection__image-outer-container"
);
const playerSelectionIcon =
  playerSelectionIconOuterContainer.querySelector("img");
const computerSelectionIcon =
  computerSelectionIconOuterContainer.querySelector("img");
const resultDisplay = document.querySelector(".result-display");
const resultText = resultDisplay.querySelector(".result__text");
const playAgainButton = resultDisplay.querySelector(".btn--play-again");
const rulesButton = document.querySelector(".btn--rules");
const rulesModal = document.querySelector(".modal");
const rulesModalCloseButton = rulesModal.querySelector(".modal__close-btn");

let selectionMade = false;
const options = ["rock", "paper", "scissors", "lizard", "spock"];
const optionsWeakAgainst = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};
const outcomes = {
  TIE: "Tie",
  PLAYER_WON: "You won",
  PLAYER_LOST: "You lost",
};
const fadeInOutDuration = 400;

function getComputerSelection() {
  const index = Math.floor(Math.random() * 5);
  return options[index];
}

function getOutcome(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) return outcomes["TIE"];
  if (optionsWeakAgainst[playerSelection].includes(computerSelection)) {
    return outcomes["PLAYER_WON"];
  } else return outcomes["PLAYER_LOST"];
}

function updateScore(outcome) {
  const currentScore = Number.parseFloat(scoreNumber.textContent);
  if (outcome === outcomes["PLAYER_WON"]) {
    scoreNumber.textContent = currentScore + 1;
  }
}

function populateResultDisplay(outcome, playerSelection, computerSelection) {
  playerSelectionIconOuterContainer.classList.add(`bg-${playerSelection}`);
  computerSelectionIconOuterContainer.classList.add(`bg-${computerSelection}`);

  playerSelectionIcon.src = `./images/icon-${playerSelection}.svg`;
  playerSelectionIcon.alt = playerSelection;

  computerSelectionIcon.src = `./images/icon-${computerSelection}.svg`;
  computerSelectionIcon.alt = computerSelection;

  resultText.textContent = outcome;
}

function restoreResultDisplay() {
  playerSelectionIconOuterContainer.className =
    "selection__image-outer-container";
  computerSelectionIconOuterContainer.className =
    "selection__image-outer-container";

  playerSelectionIcon.src = "";
  playerSelectionIcon.alt = "";

  computerSelectionIcon.src = "";
  computerSelectionIcon.alt = "";

  resultText.textContent = "";
}

function fadeIn(elem) {
  elem.classList.toggle("display-none");
  elem.classList.remove("fade-out");
  elem.classList.add("fade-in");
}

function fadeOut(elem) {
  elem.classList.remove("fade-in");
  elem.classList.add("fade-out");
  setTimeout(() => {
    elem.classList.toggle("display-none");
  }, fadeInOutDuration);
}

function handleClickOption(e) {
  const optionElem = e.target.closest(".options__item");
  if (!optionElem || selectionMade) return;
  selectionMade = true;
  const playerSelection = optionElem.dataset.option;
  const computerSelection = getComputerSelection();
  const outcome = getOutcome(playerSelection, computerSelection);
  updateScore(outcome);
  fadeOut(optionsElem);
  setTimeout(() => {
    populateResultDisplay(outcome, playerSelection, computerSelection);
    fadeIn(resultDisplay);
  }, fadeInOutDuration);
}

function resetGame() {
  selectionMade = false;
  fadeOut(resultDisplay);
  setTimeout(() => {
    restoreResultDisplay();
    fadeIn(optionsElem);
  }, fadeInOutDuration);
}

function toggleRulesModalVisibility() {
  const ariaHidden = rulesModal.getAttribute("aria-hidden");
  if (ariaHidden === "true") fadeIn(rulesModal);
  else fadeOut(rulesModal);
  rulesModal.setAttribute(
    "aria-hidden",
    ariaHidden === "true" ? "false" : "true"
  );
}

function trapFocusWithinRulesModal(e) {
  if (e.key !== "Tab") return;
  rulesModalCloseButton.focus();
  e.preventDefault();
}

optionsElem.addEventListener("click", handleClickOption);
playAgainButton.addEventListener("click", resetGame);
rulesButton.addEventListener("click", toggleRulesModalVisibility);

rulesModal.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.closest(".modal__close-btn")
  ) {
    toggleRulesModalVisibility();
  }
});

document.addEventListener("keydown", function (e) {
  const modalIsOpen = rulesModal.getAttribute("aria-hidden") === "false";
  if (modalIsOpen) trapFocusWithinRulesModal(e);
  if (e.key === "Escape" && modalIsOpen) {
    toggleRulesModalVisibility();
  }
});
