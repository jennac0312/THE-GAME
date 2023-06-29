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
const gpColor = document.querySelector('.gameColor')
const gpChoices = document.querySelectorAll('.choice')
const gpButtons = gpChoices
// questionBox classes to keep
const GP_COLOR_CLASS = `gameColor`
const GP_BUTTON_CLASSES = ["c1", "c2", "c3", "c4"]


// game over screen variables





const numberOfQuestions = 10

// object to track screen location
const GAME_STATS = {
    username: 'PLAYER1',
    start : false,
    timer : {},
    correct: 0,
    incorrect: 0,
    answered: 0,
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
            startGame()
        }
        if(button.classList.contains('hard')){
            button.style.backgroundColor = 'rgb(168, 134, 74);'
            // set game stats
            setGameStats('hard')
            // show game
            gamePage.classList.remove('hidden')
            // start game
            startGame()
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

const startGame = () => {
    createAnswerSets(numberOfQuestions)
    console.log(useableSets)
    configureQuestions()
    loadNextQuestions(GAME_STATS.answered)
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


//  populate first question
const loadFirstQuestion = () => {
    let firstQuestion = questions[0]
    console.log(firstQuestion)

    gpColor.innerHTML = firstQuestion.name.toUpperCase()
    // gpColor.style.color = firstQuestion.style    ... may have to remove before adding
    gpColor.classList.add(`${firstQuestion.style}`)

    // change options
    for(let i = 0; i < gpChoices.length; i++){
        gpChoices[i].classList.add(`bg${firstQuestion.colors[i]}`)
    }
}

console.log(gpButtons)

gpButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // console.log(button)
        checkAnswer(button, GAME_STATS.answered)
        // incrementAnswered()
        loadNextQuestions(GAME_STATS.answered)
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
    
    // get background color from selected
    let classes = selected.classList.value.split(' ')
    console.log(`selected classes:`, classes)
    console.log(classes)
    selected = classes.pop()
    selected = selected.slice(2)

    console.log(selected)
    // get right answer from current
    let correctAnswer = questions[current].name
    console.log(`%ccorrect answer : ${correctAnswer}`, 'color:' + correctAnswer)

    selected === correctAnswer ? incremenetGameStats(true) : incremenetGameStats(false)
}

// incrememnt gameStats
const incremenetGameStats = (correct) => {
    incrementAnswered()
    correct ? GAME_STATS.correct++ : GAME_STATS.incorrect++

    console.log(GAME_STATS)
}

// load questions one by one... after answer is clicked
const loadNextQuestions = (current) => {  
    checkForEnd()
    clearStyles() 
    current = questions[current]

    // plug in name and color(style)
    gpColor.innerHTML = current.name.toUpperCase()
    gpColor.classList.add(current.style)

    // change options background color

    for(let i = 0; i < gpChoices.length; i ++){
        gpChoices[i].classList.add(`bg${current.colors[i]}`)
    }
}

// before loading next question... remove previous colors from dom

const clearStyles = () => {
    // clear classes
   gpColor.classList.value = ''

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
   console.log(gpButtons)
}

// check for end
const checkForEnd = () => {
    GAME_STATS.answered === numberOfQuestions ? endGame(): console.log(`%cGAME ON`, 'color: lime')
}


// end game
const endGame = () => {
    console.log(`%cGAME OVER`, 'color: red; font-size: 15px')
    // hide game screen
    gamePage.classList.add('hidden')
    // go to game over screen
    endScreenDefault.classList.remove('hidden')

}

const username = document.querySelector('#username')

const logUser = (event) => {
    console.log(event)
    event.preventDefault() //prevent reload
    // console.log(event.target['username'].value)
    console.log(username.value)
}






// store game stats in local storage
const setLocalStorage = () => {
    //remove start and username ?? from gamestats before storing
    // deep copy so that delete doesnt affect original gamestats
    let stats = Object.assign({}, GAME_STATS)

    delete stats.username
    delete stats.start

    localStorage.setItem(GAME_STATS.username, JSON.stringify(stats))
}

setLocalStorage()







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