var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0;
$("h1").text = "Press A key to Start";

function nextSequence() {
    var randomNumber = Math.random();
    randomNumber = Math.floor((randomNumber * 4));
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour);
    console.log($("#" + randomChosenColour))
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level " + level);
}



$(".btn").click( function() {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    // Check answer
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(level) {
    console.log("leve " + level)
    if (gamePattern[level] === userClickedPattern[level]) {
        console.log("success");

        // wait for 1sec
        if (gamePattern.length === userClickedPattern.length) {
            // wait for 1 sec
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            clear();
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
       
    }
}


function playSound(name) {
    animatePress(name)
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 300);
}

$(document).keypress(function() {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
    
})
function clear() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

