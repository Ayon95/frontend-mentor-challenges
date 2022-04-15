# Rock, paper, scissors, lizard, spock

## Rules

- rock beats scissors and lizard
- scissors beat paper and lizard
- paper beats rock and spock
- lizard beats paper and spock
- spock beats rock and scissors

## Steps

- user makes a selection
- make a random selection for the computer
- check who wins
- display the result

## How to make a random selection for the computer

- generate a random number between 0 and 4 so that each option has an equal chance of being selected
- 0 = rock, 1 = paper, 2 = scissors, 3 = lizard, 4 = spock

```js
const options = ["rock", "paper", "scissors", "lizard", "spock"];
```

## How to determine who wins

```js
const optionsWeakAgainst = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};
```

- if `userSelection === computerSelection`, then it's a tie
- if `optionsWeakAgainst[userSelection].includes(computerSelection)`, then user wins
- otherwise, computer wins

```
Example:

userSelection = 'rock';

// user wins
computerSelection = 'scissors' OR 'lizard';

// computer wins
computerSelection = 'paper' OR 'spock';

// tie
computerSelection = 'rock';
```

## How the fade-in and fade-out animations will work

- when the player makes a selection, we want to make the options element disappear and the result display element appear in a smooth gradual manner
- to achieve this, we will run an animation, and once the animation is complete, we will add or remove the target element to the DOM by controlling its display property
- at first, we apply fade-out animation to options element
- then we apply display: none to options element
- then we remove display: none from the result display element
- then we apply fade-in animation to result display
