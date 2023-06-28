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
const gpColor = document.querySelector('.gameColor')

// object to track screen location
const GAME_STATS = {
    start : false
}



// toggle screens for buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(!GAME_STATS.start){
            // hide home page
            homePage.classList.add('hidden')
            // hide other screens ( game and directions and modes )
                // make this a looop... DRY ? or bad bc nested
            modePage.classList.add('hidden')
            gamePage.classList.add('hidden')
            directionsPage.classList.add('hidden')
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
    console.log(GAME_STATS)

    setMode()
}

// set mode on game screen
const setMode = () => {
    gpMode.innerHTML = GAME_STATS.mode
}