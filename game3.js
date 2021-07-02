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
        question: 'Pajak adalah iuran yang?',
        choice1:'Tidak perlu',
        choice2:'Menyusahkan',
        choice3:'Wajib',
        choice4:'Tidak tahu',
        answer: 3,
    },
    {
        question: 'Pajak itu jenisnya apa aja ya?',
        choice1:'Tidak tahu',
        choice2:'Pajak daerah saja',
        choice3:'Pajak pusat dan pajak daerah',
        choice4:'Pajak pusat saja',
        answer: 3,
    },
    {
        question: 'Indonesia maju karena?',
        choice1:'Pajak yang kuat',
        choice2:'Rumah yang kuat',
        choice3:'Kursi yang kuat',
        choice4:'Kasur yang kuat',
        answer: 1,
    },
    {
        question: 'Batas waktu penyampaian spt tahunan wajib pajak Orang Pribadi adalah?',
        choice1:'30 April',
        choice2:'28 Oktober',
        choice3:'17 Agustus',
        choice4:'31 Maret',
        answer: 4,
    },
    {
        question: 'Batas waktu penyampaian spt tahunan wajib pajak Badan adalah?',
        choice1:'14 Juli',
        choice2:'30 April',
        choice3:'31 Maret',
        choice4:'17 Agustus',
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
        
        return window.location.assign('end3.html')

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