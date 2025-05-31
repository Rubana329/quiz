const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

// Example questions
const questions = [
  {
    type: 'single',
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false }
    ]
  },
  {
    type: 'single',
    question: "Which of the following are programming languages? (Multi-select)",
    answers: [
      { text: "Python", correct: true },
      { text: "Banana", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Carrot", correct: false }
    ],
    multiSelect: true
  },
  {
    type: 'fill',
    question: "Fill in the blank: The largest planet in our solar system is __.",
    correctAnswer: "Jupiter"
  }
];

function showQuestion() {
  const questionData = questions[currentQuestionIndex];
  quizContainer.innerHTML = '';

  const questionElement = document.createElement('div');
  questionElement.classList.add('question');
  questionElement.textContent = questionData.question;
  quizContainer.appendChild(questionElement);

  if (questionData.type === 'single') {
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');

    questionData.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.addEventListener('click', () => selectAnswer(answer.correct));
      answersContainer.appendChild(button);
    });
    quizContainer.appendChild(answersContainer);
  }

  if (questionData.multiSelect) {
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');

    questionData.answers.forEach(answer => {
      const label = document.createElement('label');
      label.style.display = 'block';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = answer.correct;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(answer.text));
      answersContainer.appendChild(label);
    });
    quizContainer.appendChild(answersContainer);
  }

  if (questionData.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Your answer...';
    input.id = 'fill-input';
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginTop = '10px';
    quizContainer.appendChild(input);
  }
}

function selectAnswer(correct) {
  if (correct) {
    score++;
  }
  nextQuestion();
}

function checkMultiSelect() {
  const checkboxes = quizContainer.querySelectorAll('input[type="checkbox"]');
  let correct = true;
  checkboxes.forEach(cb => {
    if (cb.checked.toString() !== cb.value) {
      correct = false;
    }
  });
  if (correct) score++;
  nextQuestion();
}

function checkFillAnswer() {
  const input = document.getElementById('fill-input');
  const answer = input.value.trim();
  if (answer.toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizContainer.innerHTML = '';
  scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
  nextBtn.style.display = 'none';
}

nextBtn.addEventListener('click', () => {
  const questionData = questions[currentQuestionIndex];
  if (questionData.multiSelect) {
    checkMultiSelect();
  } else if (questionData.type === 'fill') {
    checkFillAnswer();
  }
});

showQuestion();
