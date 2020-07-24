let listHighScores = document.getElementById("listHighScores");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

listHighScores.innerHTML = highScores.map(score => {
    return `<li class="highscores">${score.name} - ${score.score}</li>`;
  }).join("");