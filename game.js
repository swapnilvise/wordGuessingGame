const words = require("./words.js");

// function to return a random word
function pickWord(wordList) {
    return words[Math.floor(Math.random() * words.length)];
}

// function to check if a word is a valid word from the list case-insensitive
const guessWordValidCheck = (guessedWord) => {
  return words.includes(guessedWord.toLowerCase());
};

const exactMatch = (secretWord, guessedWord) => {
  return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

const takeTurn = (secretWord, guessedWord) => {
  let count = 0;
  let secretWordInLowerCase = secretWord.toLowerCase();
  let guessedWordInLowerCase = guessedWord.toLowerCase();
  for (let index in secretWordInLowerCase) {
    let currentLetter = secretWordInLowerCase[index];
    if (guessedWordInLowerCase.includes(currentLetter)) {
      ++count;
      guessedWordInLowerCase = guessedWordInLowerCase.replace(
        currentLetter,
        ""
      );
    }
  }
  return count;
};

module.exports = {
  pickWord,
  guessWordValidCheck,
  takeTurn,
  exactMatch,
};