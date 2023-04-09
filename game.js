//alert("hello");

// creating an array with 4 values.
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // creating an empty array

var userClickedPattern = []; // creating an empty array

/*We need a way to keep track of whether if the game has started or not,
so that we only call nextSequence() on the first keypress.
*/
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

/*Using the jQuery to detect when a keyboard key has been pressed, when that
happens for the first time, call nextSequence().*/
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/*Using jQuery to detect when any of the buttons are clicked and trigger a
handler function. */
$(".btn").click(function() {

  /*Inside the handler, creating a new variable called userChosenColour to
  store the id of the button that got clicked. */
  var userChosenColour = $(this).attr("id");

  /* Add the contents of the variable userChosenColour to the end of this
  new userClickedPattern. */
  userClickedPattern.push(userChosenColour);

  /* In the same way we played sound in nextSequence() , when a user clicks on
  a button, the corresponding sound should be played.
*/
  playSound(userChosenColour);

/*this code will display relevant information when user will press any
button in the website the chrome developer console log will be opened. */
  //console.log(userClickedPattern);

// Declaring animatePress() to create an animation effect when a user clicks
    animatePress(userChosenColour);

    /*Call checkAnswer() after a user has clicked and chosen their answer,
    passing in the index of the last answer in the user's sequence.*/
    checkAnswer(userClickedPattern.length-1);

});

/* Creating a new function called checkAnswer(), which will take one input with
the name currentLevel. */
function checkAnswer(currentLevel) {

/* Writing an if statement inside checkAnswer() to check if the most recent user
 answer is the same as the game pattern. If so then log "success", otherwise
 log "wrong".*/
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //  console.log("success");

      /* If the user got the most recent answer right in step 3, then check
      that they have finished their sequence with another if statement.*/
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

    //  console.log("wrong");

      /* In the sounds folder, there is a sound called wrong.mp3,
      play this sound if the user got one of the answers wrong.*/
      playSound("wrong");

      /* In the styles.css file, there is a class called "game-over",
      apply this class to the body of the website when the user gets one of the
      answers wrong and then remove it after 200 milliseconds.*/
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      /* Change the h1 title to say "Game Over, Press Any Key to Restart" if
      the user got the answer wrong.*/
      $("#level-title").text("Game Over, Press Any Key to Restart");

      // Call startOver() if the user gets the sequence wrong.
      startOver();

    }

}

// creating a function called nextSequence
function nextSequence(){

  /* When the nextSequence() is triggered, reset the userClickedPattern to an empty
   array ready for the next level.*/
  userClickedPattern = [];

  /* Inside nextSequence(), increase the level by 1 every time nextSequence()
  is called.  */
  level++;

  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);


  /* creating random number ranging from 0 to 3. Math.floor will round up the
  decimal figures into an integer whole number.*/
  var randomNumber = Math.floor(Math.random() * 4);

  /*Create a new variable called randomChosenColour and use the randomNumber
   to select a random colour from the buttonColours array.
*/
  var randomChosenColour = buttonColours [randomNumber];

  //  Adding the new randomChosenColour to add new values into gamePattern array
  gamePattern.push(randomChosenColour);

  /* Using jQuery to select the button with the same id name as the
randomChosenColour.Then using jQuery to animate a flash to the selected button*/
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  /* Refactor the code in playSound() so that it will work for both playing
  sound in nextSequence() and when the user clicks a button.*/
  playSound(randomChosenColour);

};

/* Create a new function called playSound() that takes a
single input parameter called name. */
function playSound(name) {

//Using Javascript to play the sound for the button colour selected previously
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); // playing the currently selected audio.
}

/* Create a new function called animatePress(), it should take a single input
parameter called currentColour. */
function animatePress(currentColor) {

  /*Using jQuery to add this pressed class to the button that gets clicked
   inside animatePress().*/
  $("#" + currentColor).addClass("pressed");

  // Removing the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Create a new function called startOver().
function startOver() {

  /* Inside this function, you'll need to reset the values of level,
  gamePattern and started variables.  */
  level = 0;
  gamePattern = [];
  started = false;
}
