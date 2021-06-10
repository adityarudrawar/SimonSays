buttonColours = ["red", "green", "blue", "yellow"]
choosenColours = [];
gameColours = [];

started = false;
level = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        started = true;    
    }
});

$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    choosenColours.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(choosenColours.length - 1);
});

function checkAnswer(indexNo){
    if(gameColours[indexNo] === choosenColours[indexNo]){
        if (gameColours.length === choosenColours.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        $("#level-title").text("GAME OVER, PRESS ANY KEY TO START AGAIN!!")
        $("document").addClass("game-over");
        setTimeout(function(){
            $("document").removeClass("game-over");
        },100);
        startOver();
    }
}

function startOver(){
    level = 0;
    gameColours = [];
    started = false;
}

function nextSequence(){
    choosenColours = [];
    level++;
    $("#level-title").text("LEVEL " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];

    gameColours.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    animatePress(randomChoosenColour);
}

function animatePress(colour){
    $("#" + colour).addClass("pressed");
    setTimeout(function(){
        $("#" + colour).removeClass("pressed");   
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
