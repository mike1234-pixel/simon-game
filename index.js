/* TRACKERS */

var level = 0;
started = false;

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

/* KEY DOWN - GAME START*/

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/* NEXTSEQUENCE() */

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

/* ON CLICK*/

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

/* SOUND FILES */

var blue = new Audio("./sounds/blue.mp3");
var green = new Audio("./sounds/green.mp3");
var red = new Audio("./sounds/red.mp3");
var yellow = new Audio("./sounds/yellow.mp3");
var wrong = new Audio("./sounds/wrong.mp3");

/* PLAYSOUND() */

function playSound(name) {
  if (name == "green") {
    green.play();
  } else if (name == "blue") {
    blue.play();
  } else if (name == "red") {
    red.play();
  } else if (name == "yellow") {
    yellow.play();
  }
}

/* ANIMATEPRESS() */

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/* CHECK ANSWER */

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over. Press Any Key to Restart.");

    startOver();

    console.log("wrong");
  }
}

/* RESTART GAME */

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
