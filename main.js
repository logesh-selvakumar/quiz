let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName('choice-text'));
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCount = 0;
let correctAnswers = 10;
let maxQuestions = 10;
let remainingQuestions = [];
let progressBarText = document.getElementById("progressBarText");
let scoreDisplay = document.getElementById("score"); 
let progressBarFilled = document.getElementById("progressBarFilled");
let loader = document.getElementById('loader');
let quiz = document.getElementById('quiz');

let questions = [];

fetch('https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple')
    .then((res) => 
    {
        return res.json();
    })
    .then((loadedQuestions) => 
    {
        questions = loadedQuestions.results.map((loadedQuestion) =>
        {
            let formattedQuestion = 
            {
                question: loadedQuestion.question,
            };

            let answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestion.correct_answer);
            answerChoices.forEach((choice, index) => 
            {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
            
        });
        quiz.classList.remove('hidden');
        loader.classList.add('hidden');
        startGame();
    })

function startGame() 
{
    questionCount = 0;
    score = 0;
    remainingQuestions = [...questions];
    getNewQuestion();

}

function getNewQuestion()
{
    if (remainingQuestions.length == 0 || questionCount >= maxQuestions) 
    {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/endQuiz.html');
    }
    questionCount++;
    progressBarText.innerText = `Question ${questionCount} / ${maxQuestions}`;
    progressBarFilled.style.width = `${(questionCount / maxQuestions) * 100}%`;
    let questionIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(newQuestion);
    remainingQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
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
    if (!acceptingAnswer)
    {
        return;
    }
    acceptingAnswer = false;
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