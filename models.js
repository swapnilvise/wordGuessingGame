const {
    pickWord,
    guessWordValidCheck,
    takeTurn,
    exactMatch,
  } = require("./game");
  
  class Game {
    constructor(secretWord) {
      this.secretWord = secretWord;
      this.numberOfValidGuesses = 0;
      this.guessedWords = [];
      this.gameWon = false;
      this.errMessage = "Guess the secret word!";
    }
  
    guessWord(guessedWord) {
      if (this.checkIfTheWordAlreadyGuessed(guessedWord)) {
        this.errMessage = `You have already guessed "${guessedWord}"! Try a new word from the list!`;
        return;
      }
  
      if (guessWordValidCheck(guessedWord)) {
        ++this.numberOfValidGuesses;
        this.addGuessedWord(guessedWord);
      } else {
        this.errMessage =
          "Invalid word! " +
          guessedWord +
          " is not in the acceptable word list. Try Again!";
        return;
      }
  
      this.gameWon = exactMatch(this.secretWord, guessedWord);
      if (this.gameWon) {
        this.errMessage = "Congratulations, you won this round! Hit Restart to play again!";
      } else {
        this.errMessage = "Try to guess the secret word!";
      }
    }
  
    addGuessedWord(guessedWord) {
      const numberOfMatchingLetters = takeTurn(
        this.secretWord,
        guessedWord
      );
      // Add to the beginning of the array
      this.guessedWords.unshift(new Guess(guessedWord, numberOfMatchingLetters));
    }
  
    // Check if the word is already guessed
    checkIfTheWordAlreadyGuessed(guessedWord) {
      return this.guessedWords.some((word) => {
        return word.guessedWord === guessedWord;
      });
    }
  }
  
  class Guess {
    constructor(guessedWord, numberOfMatchingLetters) {
      this.guessedWord = guessedWord;
      this.numberOfMatchingLetters = numberOfMatchingLetters;
    }
  }
  
  class User {
    constructor(username) {
      this.username = username;
      this.game = new Game(pickWord());
      console.log(
        `Secret word for user "${this.username}" is "${this.game.secretWord}"`
      );
    }
  
    createNewGame() {
      this.game = new Game(pickWord());
    }
  }
  
  module.exports = { Game, Guess, User };