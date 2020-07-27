let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName('choice-text'));
let currentQuestion;
let score = 0;
let questionCount = 0;
let correctAnswers = 10;
let maxQuestions = 5;
let progressBarText = document.getElementById("progressBarText");
let scoreDisplay = document.getElementById("score"); 
let progressBarFilled = document.getElementById("progressBarFilled");
let loader = document.getElementById('loader');
let quiz = document.getElementById('quiz');

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startQuiz();
    })

function startQuiz() 
{
    questionCount = 0;
    score = 0;
    getNewQuestion();
    quiz.classList.remove('hidden');
    loader.classList.add('hidden');
}

function getNewQuestion()
{
    if (questionCount >= maxQuestions) 
    {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('endQuiz.html');
    }
    questionCount++;
    progressBarText.innerText = `Question ${questionCount} / ${maxQuestions}`;
    progressBarFilled.style.width = `${(questionCount / maxQuestions) * 100}%`;
    let questionIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(newQuestion);
    questions.splice(questionIndex, 1);
}

function newQuestion(choice) 
{
    let number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
}

choices.forEach(Answer);

function Answer(choice) 
{
    choice.addEventListener('click', correctAnswer);
}

function correctAnswer(event) 
{
    let selectedChoice = event.target;
    let selectedAnswer = selectedChoice.dataset['number'];
    let classToApply = 'incorrect';
    if (selectedAnswer == currentQuestion.answer)
    {
        classToApply = 'correct';
    }
    if (classToApply == "correct") 
    {
        addScore(correctAnswers);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(display, 1000);
    
    function display()
    {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
    }
}

function addScore(num) 
{
    score += num;
    scoreDisplay.innerText = score;
}