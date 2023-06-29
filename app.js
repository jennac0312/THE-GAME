// screens
const homePage = document.querySelector('.landingScreen')
const directionsPage = document.querySelector('.directionsScreen')
const modePage = document.querySelector('.modeScreen')
const gamePage = document.querySelector('.gameBoard')

// home page variables
const gameTitle = document.querySelector('.title')
const hpParagraph = document.querySelector('.landingScreen p')
const hpBContainer = document.querySelector('.homeButtons')
const buttons = document.querySelectorAll('button')

// game page variables
const gpMode = document.querySelector('.mode')
// timer
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
// questionBox variables
const gpColor = document.querySelector('.gameColor')
const gpChoices = document.querySelectorAll('.choice')




// object to track screen location
const GAME_STATS = {
    start : false,
    timer : {}
}


// toggle screens for buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(!GAME_STATS.start){
          hideAllScreensExcept(gamePage)
        }

        if(GAME_STATS.start){
            //what to do when game is going
        }

        if(button.classList.value.includes('start')){
            console.log('start button clicked')
            // show mode screen
            modePage.classList.remove('hidden')
        }

        if(button.classList.contains('directions')){
            console.log(`directions clicked`)
            // show directions
            directionsPage.classList.remove('hidden')
        }

        if(button.classList.contains('easy')){
            button.setAttribute('background-color', 'black')
            // set game stats
            setGameStats('easy')
            // show game
            gamePage.classList.remove('hidden')
        }
        if(button.classList.contains('hard')){
            button.style.backgroundColor = 'rgb(168, 134, 74);'
            // set game stats
            setGameStats('hard')
            // show game
            gamePage.classList.remove('hidden')
        }
    })
})


// 10 seconds after page load... make title flash again
setTimeout(() => {
    gameTitle.setAttribute('style', 'animation: flashing 1s infinite;')
}, 10000)
// 12 second delay... show buttons
setTimeout(() => {
    hpBContainer.classList.remove('hidden')
}, 12000)
// 13 second delay... show hpParagraph
setTimeout(() => {
    hpParagraph.style.color = `moccasin`
    // hpParagraph.setAttribute('style', 'animation: flashing 2s forwards')
}, 13500)


// get game stats
const setGameStats = (mode) => {
    GAME_STATS.mode = mode
    GAME_STATS.start = true
    GAME_STATS.timer = startTimer()
    console.log(GAME_STATS)

    setMode()
}

// set mode on game screen
const setMode = () => {
    gpMode.innerHTML = GAME_STATS.mode
}

// hide all screens
const hideAllScreens = () => {
      homePage.classList.add('hidden')
      modePage.classList.add('hidden')
      gamePage.classList.add('hidden')
      directionsPage.classList.add('hidden')
}

// hide all screens except
const hideAllScreensExcept = (except) => {
    hideAllScreens()
    if(except) except.classList.remove('hidden')
}


// timer ... needs work 
const startTimer = () => {
    // startMinutes()
    // startSeconds()
    // mins = setInterval(startMinutes(), 10000);
    // seconds.innerHTML = startSeconds()
    let mins = 0
    return {mins: mins, seconds: 0}
}

const startMinutes = () => {
    mins++
    return mins
}

// const startSeconds = () => {
//     let secs = 0o0
//     setInterval(() => {
//         secs++
//     }, 1000)

//     return secs
// }




const colors = ['red', 'orange', 'yellow', 'green', 'purple', 'pink', 'blue', 'grey', 'brown', 'white']

let combinations = []
let questions = []

const createColorCombos = (howManyTimes) => {

    for(let i = 1; i <= howManyTimes; i++){
        colors.forEach((color) => {
            let combo = {}
            combo.name = color
            combo.style =  colors[getRandomIntInclusive(0, colors.length - 1)]
            combinations.push(combo)
        })
    }

    console.log(combinations)
}
createColorCombos(1)


// random inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// create questions
const createQuestions = () => {

    combinations.forEach((combo) => {
        let question = {
            colors: []
        }
        question.gameColor = combo.name,
        question.style = combo.style,
        question.colors.push(combo.style)
        question.colors.push(combo.name)

        // adding 2 random colors  .... have to make sure colors dont match
        question.colors.push(colors[getRandomIntInclusive(0, colors.length - 1)])
        question.colors.push(colors[getRandomIntInclusive(0, colors.length - 1)])

        questions.push(question)
    })

    console.log(questions)
}
createQuestions()