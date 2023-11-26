document.addEventListener("DOMContentLoaded", function () {
    
    const quizQuestions = [
      {
        question: "Commonly used data types DO Not Include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
      },

      {
        question: "The condition in an if/else statement is enclosed with __________",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "3. parenthesis"
      },

      {
        question: "Arrays in JavaScript can be used to store ________.",
        choices: ["1. numbers adn strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
      },

      {
        question: "String values must be enclosed within ___________ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "3. quotes"
      },

      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4. console.log"
      },

    ];

  
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 75;
    let userScore = 0; // Added to keep track of the user's score
  
    const startContainer = document.getElementById("start-container");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const choicesContainer = document.getElementById("choices-container");
    const feedbackContainer = document.getElementById("feedback-container");
  
    function displayFeedback(message) {
      feedbackContainer.textContent = message;
    }
  
    document.getElementById("start-btn").addEventListener("click", startQuiz);
  
    function startQuiz() {
      startContainer.style.display = "none";
      quizContainer.classList.remove("hidden");
      displayNextQuestion();
      startTimer();
      updateTimer();
    }
  
    function displayNextQuestion() {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      questionContainer.textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";
  
      currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        choicesContainer.appendChild(button);
      });
    }
  
    choicesContainer.addEventListener("click", checkAnswer);
  
    function checkAnswer(event) {
      const clickedButton = event.target;
  
      if (clickedButton.tagName === "BUTTON") {
        const selectedAnswer = clickedButton.textContent;
        const currentQuestion = quizQuestions[currentQuestionIndex];
  
        if (selectedAnswer === currentQuestion.correctAnswer) {
          displayFeedback("Correct!");
          userScore += 1; // Adjust the score based on your scoring system
        } else {
          displayFeedback("Incorrect!");
          timeLeft -= 15;
          if (timeLeft < 0) {
            timeLeft = 0;
          }
          updateTimer();
        }
  
        currentQuestionIndex++;
  
        if (currentQuestionIndex < quizQuestions.length) {
          displayNextQuestion();
        } else {
          endQuiz(userScore); // Pass the userScore to endQuiz
        }
      }
    }
  
    function startTimer() {
      timer = setInterval(function () {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          endQuiz(userScore); // Pass the userScore to endQuiz
        }
      }, 1000);
    }
  
    function updateTimer() {
      document.getElementById("timer-container").textContent = "Time: " + timeLeft + "s";
    }
  
    function endQuiz(userScore) {
      clearInterval(timer);
      userScore = timeLeft;
      window.location.href = `./score.html?score=${userScore}`;
    }
  });