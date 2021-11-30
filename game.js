var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStartFlag = false;
var level = 0;

var wrongSound = new Audio("sounds/wrong.mp3");



//Start of the game
function startGame() {
  if (!gameStartFlag) {
    nextSequence();
    gameStartFlag = true;
    $(".restart-button").hide();
  }
}

$(document).keypress(function(){
  startGame();
});

$(".restart-button").click(function(){
  startGame();
});


//game sequence generation
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.round(Math.random()*3);
  var randomColorChosen = buttonColors[randomNumber];
  gamePattern.push(randomColorChosen);
  $("#" + randomColorChosen).fadeOut(100).fadeIn(100);
  playSound(randomColorChosen);

}

//checking yhe answer
function checkAnswer(sequenceNumber, gamePattern, userClickedColor) {
  if (gamePattern[sequenceNumber]===userClickedColor) {
    if (sequenceNumber+1===level) setTimeout(function() {
      nextSequence();
    }, 1000);
  } else {
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    restartGame();
    $(".restart-button").text("Restart");
    $(".restart-button").show();
  }
}

//clicking on buttons
$(".btn").click(function() {
  userClickedPattern.push(this.id);
  playSound(this.id);
  // $("#" + this.id).addClass("pressed");
  // setTimeout(function(){
  //   $("#" + this.id).addClass("pressed");
  //   console.log("gagag");
  //   $("#" + this.id).addClass("pressed");
  // }, 1000);
  buttonAnimation(this.id);
  checkAnswer(userClickedPattern.length-1, gamePattern, this.id);
});

//button pressing animation
function buttonAnimation(currendColor) {
  $("#" + currendColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currendColor).removeClass("pressed");
  }, 100);
}

//play the sound of b
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//restart the game
function restartGame() {
  level = 0;
  gamePattern = [];
  gameStartFlag = false;
}
