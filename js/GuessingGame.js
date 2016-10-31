// Game
// - Game.prototype.playersGuessSubmission
// - Game.prototype.checkGuess
// - Game.prototype.difference
// - Game.prototype.isLower
// - Game.prototype.provideHint
// - generateWinningNumber
// - newGame
// - shuffle



function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
  this.count = 0;
}

var generateWinningNumber = function(){
  return Math.round((Math.random() * 99) + 1);
}

var shuffle = function(array){
  var lastUnshuffled = array.length, randomIndex, temp;

  while (lastUnshuffled){
    randomIndex = Math.floor(Math.random() * lastUnshuffled--);
    temp = array[lastUnshuffled];
    array[lastUnshuffled] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

Game.prototype.difference = function(){
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
  if (num >= 1 && num <= 100) {
    this.playersGuess = num;
    return this.checkGuess(num);
  } else {
    throw "That is an invalid guess.";
  }
}

Game.prototype.checkGuess = function(num){

  if (num == this.winningNumber){
    $("#submit, #hint").attr("disabled");
    $(".guess li:nth-last-child(" + this.count + ")").text(num);
    $("h2").text("Click 'Start over' to play again!");
    return "You Win!";

  } else if (this.pastGuesses.indexOf(num) >= 0){
      return "You have already guessed that number.";

  } else {
      this.pastGuesses.push(num);
      this.count++;
      console.log(this.count);

      if (this.count === 5) {
        $("#submit, #hint").attr("disabled");
        $(".guess li:nth-last-child(" + this.count + ")").text(num);
        $("h2").text("Click 'Start over' to play again!");
        return 'You Lose.';

      } else if (this.difference(num) < 10){
        $(".guess li:nth-last-child(" + this.count + ")").text(num);

        this.isLower(num) ? $("h2").text("Guess higher") : $("h2").text("Guess lower");

        return "You're burning up!";

      } else if (this.difference(num) < 25){
        $(".guess li:nth-last-child(" + this.count + ")").text(num);

        this.isLower(num) ? $("h2").text("Guess higher") : $("h2").text("Guess lower");

          return "You're lukewarm.";

      } else if (this.difference(num) < 50){
          $(".guess li:nth-last-child(" + this.count + ")").text(num);

          this.isLower(num) ? $("h2").text("Guess higher") : $("h2").text("Guess lower");

          return "You're a bit chilly.";

      } else {
          $(".guess li:nth-last-child(" + this.count + ")").text(num);

          this.isLower(num) ? $("h2").text("Guess higher") :    $("h2").text("Guess lower");

          return "You're ice cold!";
      }
  }
}

var newGame = function(){
  return new Game;
}

Game.prototype.provideHint = function(){
  returnArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  return shuffle(returnArray);
}

// *******************************


$(document).ready(function(){
  var game = new Game;
  var value = null;

  var submitFn = function() {
    value = $('#player-input').val();
    $('#player-input').val(null);

    var result = game.playersGuessSubmission(value);
    $("h1").text(result);


  }

  $('#submit').click(submitFn);

  $('#player-input').keypress(function(event){
    if (event.which == 13){ submitFn(); }
  });

  $("#reset").click(function(){
    game = new Game;
    $("#submit, #hint").removeAttr("disabled");
    $("#title").text("Guessing Game");
    $("#subtitle").text("Guess a number between 1-100");
    $(".guess").find("li").text("–");
  });

  $("#hint").click(function(){
    $("#title").text(game.provideHint());
  });
});
