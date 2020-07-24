let username = document.getElementById('username');
let saveScoreButton = document.getElementById('saveScoreButton');
let finalScore = document.getElementById('finalScore');
let mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let maxHighScores = 5;

username.addEventListener('keyup', saveScore);

function saveScore()
{
    saveScoreButton.disabled = !username.value;
}

function saveHighScore(event)
{
    event.preventDefault();
    let highScore = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/index.html');
}