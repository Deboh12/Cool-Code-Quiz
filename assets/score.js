document.addEventListener("DOMContentLoaded", function () {
    const scoreValue = document.getElementById("score-value");
    const initialsInput = document.getElementById("initials");
    const goBackBtn = document.getElementById("go-back-btn");
    const clearScoresBtn = document.getElementById("clear-scores-btn");
    const highScoresContainer = document.getElementById("high-scores-container");
  
    // Retrieve the user score from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userScore = urlParams.get("score") || 0;

    console.log("User Score", userScore); 

    displayFinalScore(userScore);
    displayHighScores();
  
    function displayFinalScore(score) {
      scoreValue.textContent = score;
    }
  
    function saveScore(initials, score) {
      // Retrieve existing high scores from local storage
      const existingScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
      // Add the new score to the array
      existingScores.push({ initials, score });
  
      // Sort the scores in descending order
      existingScores.sort((a, b) => b.score - a.score);
  
      // Store the updated scores in local storage
      localStorage.setItem("highScores", JSON.stringify(existingScores));
    }
  
    function displayHighScores() {
      // Retrieve high scores from local storage
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
      // Clear existing content in the high scores container
      highScoresContainer.innerHTML = "";
  
      // Display each high score in a card
      highScores.forEach((entry, index) => {
        const card = document.createElement("div");
        card.classList.add("score-card");
        card.innerHTML = `<span class="initials">${entry.initials}</span> ${entry.score}`;
        highScoresContainer.appendChild(card);
      });
    }
  
    // Event listener for "Enter" key in the initials input field
    initialsInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        saveScore(initialsInput.value, userScore);
        displayHighScores();
      }
    });
  
    // Event listener for "Go Back" button
    goBackBtn.addEventListener("click", function () {
      window.location.href = "./index.html"; // Replace with the actual path to your quiz page.
    });
  
    // Event listener for "Clear High Scores" button
    clearScoresBtn.addEventListener("click", function () {
      // Clear high scores in local storage
      localStorage.removeItem("highScores");
      displayHighScores(); // Refresh the displayed high scores
    });
  });