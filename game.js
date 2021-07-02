const question = document.querySelector('#question');
const choices = Array.from (document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Siapakah warga negara?',
        choice1:'Orang bangsa Indonesia asli dan bangsa lain yg disahkan',
        choice2:'Orang pedalaman',
        choice3:'Tidak tahu',
        choice4:'Orang kaya',
        answer: 1,
    },
    {
        question: 'Salah satu kegunaan uang pajak adalah?',
        choice1:'Untuk di korupsi',
        choice2:'Untuk Judi',
        choice3:'Untuk program Vaksinasi',
        choice4:'Untuk nonton bioskop',
        answer: 3,
    },
    {
        question: 'Contoh bela negara!',
        choice1:'Nongkrong',
        choice2:'Tekun belajar',
        choice3:'Main petasan',
        choice4:'Tiduran di rumah',
        answer: 2,
    },
    {
        question: 'Siapa yang harus mempertahankan ketahanan nasional bangsa?',
        choice1:'Teman saja',
        choice2:'Pegawai negri',
        choice3:'Keluarga',
        choice4:'Seiap Warga Negara',
        answer: 4,
    },
    {
        question: 'Apakah membayar pajak termasuk bela negara?',
        choice1:'Tidak tahu',
        choice2:'Ya',
        choice3:'Mungkin',
        choice4:'Tidak',
        answer: 2,
    },
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('end.html')

    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}


startGame()

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if(!isChrome){
    $('#iframeAudio').remove()
}
else{
    $('#playAudio').remove() //agar tdk 2x audio
}







