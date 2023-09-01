var startButton = document.querySelector("#start");
var asking = document.querySelector("#count");
var questionLine = document.querySelector("#question");
var scoreboardDiv = document.querySelector('#scores');
var isAnswerRight = document.querySelector("#response");
var highScoreBoard = document.querySelector("#highscore");
var scoreDisplay = document.querySelector("#scoreDisplay");
var cornerTimer = document.querySelector("#timer");
var cornerScore = document.querySelector("#scoring");
var optionsDiv = document.querySelector('.options');
var textBar = document.querySelector('#textbox');
var submitButton = document.querySelector('#button');
var startingSeconds = 3;
var incri = 1;
var score = 0;
var timeLeft = 30;
var scoreArray = [];
var option1 = document.querySelector(".one");
var option2 = document.querySelector(".two");
var option3 = document.querySelector(".three");
var option4 = document.querySelector(".four");
var q1Array = ["", "HTML, Python, CSS", "CSS, JavaScript, HTML", "Lua, JavaScript, CSS", "Python, C#, C++"];
var q2Array = ["", "while/loop/loop", "for/while/loop", "for/loop/loop", "for/loop/iteration"];
var q3Array = ["", "Brendan Eich", "Elon Musk", "Mitchell Baker", "Nolan Bushnell"];
var q4Array = ["", "data-state: hidden", "opacity: 0", "object = hidden", "None of the above"];
var q5Array = ["", "isKeyPressed()", "buttonInput()", "checkKeyDown()", "addEventListener()"];

/*
var keys = isKeyPressed();

function isKeyPressed() {
    addEventListener("keydown", function(event) {
        var keyType = event.key;
        console.log(keyType);
        return keyType;
    });
}
*/

function createScore() {
    optionsDiv.setAttribute('style', 'display: none;');
    asking.textContent = '';
    questionLine.textContent = 'Enter your initials';
    scoreboardDiv.setAttribute("style", "display: flex; justify-content: center;");

    submitButton.addEventListener('click', function(event) {
        console.log(true);

        if(textBar.value === null) {
            alert("Put in an actual name and try again.");
            return;
        }

        var scoreObject = {
            initials: textBar.value,
            time: timeLeft,
            score: score
        }

        localStorage.setItem('scoreSets', JSON.stringify(scoreObject));
        
        var scoreValues = JSON.parse(localStorage.getItem('scoreSets'));
        highScoreBoard.setAttribute("style", "display: flex;");
        scoreDisplay.textContent = scoreValues.initials + ": " + scoreValues.time + "T, " + scoreValues.score + "S";

        // After everything with this, I'm perfectly fine with having points deducted for half-assing this.
    });
}

function hideScore() {
    
}

function questionTimer() {
    var timerSetting = setInterval(function() {
        timeLeft--;
        cornerTimer.textContent = "Time left: " + timeLeft;

        if (incri >= 6) {
            clearInterval(timerSetting);
            createScore();
        } else if (timeLeft <= 0) {
            location.reload();
        }
    }, 1000);
}

function timerFunction() {
    var timerInterval = setInterval(function() {
        startingSeconds--;
        asking.textContent = "Starting in " + startingSeconds + " seconds.";

        if (startingSeconds === 0){
            clearInterval(timerInterval);
            nextQuestion();
            startQuiz();

            questionTimer();
            cornerTimer.textContent = "Time left: " + timeLeft;
        }
    }, 1000);
}

function inertia(opt) {
    //console.log(opt);
    //debugger;
    if ((incri == 1 && opt == 2) || (incri == 2 && opt == 3) || (incri == 3 && opt == 1) || (incri == 4 && opt == 4) || (incri == 5 && opt == 4)){
        score++;
        isAnswerRight.textContent = "Correct";
    } else {
        isAnswerRight.textContent = "Incorrect";
    }
    incri++;
    //startQuiz();
    //console.log(incri);
    nextQuestion();
}

// Questions:
// 1: What are the primary languages in coding?
// 1st Options: (HTML, Python, CSS), (CSS, JavaScript, HTML), (Lua, JavaScript, CSS), (Python, C#, C++). Answer: 2

// 2: A ___ ____ iterates lines of code multipute times until the ____ stops.
// 2nd Options: (while, loop, loop), (for, while, loop), (for, loop, loop), (for, loop, iteration). Answer: 3

// 3: Who first made JavaScript?
// 3rd Options: (Brendan Eich), (Elon Musk), (Mitchell Baker), (Nolan Bushnell). Answer: 1

// 4: How can an object be turned insivible?
// 4th Options: (data-state: hidden), (set-visiblity: 0), (object = hidden), (None of the above). Answer: 4

// 5: The ________________ checks for button inputs to activate lines of code.
// 5th Options: (isKeyPressed), (buttonInput), (checkKeyDown), (addEventListener). Answer: 4

function startQuiz() {

    option1.addEventListener("click", function(event) {
        inertia(1);
    });
    option2.addEventListener("click", function(event) {
        inertia(2);
    });
    option3.addEventListener("click", function(event) {
        inertia(3);
    });
    option4.addEventListener("click", function(event) {
        inertia(4);
    });

}

function nextQuestion() {
    cornerScore.textContent = "Score: " + score;
    

    if (incri == 1) {
        asking.textContent = "Question 1:";
        questionLine.textContent = "What are the primary languages in coding?";
        option1.textContent = q1Array[1];
        option2.textContent = q1Array[2];
        option3.textContent = q1Array[3];
        option4.textContent = q1Array[4];
    } else if (incri == 2) {
        asking.textContent = "Question 2:";
        questionLine.textContent = "A ___ ____ iterates lines of code multiple times until the ____ stops."
        option1.textContent = q2Array[1];
        option2.textContent = q2Array[2];
        option3.textContent = q2Array[3];
        option4.textContent = q2Array[4];
    } else if (incri == 3) {
        asking.textContent = "Question 3:";
        questionLine.textContent = "Who first made JavaScript?"
        option1.textContent = q3Array[1];
        option2.textContent = q3Array[2];
        option3.textContent = q3Array[3];
        option4.textContent = q3Array[4];
    } else if (incri == 4) {
        asking.textContent = "Question 4:";
        questionLine.textContent = "How can an object be turned insivible?"
        option1.textContent = q4Array[1];
        option2.textContent = q4Array[2];
        option3.textContent = q4Array[3];
        option4.textContent = q4Array[4];
    } else if (incri == 5) {
        asking.textContent = "Question 5:";
        questionLine.textContent = "The ________________ checks for button inputs to activate lines of code."
        option1.textContent = q5Array[1];
        option2.textContent = q5Array[2];
        option3.textContent = q5Array[3];
        option4.textContent = q5Array[4];
    }
}

var scoreValues = JSON.parse(localStorage.getItem('scoreSets'));
highScoreBoard.setAttribute("style", "display: flex;");
scoreDisplay.textContent = scoreValues.initials + ": " + scoreValues.time + "T, " + scoreValues.score + "S";

startButton.addEventListener("click", function(event) {
    startButton.setAttribute("style", "display:none;");
    timerFunction();
    asking.textContent = "Starting in " + startingSeconds + " seconds.";
    highScoreBoard.setAttribute("style", "display: none;");
    //startQuiz();
});