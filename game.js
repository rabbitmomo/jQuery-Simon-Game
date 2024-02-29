var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    //1. generate randomnumber
    //2. create array hold red blue green and yellow
    //3. Link random number to choose random element from element in step 2
    //4. at the top of js file, create empty array called gamePattern and it holds game sequence later
    //5. use color choosed in step 3 and add it to array in step 4

    userClickedPattern=[]

    var a = Math.floor(Math.random() * 4 + 1);//generate 1 to 4 random number

    var index = a - 1;//zero to three

    var buttonColor = ["red", "blue", "green", "yellow"]

    var randomColor = buttonColor[index];

    gamePattern.push(randomColor);

    console.log(gamePattern);


    //1. select button with same id as randomColor
    //2. animate a flash on selected button
    //3. playing sound at step 2 also

    $("#" + randomColor).fadeOut(70).fadeIn(70).fadeOut(70).fadeIn(70);
    //var buttonSounds = ["sounds/red.mp3", "sounds/blue.mp3", "sounds/green.mp3", "sounds/yellow.mp3"];
    //var audio = new Audio(buttonSounds[index]);
    //audio.play();

    playSound(randomColor);

    //
    level++;
    $("h1").html("Level "+level);
}

//1. user jQuery detect any of buttons are clicked and trigger handle function
//2. inside handler function, create new variable called "userChosenColour" to store id of button clicked
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
//4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    //
    checkAnswer(userClickedPattern.length);
})

//1. Create a new function called playSound() that takes a single input parameter called name.
//2. Take the code we used to play sound in the nextSequence() function and move it to playSound().
//3. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.

function playSound(name) {
    //var buttonSounds = ["sounds/red.mp3", "sounds/blue.mp3", "sounds/green.mp3", "sounds/yellow.mp3"];
    //var audio = new Audio(buttonSounds[index]);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
//2. Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey.
//3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
//4. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//2. Create a new variable called level and start at level 0.
//3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
//5. Inside nextSequence(), update the h1 with this change in the value of level.

var level = 0;

$(document).keypress(function(event){
    console.log(event.key);
    $("h1").html("Level "+level);
    if(level==0)nextSequence();
});

/*
1. Create a new function called checkAnswer(), it should take one input with the name currentLevel

2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3.

3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

You can now use these log statements along with logging the values of userClickedPattern and gamePattern in the Chrome Developer Tools console to check whether if your code is performing as you would expect and debug your code as needed. Once you're done, feel free to remove these log statements.

4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

5. Call nextSequence() after a 1000 millisecond delay.

6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level. */

var ans = true;
function checkAnswer(answerLength){
    for(var i=0;i<answerLength;i++){
        if(userClickedPattern[i]!=gamePattern[i]){
            ans=false;
            break;
        }
    }
    if(ans&&answerLength==gamePattern.length){
        console.log("success");
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    else if(!ans) {
        var a = new Audio("sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        console.log("wrong")
        restart();
    }
}

/*1. Create a new function called startOver().

2. Call startOver() if the user gets the sequence wrong.

3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.*/

function restart(){
    level=0;
    gamePattern=[];
    ans=true;
}