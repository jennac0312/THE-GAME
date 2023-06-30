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
// game over rank section
const esRankContainer = document.querySelector('.rank')
const esFirst = document.querySelector('.first')
const esSecond = document.querySelector('.second')
const esThird = document.querySelector('.third')
// game over screen buttons
const esPlayButton = document.querySelector('.play')
const esClearHistoryButton = document.querySelector('.clearHistory')
const esSubmitButton = document.querySelector('.submit')



const numberOfQuestions = 10

// object to track screen location
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
            console.log('STATUS',GAME_STATS)
            // start game
            startGame('hard')
        }

        if(button.classList.contains('play')){
            console.log('play again button clicked')
            hideAllScreensExcept(homePage)

            // need to reset stats
            resetStats()
        }
        if(button.classList.contains('clearHistory')){
            localStorage.clear()
            clearRanks()
            clearVariables()
            hideAllScreensExcept(endScreenDefault)
        }

        if(button.classList.contains('science')){
            hideAllScreensExcept(directionsPage)
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
}, 11500)


// get game stats
const setGameStats = (mode) => {
    GAME_STATS.mode = mode
    GAME_STATS.start = true
    GAME_STATS.timer = startTimer()
    console.log(GAME_STATS)

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
    console.log('STATUS',GAME_STATS)
}

// hide all screens except
const hideAllScreensExcept = (except) => {
    hideAllScreens()
    if(except) except.classList.remove('hidden')
}

const startGame = (mode) => {
    createAnswerSets(numberOfQuestions)
    console.log(useableSets)
    configureQuestions()
    loadNextQuestions(GAME_STATS.answered, mode)
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

// random inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const colors = ['red', 'orange', 'yellow', 'green', 'purple', 'pink', 'blue', 'grey', 'brown', 'white']
const colorsIndexedLength = colors.length - 1

let combinations = []
let questions = []
let colorChoices =  []

let answerSets = []
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
        console.log(question)
        questions.push(question)
    })
    console.log(questions)
}

console.log(gpButtons)

gpButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // console.log(button)
        checkAnswer(button, GAME_STATS.answered)
        // incrementAnswered()
        if(GAME_STATS.mode === 'hard'){
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'hard')
            }, 300);
        } else {
            setTimeout(() => {
                loadNextQuestions(GAME_STATS.answered, 'easy') // one silly typo here cost me about an hour
            }, 300);
        }
    })
})

// if question answered increment gamestats answered
const incrementAnswered = () => {
    GAME_STATS.answered++
    console.log(GAME_STATS.answered)
}

// check if question was correct or incorrect   have to do before incrementing
const checkAnswer = (selected, current) => {
    console.log(questions[current])
    let correctAnswer
    if(GAME_STATS.mode === 'hard'){
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
        correctAnswer = gpColor.innerHTML
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
    }, 100);
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
    if(mode === 'hard'){
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
    
    if(mode === 'hard'){
        // add important class back
        gpColor.classList.add(GP_COLOR_CLASS)
       console.log(gpColor)
    
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
   console.log(gpButtons)
}

// check for end
const checkForEnd = () => {
    GAME_STATS.answered === numberOfQuestions ? endGame(): console.log(`%cGAME ON`, 'color: lime')
}


// end game
const endGame = () => {
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
    let accuracy = GAME_STATS.correct / GAME_STATS.answered

    GAME_STATS.accuracy = accuracy.toFixed(2) * 100
}

// set game over screen stats
const showStats = () => {
    if(GAME_STATS.accuracy === 100){
        congratsPerfectScore.classList.remove('hidden')
    }
    if(GAME_STATS.accuracy <= 50){
        loserScore.classList.remove('hidden')
    }
    esAccuracy.innerHTML = GAME_STATS.accuracy
    esMode.innerHTML = GAME_STATS.mode
    esQuestions.innerHTML = GAME_STATS.totalQuestions
    esCorrect.innerHTML = GAME_STATS.correct
    esIncorrect.innerHTML = GAME_STATS.incorrect
}


// submit button clicked
const onSubmit =  () => {
    // clear out rank container
    clearRanks()
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

// sort stored by mode
const sortByMode = () => {
    recentPlays.forEach((obj) => {
        if(obj.mode === 'easy'){
            easyMode.push(obj)
        } else if (obj.mode === 'hard'){
            hardMode.push(obj)
        }
    })

    console.log(easyMode)
    console.log(hardMode)
}

// remove from easyMode and hardMode if length > 10
const shortenModes = () => {
    if(easyMode.length > 5){
        let extra = easyMode.length - 5
        for(let i = 1; i <= extra; i ++)
        easyMode.shift()
    }
    if(hardMode.length > 5){
        let extra = hardMode.length - 5
        for(let i = 1; i <= extra; i ++)
        hardMode.shift()
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