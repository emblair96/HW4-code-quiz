// General element varaibles
var startPage = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");
var quizDiv = document.querySelector("#quiz");
var currentQuestion = document.querySelector("#current-question");
var answerGrid = document.querySelector("#answer-grid");
var inputSection = document.querySelector(".input-page");
var timeEl = document.querySelector(".seconds-left");
var userInput = document.querySelector("#user-input");
var highscoresSection = document.querySelector(".highscores");
var initialsColumn = document.querySelector(".initials-column");
var scoreColumn = document.querySelector(".score-column");

// Button variables
var optionButtons = document.querySelector(".option-btn");
var submitButton = document.querySelector(".submit-button");
var restartBtn = document.querySelector(".restart");
var clearBtn = document.querySelector(".clear");
var highscoresHyperlink = document.querySelector(".highscores-hyperlink");

// Starting points for timer & question index to be able to display appropriate question on the page
var currentQuestionIndex = 0;
var secondsLeft = 75;

// Event listeners for various buttons
startBtn.addEventListener("click", startQuiz);
optionButtons.addEventListener("click", updateQuestion);
optionButtons.addEventListener("click", checkAnswer);

// Arrays which will be used to store data to local storage
var initialsArray = [];
var scoreArray = [];

// Start the quiz (i.e. hide/show correct divs, start timer, etc.)
function startQuiz () {
    startPage.classList.add("hide");
    quizDiv.classList.remove("hide");
    currentQuestionIndex = -1;
    quizDiv.setAttribute("data-display", true);
    secondsLeft = 75;
    updateQuestion();
    setTime();
};

// After we start the quiz, we run the updateQuestion() function, this removes any children currently in the quizGrid, and adds new question 
function updateQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

};

// Needed to hide/show correct content when navigating to initials input page
function navigateToInput() {
    quizDiv.classList.add("hide");
    inputSection.classList.remove("hide");
};

// Needed to hide/show correct content when navigating to highscores page
function navigateToHighScore() {
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    displayHighScores();
};

// Append user initials and final time left on timer to highscores page
function displayHighScores() {
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";

    for(var i=0; i<initialsArray.length; i++) {
        var initialsP = document.createElement("p");
        initialsP.textContent = initialsArray[i];
        initialsColumn.append(initialsP);

        var scoreP = document.createElement("p");
        scoreP.textContent = scoreArray[i];
        scoreColumn.append(scoreP);
      };
};

// We pass in the current index of questions, then we set the text content of the currentQuestion to the currentindex.question in the questions object, then we create a button element and set the text of that button to the answers located at the current index of the questions object, add an event listener to the buttons in the quizGrid that checks the answer
function showQuestion(question) {
    if (currentQuestionIndex < questions.length) {
        currentQuestion.textContent = question.question
        question.answers.forEach(answer => {
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.value = answer.response;
            button.classList.add("btn", "btn-secondary", "btn-md", "m-1", "text-left");
            button.addEventListener("click", checkAnswer);
            answerGrid.appendChild(button);
        
    })

    }
    else {
        navigateToInput();
    }

};

// Check to see if answers are correct or not by checking value of response from the Q&A object & change to the next question 
function checkAnswer(event) {
    var element = event.target
    
    if (element.matches("button") === true && Number(element.value) === 1) {
        displayCorrect()
        
    }
    else if (element.matches("button") === true && Number(element.value) === 0) {
        displayIncorrect()
        secondsLeft = secondsLeft - 10

    }
    updateQuestion()
};

// Correct alert
function displayCorrect() {
    var correctAlert = document.querySelector(".correct-alert");
    setTimeout(function(){ 
        correctAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        correctAlert.classList.add("hide")
    }, 1000)

};

// Incorrect alert
function displayIncorrect() {
    var incorrectAlert = document.querySelector(".incorrect-alert");
    setTimeout(function(){ 
        incorrectAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        incorrectAlert.classList.add("hide")
    }, 1000)
};

// If there is an answer button element inside of the answer grid, remove it; basically loop through until there are no more firstChild elements
function resetState() {
    while (answerGrid.firstChild) {
        answerGrid.removeChild(answerGrid.firstChild);
    }
    currentQuestionIndex++;
};

// Timer in upper right-hand corner
function setTime() {
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secondsLeft--;
        
        // Conditions to make the function no longer run
        if(secondsLeft === 0 || currentQuestionIndex > (questions.length - 1) || highscoresSection.getAttribute("data-display") === "true") {
          // Have to set timer to a name so we know which timer to delete
          clearInterval(timerInterval);
        }
    
      }, 1000);
};

// Get stored initials/scores from localStorage
function init() {
    // Parsing the JSON string to an object
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("score"));
  
    // If initials/scores were retrieved from localStorage, update the todos array to it
    if (storedInitials !== null || storedScores !==null) {
      initialsArray = storedInitials;
      scoreArray = storedScores;
    }
  
    // Render highscores to the DOM
    displayHighScores();
};

// Set item in local storage
function storeScores() {
    localStorage.setItem("initials", JSON.stringify(initialsArray));
    localStorage.setItem("score", JSON.stringify(scoreArray));
};

// Store score and intiials to local storage when click submit
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var userInitials = userInput.value.trim();
    var userScore = secondsLeft

    initialsArray.push(userInitials);
    scoreArray.push(userScore);

    userInput.value = "";

    storeScores();
    navigateToHighScore();
     
});

// Button for user to return to start of quiz from highscores page
restartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startPage.classList.remove("hide");
    highscoresSection.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.setAttribute("data-display", "false");
});

// Button for user to clear highscores from local storage
clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    inputSection.classList.add("hide");
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";
    initialsArray = [];
    scoreArray = [];
});

// Link for user to navigate directly to highscores page
highscoresHyperlink.addEventListener("click", function(event) {
    quizDiv.classList.add("hide");
    startPage.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    highscoresSection.setAttribute("data-display", "true");
    var timerInterval = setInterval(function() {
        
          clearInterval(timerInterval);

    
      }, 1000);
    //timeEl.textContent = "";
});

init();

// Q&A object for quiz content
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
        {text: "1. strings", response: 0},
        {text: "2. booleans", response: 0},
        {text: "3. alerts", response: 1},
        {text: "4. numbers", response: 0}
        ]

    },
    {
        question: "Which of the following string methods will remove extra white space?",
        answers: [
        {text: "1. .concat()", response: 0},
        {text: "2. .trim()", response: 1},
        {text: "3. .splice()", response: 0},
        {text: "4. .split()", response: 0}
        ]

    },
    {
        question: "Which of the following is NOT way to define a variable in JavaScript?",
        answers: [
        {text: "1. assign", response: 1},
        {text: "2. var", response: 0},
        {text: "3. const", response: 0},
        {text: "4. let", response: 0}
        ]

    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
        {text: "1. <javascript>", response: 0},
        {text: "2. <scripted>", response: 0},
        {text: "3. <script>", response: 1},
        {text: "4. <js>", response: 0}
        ]

    }
];