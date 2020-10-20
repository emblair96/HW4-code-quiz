var startPage = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");
var quizDiv = document.querySelector("#quiz");
var currentQuestion = document.querySelector("#current-question");
var answerGrid = document.querySelector("#answer-grid");
var optionButtons = document.querySelector(".option-btn")

let currentQuestionIndex;

startBtn.addEventListener("click", startQuiz);


var option0 = document.querySelector("#option0")
var textOption0 = option0.textContent
console.log(textOption0)
var option1 = document.querySelector("#option1")
var textOption1 = option1.textContent
console.log(textOption1)
var option2 = document.querySelector("#option2")
var textOption2 = option2.innerHTML
console.log(textOption2)
var option3 = document.querySelector("#option3")
var textOption3 = option3.textContent
console.log(textOption3)




function startQuiz () {
    startPage.style.display = "none";
    quizDiv.classList.remove("hide");
    // option1.textContent = question1.option2;
    // currentQuestion.textContent = questions[0].question
    // optionButtons.textContent = questions[0].answers.innerText
    currentQuestionIndex = 0;
    updateQuestion()
}


function updateQuestion() {
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    currentQuestion.textContent = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn", "btn-secondary", "btn-md", "m-1", "text-left")
        button.addEventListener("click", selectAnswer)
        answerGrid.appendChild(button)
    })

}


function selectAnswer() {

}

// optionBtn.addEventListener("click", checkAnswer);


const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
        {text: "1. strings", correct: false},
        {text: "2. booleans", correct: false},
        {text: "3. alerts", correct: true},
        {text: "4. numbers", correct: false}
    ]

}
]
console.log(questions)









/*

var option0 = document.querySelector("#option0")
var textOption0 = option0.textContent
console.log(textOption0)
var option1 = document.querySelector("#option1")
var textOption1 = option1.textContent
console.log(textOption1)
var option2 = document.querySelector("#option2")
var textOption2 = option2.innerHTML
console.log(textOption2)
var option3 = document.querySelector("#option3")
var textOption3 = option3.textContent
console.log(textOption3)



var options = [textOption0, textOption1, textOption2, textOption3]
console.log(options)


function checkAnswer () {
    var element = event.target;

    if (element.matches("button") === true && element.textContent === textOption0) {
        alert("Correct")

    }
}

function updateQuestion (index) {
    var element = event.target;

    if (element.matches("button") === true) {
    
        for (var i=0; i<todos.length; i++) 



}

optionBtn.addEventListener("click", checkAnswer);

*/

// {
//     question1:"Commonly used data types DO NOT include:",
//     question2:"The condition in an if/else statement is enclosed within:",
//     question3:"Arrays in Javascript can be stored within:",
//     question4:"Strings values must be enclosed within _____ when being assigned to variables:",
//     question5:"A very useful tool used during web development and debugging for printing content to the debugger is:"
// };

// var question1 = {
//     option1:"1. strings",
//     option2:"2. booleans",
//     option3:"3. alerts",
//     option4:"4. numbers"
// }





/*
something about textContent of the button the user clicks on is equal to what is in the variable
User clicks on start quiz button
    - Add event listener to start button to begin pagination of some sort?
    - Pagination order is welcome page, questions, summary socre/input initials page, high scores page
Time begins to count down
    - Set interval needed here
    - Clear interval once user reaches certain point in pagination sequence
Time drops quicker if user answer incorrectly
    - TBD
User advances to the first question
    -Pagination is prompted by user selecting a response to the question
When the user clicks on their answer choice, they advance to the next question
User sees if they got the previous question correct or incorrect when advancing to the next question
    - Need some way to verify if their response matches the correct answer...?  An object of some sort?
    - Or would each of the questions have their own array and the correct answer would be equal to a certain index in the array? 
After responding to the last question, user is met with a screen displaying their final score & an input field, *time stops counting down here
    - Clear interval is needed at this point; time needs to stop counting down
    - Need to add to local storage the final time & the user initials as key value pairs (Intials: EB, score: 100)
    - Once the user hits the submit button, they are met with a screen of the option to clear the high score or go back/return to the start
    - Clear high scores would cear the local storage
User enters their intiials in the input field
User's score & intials are then displayed on the screen showing "Highscores"

Other developer notes:
    - Will need to add a variable to select the time displayed on the page
    - Will need to add a variable to locate start button as well as other buttson?? 
    - An object to include the questions and correct answers?  
    - 
*/