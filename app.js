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

// random inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const colors = ['red', 'orange', 'yellow', 'green', 'purple', 'pink', 'blue', 'grey', 'brown', 'white']

let combinations = []
let questions = []
let colorChoices =  []

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