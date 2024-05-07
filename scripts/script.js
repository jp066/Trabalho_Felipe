var score = 0;
var questionIndex = 0;
var correctAnswers = ['a', 'b'];

function nextQuestion(answer) {
    if (answer === correctAnswers[questionIndex]) {
        score++;
    }
    var questions = document.getElementsByClassName('question');
    questions[questionIndex].classList.remove('active');
    questionIndex++;
    if (questionIndex < questions.length) {
        questions[questionIndex].classList.add('active');
    } else {
        alert('Você acertou ' + score + ' de ' + questions.length + ' perguntas!');
    }
}