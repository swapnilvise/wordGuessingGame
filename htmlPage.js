const words = require("./words.js");

const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="loginPage">
          <div id="content" class="content-container">
            <form action="/login" method="POST"> 
                <h1>Word Guessing Game</h1>    
              <div class="text-input" id="login_username">
                <input name="username" placeholder="Enter your username" required> 
                <div class="space">
                  <button class="login-button" type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
    `;
};

const invalidUserNamePage = (errorMessage) => {
  return `
    <link rel="stylesheet" href="/style.css" />
    <h2>${errorMessage}</h2>
    <h3>Please Login Again..!!</h3>
    <form method="GET" action="/">
    <button class="login-button" type="submit">Login</button>
    </form>
  `;
};

const homePage = (user) => {
  return `
  <!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
      <title>Word Guessing Game</title>
    </head>
    <body>
      <div id="word-guessing-game">
        <div class="page-title">
          <h2>Welcome Aboard! ${user.username} </h2>
          <div class="logout"> 
            <form action="/logout" method="POST"> 
              <button class="logout-button" type="submit">Logout</button>
            </form>
          </div>
        </div>
        <div class="game-panel">
          <div class="word-list-panel">
          <p class="rules">Game Instructions : 
            <br>
            1.Start guessing the secret word, which is one of the words from the Acceptable Words List.
            <br>
            2.If the guessed word is not on the Acceptable Words List, the guess is invalid.
            <br>
            3.Your score is determined by the number of correct guesses you make.
            <br>
            4.If you win the round, click on Restart button to play again.
            <br> 
            </p>
          <h3 class="title">List of Acceptable Words: Click on the word to guess</h3>
            <div class="word-list">
              ${words.map((word) => `<p class="word">${word}</p>`).join("")}
            </div>
          </div>
          <div class="game-panel-container">
            <p class="turns">
              Number Of Valid Guesses: ${user.game.numberOfValidGuesses}
              <br><br>
              <span className="score">
              ${
                user.game.guessedWords.length > 0
                  ? ` 
              Your Previous Valid Guess: ${user.game.guessedWords[0].guessedWord} matched ${user.game.guessedWords[0].numberOfMatchingLetters} letters with secret word`
                  : ""
              }
              </span>
            </p>
            <div class="control-panel">
              <div class="word-input">
                <form action="/guess" method="POST"> 
                  <input id="guess-field" name="guessedWord" placeholder="Type your guess" required ${
                    user.game.gameWon ? "disabled" : "enabled"
                  }> 
                  <button class="guess-button" type="submit" ${
                    user.game.gameWon ? "disabled" : "enabled"
                  }>Guess</button>
                </form>
                <div class="message-panel">
                ${user.game.errMessage}
                </div> 
                <div class="controls">
                  <div class="restart"> 
                    <form action="/new-game" method="GET"> 
                      <button class="restart-button" type="submit">Restart</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="accepted-guess-panel">
              <h3>Valid Guesses & Letter Match History</h3>
              <div class="history-panel">
                  ${user.game.guessedWords
                    .map(
                      (guess) =>
                        `<div><span class="word">You guessed "${guess.guessedWord}"</span> : <span class="word">matched ${guess.numberOfMatchingLetters} letters with secret word</span></div>`
                    )
                    .join("")}
              </div>
            </div>
          </div>
        </div> 
      </div>
      <script>
        let words = document.querySelectorAll(".word");
        let guessField = document.querySelector("#guess-field");
        words.forEach(word => {
          word.addEventListener("click", (e) => {
            guessField.value = e.target.innerText;
          });
        });
      </script>
    </body>
  </html>
  `;
};

module.exports = { loginPage, invalidUserNamePage, homePage };