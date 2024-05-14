const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual palavra está correta?",
    answers: [
      { text: "Impecilho", correct: false },
      { text: "Empecilho", correct: true },
      { text: "Impecilio", correct: false },
      { text: "Empecilio", correct: false }
    ]
  },
  {
    question: "Qual palavra está correta?",
    answers: [
      { text: "Consequência", correct: true },
      { text: "Conssequência", correct: false },
      { text: "Consequencia", correct: false },
      { text: "Consequênssia", correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?"',
    answers: [
      { text: 'Absorção', correct: true },
      { text: 'Absorssão', correct: false },
      { text: 'Abssorção', correct: false },
      { text: "Abssorssão", correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: "Adimissão", correct: false },
      { text: "Admição", correct: false },
      { text: "Adimissão", correct: false },
      { text: "Admissão", correct: true }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Incosciente', correct: false },
      { text: 'Inconsciente', correct: true },
      { text: 'Inconssiente', correct: false },
      { text: 'Iconsciente', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Descendente', correct: true },
      { text: 'Dessendente', correct: false },
      { text: 'Decendente', correct: false },
      { text: 'Descendete', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Acessoria', correct: false },
      { text: 'Asseçoria', correct: false },
      { text: 'Ascessoria', correct: false },
      { text: 'Assessoria', correct: true },
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Esseção', correct: false },
      { text: 'Exceção', correct: true },
      { text: 'Eceção', correct: false },
      { text: 'Exsseção', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Abssorver', correct: false },
      { text: 'Absorver', correct: true },
      { text: 'Abisorver', correct: false },
      { text: 'Abissorver', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Sobressair', correct: true },
      { text: 'Sobresair', correct: false },
      { text: 'Sobre-sair', correct: false },
      { text: 'Sobreessair', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Acesível', correct: false },
      { text: 'Assecível', correct: false },
      { text: 'Acessível', correct: true },
      { text: 'Assesível', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Chafariz', correct: true },
      { text: 'Xafariz', correct: false },
      { text: 'Chafaris', correct: false },
      { text: 'Xafaris', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Chilogravura', correct: false },
      { text: 'Xilografura', correct: false },
      { text: 'Xilogravura', correct: true },
      { text: 'Chilografura', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Essepcional', correct: false },
      { text: 'Excepcional', correct: true },
      { text: 'Exsepcional', correct: false },
      { text: 'Excepssional', correct: false }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Xumbo', correct: false },
      { text: 'Chumbo', correct: true }
    ]
  },
  {
    question: 'Qual palavra está correta?',
    answers: [
      { text: 'Xerife', correct: true },
      { text: 'Cherife', correct: false }
    ]
  },
]