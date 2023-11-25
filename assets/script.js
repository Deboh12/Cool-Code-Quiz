document.addEventListener("DOMContentLoaded", function () {
    
    const quizQuestions = [
      {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyperlinks and Text Markup Language"
      },
      //more questions
    ];
  
   
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 60; 
  
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
          } else {
            displayFeedback("Incorrect!");
          }
      
          currentQuestionIndex++;
      
          if (currentQuestionIndex < quizQuestions.length) {
            displayNextQuestion();
          } else {
            endQuiz();
          }
        }
      }
  
    function startTimer() {
      timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
          endQuiz();
        }
      }, 1000);
    }
  
    function endQuiz() {
      clearInterval(timer);
    }
  });