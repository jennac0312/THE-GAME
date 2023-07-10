// screens
const homePage = document.querySelector('.landingScreen')
const directionsPage = document.querySelector('.directionsScreen')
const modePage = document.querySelector('.modeScreen')
const gamePage = document.querySelector('.gameBoard')
const endScreenDefault = document.querySelector('.endScreenDefault')

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
const gpQuestionBox = document.querySelector('.questionBox')
const gpColor = document.querySelector('.gameColor')
const gpChoices = document.querySelectorAll('.choice')
const gpButtons = gpChoices
// questionBox classes to keep
const GP_COLOR_CLASS = `gameColor`
const GP_BUTTON_CLASSES = ["c1", "c2", "c3", "c4"]


// game over screen variables
const esAccuracy = document.querySelector('.accuracy') 
const esMode = document.querySelector('.esMode')
const esQuestions = document.querySelector('.questions')
const esCorrect = document.querySelector('.correct')
const esIncorrect = document.querySelector('.incorrect')
const congratsPerfectScore = document.querySelector('.congrats')
const loserScore = document.querySelector('.loser')
const placeholder = document.querySelector('.placeholder')
// game over rank section
const esRankContainer = document.querySelector('.rank')
const esFirst = document.querySelector('.first')
const esSecond = document.querySelector('.second')
const esThird = document.querySelector('.third')
// game over screen buttons
const esPlayButton = document.querySelector('.play')
const esClearHistoryButton = document.querySelector('.clearHistory')
const esSubmitButton = document.querySelector('.submit')

// arcade mode features
const scoreLine = document.querySelector('.scoreLine')
const arcadeLine = document.querySelector('.arcadeLine')
const arcadeRound = document.querySelector('.arcadeRound')

// easy vs hard mode directions
const easyDirections = document.querySelector('.easyModeDirections')
const hardDirections = document.querySelector('.hardModeDirections')
const easyDirButton = document.querySelector('.easyDir')
const hardDirButton = document.querySelector('.hardDir')

// secret quit button
const quitter = document.querySelector('.quitter')
const quitPage = document.querySelector('.quitterScreen')



quitter.addEventListener('click', () => {
    hideAllScreensExcept(quitPage)
    
    setTimeout(() => {
        location.reload()
    }, 5000)
})

// important lol dont delete. lesson learned
let numberOfQuestions = 20

// track game stats
const GAME_STATS = {
    username: 'PLAYER1',
    start : false,
    timer : {},
    correct: 0,
    incorrect: 0,
    answered: 0,
    accuracy: 0,
    totalQuestions: numberOfQuestions
}


// intro
console.log(`%cCOLOR BUSTER`, 'color: hotpink; font-size: 40px; font-weight: bold; margin-left: 50px')

// toggle screens for buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(!GAME_STATS.start){
          hideAllScreensExcept(gamePage)
        }

        if(GAME_STATS.start){
            //what to do when game is going
            congratsPerfectScore.classList.add('hidden')
            loserScore.classList.add('hidden')
            placeholder.classList.remove('hidden')
        }

        if(button.classList.value.includes('start')){
            console.log('start button clicked')
            // show mode screen
            hideAllScreensExcept(modePage)
        }

        if(button.classList.contains('directions')){
            console.log(`directions clicked`)
            // show directions
            hideAllScreensExcept(directionsPage)
        }

        if(button.classList.contains('easy')){
            button.setAttribute('background-color', 'black')
            // set game stats
            setGameStats('easy')
            // show game
            hideAllScreensExcept(gamePage)
            // start game
            startGame('easy')
        }
        if(button.classList.contains('hard')){
            button.style.backgroundColor = 'rgb(168, 134, 74);'
            // set game stats
            setGameStats('hard')
            // show game
            hideAllScreensExcept(gamePage)
            // show game stats
            // console.log('STATUS',GAME_STATS)
            // start game
            startGame('hard')
        }

        if(button.classList.contains('play')){
            console.log('play again button clicked')
            hideAllScreensExcept(homePage)

            // need to reset stats
            resetStats()
            resetGameVariables()
            resetHTML()
        }
        if(button.classList.contains('clearHistory')){
            localStorage.clear()
            clearRanks()
            clearVariables()
            hideAllScreensExcept(endScreenDefault)
            
    console.log(`%cEASY MODE LENGTH ${JSON.stringify(easyMode).length}`, 'color: lightblue')
    console.log(`%cHARD MODE LENGTH: ${JSON.stringify(hardMode).length}`, 'color: orange')
    console.log('HARDMODE',hardMode)
        }

        if(button.classList.contains('science')){
            hideAllScreensExcept(directionsPage)
        }

        // 2 new modes
        if(button.classList.contains('arcade')){
            console.log(`enter arcade mode`)

            setGameStats('arcade')
            hideAllScreensExcept(gamePage)
            startGame('arcade')
        }
        if(button.classList.contains('speed')){
            console.log('enter speed mode')

            setGameStats('speed')
            hideAllScreensExcept(gamePage)
            startGame('speed')
        }
    })
})


// switch directions
hardDirButton.addEventListener('click', () => {
    console.log('hard mode directions clicked')
    // hide easy show hard
    easyDirections.classList.add('hidden')
    hardDirections.classList.remove('hidden')

    // color easy to show its clicked
    easyDirButton.style.color = 'grey'
    hardDirButton.style.color = 'white'
})

easyDirButton.addEventListener('click', () => {
    // need to be white to begin with
    console.log('easy mode directions clicked')
    // hide hard show easy
    easyDirections.classList.remove('hidden')
    hardDirections.classList.add('hidden')

    // color easy to show its clicked
    easyDirButton.style.color = 'white'
    hardDirButton.style.color = 'grey'
})

// 10 seconds after page load... make title flash again
setTimeout(() => {
    gameTitle.setAttribute('style', 'animation: flashing 1s infinite;')
}, 3000)
// 12 second delay... show buttons
setTimeout(() => {
    hpBContainer.classList.remove('hidden')
}, 7000)
// 13 second delay... show hpParagraph
setTimeout(() => {
    hpParagraph.style.color = `moccasin`
    // hpParagraph.setAttribute('style', 'animation: flashing 2s forwards')
}, 6500)


// get game stats
const setGameStats = (mode) => {
    GAME_STATS.mode = mode
    GAME_STATS.start = true
    GAME_STATS.timer = 'no timer'
    GAME_STATS.totalQuestions = 10
    console.log(GAME_STATS)

    if(mode === 'arcade' || mode === 'speed'){
        GAME_STATS.totalQuestions = 500
    }
    if(mode === 'speed'){
        GAME_STATS.timer = startCountdown()
    }

    setMode()
}

// reset game stats
const resetStats = () => {
        GAME_STATS.username = 'PLAYER1',
        GAME_STATS.start = false,
        GAME_STATS.timer = {},
        GAME_STATS.correct = 0,
        GAME_STATS.incorrect = 0,
        GAME_STATS.answered = 0,
        GAME_STATS.accuracy = 0,
        GAME_STATS.totalQuestions= numberOfQuestions
}

// reset game variables
const resetGameVariables = () => {
    questions = []
    colorChoices = []
    useableSets = []
    secs = 60
}

//reset html changes from arcade mode
const resetHTML = () => {
    scoreLine.classList.remove('hidden')
    arcadeLine.classList.add('hidden')
    // arcadeRound
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
      endScreenDefault.classList.add('hidden')
      quitPage.classList.add('hidden')
    // console.log('STATUS',GAME_STATS)
}

// hide all screens except
const hideAllScreensExcept = (except) => {
    hideAllScreens()
    if(except) except.classList.remove('hidden')
}

const startGame = (mode) => {
    createAnswerSets(GAME_STATS.totalQuestions)
    // console.log(useableSets)
    configureQuestions()
    loadNextQuestions(GAME_STATS.answered, mode)
}

// 60 second timer
let secs = 60
const startCountdown = () => {
    intervalID = setInterval(tick, 1000)
}

//  count down secs
const tick = () => {
    // updating timer
    GAME_STATS.timer = secs
    console.log(GAME_STATS)
    console.log(`%c${secs} ...`, 'color: red; font-weight: bold;')
    secs--
    
    if(secs < 0){
        stopTimer()
        endGame()
    }
}

const stopTimer = () => {
    clearInterval(intervalID)
    console.log(`%ctimes up!!!!!!`, 'color: red; font-size: 25px')
}

// random inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const colors = ['red', 'orange', 'yellow', 'green', 'purple', 'pink', 'blue', 'grey', 'brown', 'white']
const colorsIndexedLength = colors.length - 1

let questions = []
let colorChoices =  []

let useableSets = []

// create answer selection first... push useable ones 
const createAnswerSets = (howManySets) => {

    for(let i = 1; i <= howManySets; i++){
        let set = []
        set.push(colors[getRandomIntInclusive(0, colorsIndexedLength)])
        set.push(colors[getRandomIntInclusive(0, colorsIndexedLength)])
        set.push(colors[getRandomIntInclusive(0, colorsIndexedLength)])
        set.push(colors[getRandomIntInclusive(0, colorsIndexedLength)])
        
        let uniqueSet = Array.from( new Set (set) )
        pushUseableSets(uniqueSet)
    }
    // console.log(useableSets)
}

// pushe useable stes
const pushUseableSets = (set) => {
    if(set.length === 4){
        useableSets.push(set)
        // console.log(`og useable set:`, useableSets)
    } else if(useableSets.length !== numberOfQuestions){
        // loops until numberOfQuestions goal is met
        console.log(`adding 1 more set`)
        createAnswerSets(1)
    }
}

// configure questions from each useable set
const configureQuestions = () => {
    useableSets.forEach((set) => {
        let question = {}
        // assign color set to object
        question.colors = set
        // grab 2 random colors and assign them in object
        question.name = set[getRandomIntInclusive(0, set.length -1)]
        question.style = set[getRandomIntInclusive(0, set.length -1)]
        // push to questions
        // console.log(question)
        questions.push(question)
    })
    console.log(questions)
}

// console.log(gpButtons)

gpButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // console.log(button)
        checkAnswer(button, GAME_STATS.answered)
        // incrementAnswered()
        if(GAME_STATS.mode === 'hard'){
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'hard')
            }, 100);
        } else if(GAME_STATS.mode === 'easy') {
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'easy') // one silly typo here cost me about an hour
            }, 100);
        } else if(GAME_STATS.mode === 'arcade'){
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'arcade')
            }, 100);
        } else if(GAME_STATS.mode === 'speed'){
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'speed')
            }, 100);
        }
    })
})

// if question answered increment gamestats answered
const incrementAnswered = () => {
    GAME_STATS.answered++
    console.log(`%cROUND : ${GAME_STATS.answered}`, 'color: magenta; font-size 20px;')
}

// check if question was correct or incorrect   have to do before incrementing
const checkAnswer = (selected, current) => {
    console.log(questions[current])
    let correctAnswer
    if(GAME_STATS.mode === 'hard' || GAME_STATS.mode === 'arcade' || GAME_STATS.mode === 'speed'){
        // get background color from selected
        let classes = selected.classList.value.split(' ')
        console.log(`selected classes:`, classes)
        console.log(classes)
        selected = classes.pop()
        selected = selected.slice(2)
    
        console.log(selected)
        // get right answer from current
        correctAnswer = questions[current].name
        console.log(`%ccorrect answer : ${correctAnswer}`, 'color:' + correctAnswer)        
    }
    
    if(GAME_STATS.mode === 'easy'){
        selected = selected.innerHTML.toUpperCase()
        console.log('SELECTED:',selected)
        // i think this is wrong
        // correctAnswer = gpColor.innerHTML
        // should be this instead
        correctAnswer = questions[current].style.toUpperCase()
        console.log('CORRECT',correctAnswer)
    }

    selected === correctAnswer ? incremenetGameStats(true) : incremenetGameStats(false)
}

// incrememnt gameStats
const incremenetGameStats = (correct) => {
    incrementAnswered()
    correct ? GAME_STATS.correct++ : GAME_STATS.incorrect++

    console.log(GAME_STATS)
    flash(correct)
}

// flash green if correct answer flash red if wrong
const flash = (correct) => {
    clearFlashStyles()
    setTimeout(() => {
        if(correct){
            console.log(`RIGHT ANSWER YAY FLASH FLASH FLASH`)
            gpQuestionBox.classList.add('rightAnswer')
            // gpQuestionBox.style.backgroundColor = 'lime'
        } else {
            gpQuestionBox.classList.add('wrongAnswer')
        }
    }, );
}

// remove flashing class after each question
const clearFlashStyles = () => {
    gpQuestionBox.classList = ''
    gpQuestionBox.classList = 'questionBox'
}

// load questions one by one... after answer is clicked
const loadNextQuestions = (current, mode) => {  
    checkForEnd()
    clearStyles(mode) 
    current = questions[current]

    console.log(`current`, current)
    

    // plug in name and color(style)
    gpColor.innerHTML = current.name.toUpperCase()
    gpColor.classList.add(current.style)
    
    // change options background color
    if(mode === 'hard' || mode === 'arcade' || mode === 'speed'){
        changeOptionsBackgroundColor(current)
    }

    if(mode === 'easy'){
        changeOptionsContent(current)
    }
}

// change options content
const changeOptionsContent = (current) => {
    for(let i = 0; i < gpChoices.length; i++){
        gpChoices[i].innerHTML = current.colors[i]
        gpChoices[i].classList = ''
        gpChoices[i].classList.add('choice')
        gpChoices[i].classList.add('bold')
    }
}

// change options background color
const changeOptionsBackgroundColor = (current) => {
    console.log(`CURRENT`, current)
        for(let i = 0; i < gpChoices.length; i ++){
            gpChoices[i].innerHTML = ''
            gpChoices[i].classList.add(`bg${current.colors[i]}`)
        }
}

// before loading next question... remove previous colors from dom

const clearStyles = (mode) => {
    // clear classes
    gpColor.classList.value = ''
    
    if(mode === 'hard' || mode === 'arcade' || mode === 'speed'){
        // add important class back
        gpColor.classList.add(GP_COLOR_CLASS)
    //    console.log(gpColor)
    
       for(let i = 0; i < gpButtons.length; i++){
        // clear
        gpButtons[i].classList.value = ''
        // add back
        // gpButtons[i].classList.add(GP_BUTTON_CLASSES[i]) //dont actually need these
        gpButtons[i].classList.add('choice')
       }
    }
    if(mode === 'easy'){
        console.log(`CLEAR EASY STYLES`)
        gpButtons.forEach((button) => {
            button.classList = ''
            button.classList.add('choice')
        })
    }
//    console.log(gpButtons)
}

// check for end
const checkForEnd = () => {
    // if arcade end when 1 wrong answer
    if(GAME_STATS.mode === 'arcade' || GAME_STATS.mode === 'speed'){
        fixModes(GAME_STATS.mode)
    } else {
        GAME_STATS.answered === GAME_STATS.totalQuestions ? endGame(): console.log(`%cGAME ON`, 'color: lime')
    }
}

// fix arcade mode stats
const fixModes = (mode) => {
    // need to change rank title from ACCURACY to CORRECT ANSWERS (maybe ROUND for arcade?)

    // fix ending screen
    scoreLine.classList.add('hidden')
    arcadeLine.classList.remove('hidden')

    if(mode=== 'arcade'){
        //end 
        GAME_STATS.incorrect > 0 ? endGame() : console.log(`%cGAME ON`, 'color: lime')
       
        //set total questions stat to total answered   
        GAME_STATS.totalQuestions = GAME_STATS.answered
        arcadeRound.innerHTML = (GAME_STATS.answered)
    }

    if(mode === 'speed'){
        //speed mode changes
                /// end after 60 seconds pass
        GAME_STATS.totalQuestions = GAME_STATS.answered
        arcadeRound.innerHTML = (GAME_STATS.answered)
        // cant think of what ending screen should say
    }

}

// end game
const endGame = () => {
    clearFlashStyles() //got rid of weird first flash before game starts... from lingering flash of previous game
    clearRanks()
    setStatus()
    setAccuracy()
    showStats()
    console.log(`%cGAME OVER`, 'color: red; font-size: 15px')
    // hide game screen
    gamePage.classList.add('hidden')
    // go to game over screen
    endScreenDefault.classList.remove('hidden')

    console.log(GAME_STATS)

}

// set game status
const setStatus = () => {
    GAME_STATS.start = false
}

// set accuracy stat
const setAccuracy = () => {
    let accuracy
    // if(GAME_STATS.totalQuestions === GAME_STATS.correct){
    //     accuracy = 100
    // } 
    if(GAME_STATS.answered > 0){
        accuracy = ( GAME_STATS.correct / GAME_STATS.answered )
        // GAME_STATS.accuracy = accuracy.toFixed(2) * 100
        accuracy = (accuracy* 100).toFixed(0)
    } else {
        accuracy = 0
    }
    GAME_STATS.accuracy = accuracy
}

// set game over screen stats
const showStats = () => {
    if(GAME_STATS.accuracy === 100){
        congratsPerfectScore.classList.remove('hidden')
        placeholder.classList.add('hidden')
    }
    if(GAME_STATS.accuracy <= 50){
        loserScore.classList.remove('hidden')
        placeholder.classList.add('hidden')
    }
    esAccuracy.innerHTML = GAME_STATS.accuracy
    esMode.innerHTML = GAME_STATS.mode
    esQuestions.innerHTML = GAME_STATS.answered // changed bc 1 off for arcade mode
    esCorrect.innerHTML = GAME_STATS.correct
    esIncorrect.innerHTML = GAME_STATS.incorrect
}


// submit button clicked
const onSubmit =  () => {
    // clear out rank container
    clearRanks()
    clearVariables()
    setLocalStorage()
    getLocalStorage()
    storeInObjects()
    sortByMode()
    shortenModes()
    displayRecentPlays(GAME_STATS.mode)
}

// clear rank container
const clearRanks = () => {
    esRankContainer.innerHTML = `   <div class="titles">
    <p>USERNAME</p>
    <p>MODE</p>
    <p>ACCURACY</p>
</div>   `
}
// clear variables
const clearVariables = () => {
    stored = []
    recentPlays = []
    easyMode = []
    hardMode = []
    arcadeMode = []
    speedMode = []
}

const username = document.querySelector('#username')

const updateUsername = (event) => {
    console.log(event)
    event.preventDefault() //prevent page reload
    GAME_STATS.username = username.value
    // clear submit
    username.value = ''

    console.log(GAME_STATS)
    // setLocalStorage()
    // getLocalStorage()

    onSubmit()

    console.log(`HARD MODE`, hardMode)
    hardMode.forEach((hard) => {
        console.log(hard)
    })
}



// store game stats in local storage
const setLocalStorage = () => {
    //remove start and username ?? from gamestats before storing
    // deep copy so that delete doesnt affect original gamestats
    let stats = Object.assign({}, GAME_STATS)
    
    // delete stats.username
    delete stats.start

    localStorage.setItem(GAME_STATS.username, JSON.stringify(stats))
}


let stored = []

// get data from local storage
const getLocalStorage = () => {
    for(let i = 0; i <localStorage.length; i++){

        let key = localStorage.key(i)
        let value = (JSON.parse(localStorage.getItem(key)))
        console.log(value)
       
        let keyValuePair = {}
        keyValuePair.key = value

        stored.push(keyValuePair)
    }
    console.log( stored)
    // storeInObjects()
}

let recentPlays = []
// grab and organize important info
const storeInObjects = () => {
    stored.forEach((obj) => {
        console.log(obj)
        // ordered.push(obj.key.correct)
        let user = {}
        user.username = obj.key.username
        user.totalQuestions = obj.key.totalQuestions
        user.mode = obj.key.mode
        user.accuracy = obj.key.accuracy
        user.timer = obj.key.timer

        recentPlays.push(user)
    })
    console.log(`all recent plays`,recentPlays)

    // stored.sort((stored.key.correct, stored.key.correct))
    // console.log(ordered)
    // sortByMode()
    // shortenModes()
    // displayRecentPlays(GAME_STATS.mode)
}

// recent plays appear on screen

let easyMode = []
let hardMode = []
let arcadeMode = []
let speedMode = []

// sort stored by mode
const sortByMode = () => {
    recentPlays.forEach((obj) => {
        if(obj.mode === 'easy'){
            easyMode.push(obj)
        } else if (obj.mode === 'hard'){
            hardMode.push(obj)
        } else if(obj.mode === 'arcade'){
            arcadeMode.push(obj)
        } else if(obj.mode === 'speed'){
            speedMode.push(obj)
        }
    })

    console.log(`%cEASY MODE LENGTH ${JSON.stringify(easyMode).length}`, 'color: lightblue')
    console.log(`%cHARD MODE LENGTH: ${JSON.stringify(hardMode).length}`, 'color: orange')
    console.log(`%cARCADE MODE LENGTH: ${JSON.stringify(arcadeMode).length}`, 'color: yellow')
    console.log(`%cSPEED MODE LENGTH: ${JSON.stringify(speedMode).length}`, 'color: grey')
}

// remove from easyMode and hardMode if length > 10
const shortenModes = () => {
    if(easyMode.length > 10){
        let extra = easyMode.length - 10
        for(let i = 1; i <= extra; i ++){
            easyMode.shift()
        }
    }
    if(hardMode.length > 10){
        let extra = hardMode.length - 10
        for(let i = 1; i <= extra; i ++){
            hardMode.shift()
        }
    }
    if(arcadeMode.length > 10){
        let extra = arcadeMode.length - 10
        for(let i = 1; i <= extra; i ++){
            arcadeMode.shift()
        }
    }
    if(speedMode.length > 10){
        let extra = speedMode.length - 10
        for(let i = 1; i <= extra; i ++){
            speedMode.shift()
        }
    }
}

const displayRecentPlays = (mode) => {
    if(mode === 'easy'){
            for(let i = 0; i < easyMode.length; i++){
                let display = ` <div class="ranks">
                <p class="username">${easyMode[i].username}</p>
                <p class="mode">${easyMode[i].mode}</p>
                <p class="accuracy">${easyMode[i].accuracy}%</p>
            </div>`
                esRankContainer.innerHTML += display
            } 
    } else if(mode === 'hard'){
            for(let i = 0; i < hardMode.length; i++){
                let display = ` <div class="ranks">
                <p class="username">${hardMode[i].username}</p>
                <p class="mode">${hardMode[i].mode}</p>
                <p class="accuracy">${hardMode[i].accuracy}%</p>
             </div>`
                esRankContainer.innerHTML += display
            }
    } else if(mode === 'arcade'){
        for(let i = 0; i < arcadeMode.length; i++){
            let display = ` <div class="ranks">
            <p class="username">${arcadeMode[i].username}</p>
            <p class="mode">${arcadeMode[i].mode}</p>
            <p class="accuracy">${arcadeMode[i].accuracy}%</p>
         </div>`
            esRankContainer.innerHTML += display
        }
    } else if(mode === 'speed'){
        for(let i = 0; i < speedMode.length; i++){
            let display = ` <div class="ranks">
            <p class="username">${speedMode[i].username}</p>
            <p class="mode">${speedMode[i].mode}</p>
            <p class="accuracy">${speedMode[i].accuracy}%</p>
         </div>`
            esRankContainer.innerHTML += display
        }
    }
}


// display current stat






// push combinations to color choices
// const pushCombinationsToChoices = () => {

//     combinations.forEach((combo) => {
//         let choices = []
//         console.log(combo)

//         choices.push(combo.name)
//         choices.push(combo.style)

//         colorChoices.push(choices)
//     })
//     console.log(colorChoices)
// }
// pushCombinationsToChoices()

// get 2 random colors added to options
// const addMoreChoices = () => {
//     colorChoices.forEach((choice) => {
//         // console.log(choice)

//         choice.push( colors[getRandomIntInclusive(0, colorsIndexedLength)] )
//         choice.push( colors[getRandomIntInclusive(0, colorsIndexedLength)] )
//         // console.log(choice)
//     })
//     // console.log(colorChoices)
// }
// addMoreChoices()


// make sure choices are all unique
// const checkForRepeats = () => {
//     colorChoices.forEach((choice) => {
//         let unique = new Set( choice )
//         // omg how did i forget SET RETURNS AN OBJECT !!!!!!!!!! grrr my other code prob worked lol
//         unique = Array.from(unique)
//         console.log('og', choice)
//         console.log(`unique`, unique)

//         if(choice.length === unique.length){
//             console.log(`%cWHEW, NO REPEATS`, 'color: lime')
//             console.log(`%c-----------------------------`, 'color: orange; font-weight: bold')
//             useableChoices.push(unique)
//         } else{
//             console.log('%cREPEATS UH OH', 'color: red')
//             unique = replaceRepeats(unique)
//             console.log(`NEW UNIQUE:`, unique)
//             console.log(`%c-----------------------------`, 'color: orange; font-weight: bold')
//             // checkForRepeats()
//             while(unique.length < 4){
//                 // checkForRepeats()
//                 unique = replaceRepeats(unique)
//             }
//             useableChoices.push(unique)
//         }
//     })
//     console.log(useableChoices)
// }

// replace repeats with uniques until uniques.length == 4
// const replaceRepeats = (list) => {

//     while(list.length < 4){
//         list = add(list)
//     }
//     return list
// }

//  add
// const add = (where) => {
//     where.push(colors[getRandomIntInclusive(0, colorsIndexedLength)])
//     return where
// }
// checkForRepeats()






// loop the pushes until length 4 is reached
// const pushUniqueOptions = (uniqueOptions) => {
//     for(let i = uniqueOptions.length; i <= 3; i++){
//         uniqueOptions.push(colors[getRandomIntInclusive(0, colors.length-1)])
//     }
//     console.log(`OPTIONS AFTER LOOP: ${uniqueOptions}`)
//     console.log(`%cLENGTH AFTER LOOP: ${uniqueOptions.length}`, 'color: red')
//     uniqueOptions = new Set(uniqueOptions)
// }

// create unique options for color combinations
// const uniqueColorOptions = () => {
//     combinations.forEach((combo) => {
//         let uniqueOptions = []
//         console.log(combo)
//         uniqueOptions.push(combo.name)
//         uniqueOptions.push(combo.style)
//         console.log(`starting options: ${uniqueOptions}`)

//         pushUniqueOptions(uniqueOptions)
//         // loop the pushes until length 4 is reached
//         // const pushUniqueOptions = (uniqueOptions) => {
//         //     for(let i = uniqueOptions.length; i <= 3; i++){
//         //         uniqueOptions.push(colors[getRandomIntInclusive(0, colors.length-1)])
//         //     }
//         //     console.log(`OPTIONS AFTER LOOP: ${uniqueOptions}`)
//         //     console.log(`%cLENGTH AFTER LOOP: ${uniqueOptions.length}`, 'color: red')
//         //     uniqueOptions = new Set(uniqueOptions)
//         // }
//         colorChoices.push(uniqueOptions)
//     })
//     console.log(colorChoices)

//     colorChoices.forEach((color) => {
//         console.log('not unique yet: ',color)

//         let uniqueColors = []
//         uniqueColors = new Set(color)
//         console.log(`unique colors`, uniqueColors)
        
//         // while(uniqueColors.length < 4){
//         //     console.log(`while loop entered`)
//         //     pushUniqueOptions(color)
//         // }

//         if(uniqueColors.length < 4){
//             pushUniqueOptions(uniqueColors)
//         }
//         console.log(`unique options length after loop:`, color)
//     })
// }
// uniqueColorOptions()




// create questions
// const createQuestions = () => {

    // combinations.forEach((combo) => {
    //     let question = {
    //         colors: []   
    //     }
    //     question.gameColor = combo.name,
    //     question.style = combo.style,
    //     question.colors.push({option : combo.style , answer : false })
    //     question.colors.push({option : combo.name, answer : true})

    //     // adding 2 random colors  .... have to make sure colors dont match
    //     question.colors.push({option: colors[getRandomIntInclusive(0, colors.length - 1)], answer: false})
    //     question.colors.push({option: colors[getRandomIntInclusive(0, colors.length - 1)], answer: false})

    //     questions.push(question)
    // })
    // console.log(questions)
// }
// createQuestions()


// make sure questions.options dont match ... 
// const checkForRepeats = () => {
//      //... no just no. nested loop and bad all around
//         let uniqueColors
//         questions.forEach((question) => {
//             let colors = []
//             // console.log(question.colors.option)
//             // colors.push(question.colors.option)
//             question.colors.forEach((color) => {
//                 colors.push(color.option)
//             })
//             uniqueColors = new Set( colors )
//             console.log(`original colors: `,colors)
//             console.log(`unique colors:`, uniqueColors)
            
//                 if(uniqueColors.length < 4){
//                     uniqueColors.push(colors[getRandomIntInclusive(0, colors.length-1)])
//                 }
//                 console.log(`length 4`, uniqueColors)
//         })
    
// }
// checkForRepeats()