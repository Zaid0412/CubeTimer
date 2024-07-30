// const cube = require('./cubejs')
import './style.css'
import { getScramble, displayScramble } from './Components/Scramble'
import { startTimer, stopTimer, resetTimer } from './Components/Timer'
import { createTimerPage } from './Pages/TimerPage'
import { createSolvesPage } from './Pages/SolvesPage'
import { createAlgeSetPage } from './Pages/AlgSetPage'
import { Solve } from './Components/Solve'

// Load the page 
createTimerPage()

import timerIcon from './imgs/timer-icon.png'
import solvesIcon from './imgs/solves-icon.png'
import settingsIcon from './imgs/settings-icon.png'
import algsetIcon from './imgs/algset-icon.png'



const body = document.querySelector('body')
const ScrambleDisplay = document.querySelector('scramble-display')

let timer_Icon = document.querySelector('.timer-icon')
let allSolves_Icon = document.querySelector('.solves-icon')
let algset_Icon = document.querySelector('.algset-icon')
let settings_Icon = document.querySelector('.settings-icon')

timer_Icon.src = timerIcon
allSolves_Icon.src = solvesIcon
algset_Icon.src = algsetIcon
settings_Icon.src = settingsIcon




// let allSolves = []
let allSolves = JSON.parse(localStorage.getItem("allSolvesStorage"))
  ? JSON.parse(localStorage.getItem("allSolvesStorage"))
  : [{'222': []},{'333':[]}, {'444': []}, {'555': []}, {'666' : []}, {'777' : []}];


const saveSolvesToStorage = () => { 
    localStorage.clear()
    localStorage.setItem('allSolvesStorage', JSON.stringify(allSolves))
}


export const findSolve = (solveID, solveType) => {
    switch (solveType) {
        case '222':
    return allSolves[0]['222'].find(solve => solve.id === solveID)
        case '333':
    return allSolves[1]['333'].find(solve => solve.id === solveID)
        case '444':
    return allSolves[2]['444'].find(solve => solve.id === solveID)
        case '555':
    return allSolves[3]['555'].find(solve => solve.id === solveID)
        case '666':
    return allSolves[4]['666'].find(solve => solve.id === solveID)
        case '777':
    return allSolves[5]['777'].find(solve => solve.id === solveID)
    }
}

export const findSolveIndex = (solve) => {
    switch (solve.type) {
        case '222':
    return allSolves[0]['222'].indexOf(solve)
        case '333':
    return allSolves[1]['333'].indexOf(solve)
        case '444':
    return allSolves[2]['444'].indexOf(solve)
        case '555':
    return allSolves[3]['555'].indexOf(solve)
        case '666':
    return allSolves[4]['666'].indexOf(solve)
        case '777':
    return allSolves[5]['777'].indexOf(solve)
    }
}


export const deleteSolve = (solveID, solveType) =>{

    const solve = findSolve(solveID, solveType)
    const solveIndex = findSolveIndex(solve)

    
    switch (solveType) {
        case '222':
    allSolves[0]['222'].splice(solveIndex, 1)
    saveSolvesToStorage()
        case '333':
    allSolves[1]['333'].splice(solveIndex, 1)
    saveSolvesToStorage()
        case '444':
    allSolves[2]['444'].splice(solveIndex, 1)
    saveSolvesToStorage()
        case '555':
    allSolves[3]['555'].splice(solveIndex, 1)
    saveSolvesToStorage()
        case '666':
    allSolves[4]['666'].splice(solveIndex, 1)
    saveSolvesToStorage()
        case '777':
    allSolves[5]['777'].splice(solveIndex, 1)
    saveSolvesToStorage()
  
     }

}

const deleteAllSolves = () => {
    allSolves =  [{'222': []},{'333':[]}, {'444': []}, {'555': []}, {'666' : []}, {'777' : []}]
   
   saveSolvesToStorage()
}

let type = '333'
let keyDown = false
let isTimerRunning = false



// Load Timer
body.addEventListener('keydown', (event) =>  {
    if(event.code === 'Space' && !keyDown && !isTimerRunning){
    const timeTxt = document.querySelector('.stopwatch h1')
        setTimeout(() => {
            timeTxt.style.color = 'green'
            console.log(timeTxt.style.color);
        }, 400);
        keyDown = true
    }      
})


// Start Timer
body.addEventListener('keyup', (event) => {
    if (event.code === 'Space' && !isTimerRunning) {
        const timeTxt = document.querySelector('.stopwatch h1')
        const scrambleTxt = document.querySelector('.scramble h1')

        startTimer() 
        isTimerRunning = true
        keyDown = true

        // Change color back to normal
        timeTxt.style.color = 'var(--secondary-clr)'

        // Make background opaciy to 35% when timer is running
        scrambleTxt.classList.add('timerStart')
        ScrambleDisplay.classList.add('timerStart')
    }
})


// Stop Timer
body.addEventListener('keydown', (event) => {
    if (isTimerRunning) {
        const scrambleTxt = document.querySelector('.scramble h1')

        switch (type) {
            case '222':
        allSolves[0]['222'].push(new Solve(stopTimer(), scrambleTxt.textContent, '222'))
                break;
            case '333':
        allSolves[1]['333'].push(new Solve(stopTimer(), scrambleTxt.textContent))
                break;
        case '444':
        allSolves[2]['444'].push(new Solve(stopTimer(), scrambleTxt.textContent, '444'))
                break;
        case '555':
        allSolves[3]['555'].push(new Solve(stopTimer(), scrambleTxt.textContent, '555'))
                break;
        case '666':
        allSolves[4]['666'].push(new Solve(stopTimer(), scrambleTxt.textContent, '666'))
                break;
        case '777':
        allSolves[5]['777'].push(new Solve(stopTimer(), scrambleTxt.textContent, '777'))
                break;
        }

        resetTimer()
        saveSolvesToStorage()

        // Make background opaciy back to 100%
        scrambleTxt.classList.remove('timerStart')
        ScrambleDisplay.classList.remove('timerStart')

        // Generate a new scramble and display it
        displayScramble(getScramble())

        setInterval(() => {
            isTimerRunning = false
            keyDown = false
        }, 200);
    }
})

const activateBtn = (pressesBtn) => {
    
timer_Icon = document.querySelector('.timer-icon')
allSolves_Icon = document.querySelector('.solves-icon')
algset_Icon = document.querySelector('.algset-icon')
settings_Icon = document.querySelector('.settings-icon')

const allBtns = [timer_Icon, allSolves_Icon, algset_Icon, settings_Icon]

allBtns.forEach(btn => btn.classList.remove('active'))
console.log(allBtns);



}



timer_Icon.addEventListener('click', (e) => {
    e.preventDefault()
    activateBtn()
    createTimerPage()
})

allSolves_Icon.addEventListener('click', (e) => {
    e.preventDefault()
    activateBtn()
    createSolvesPage()
})


algset_Icon.addEventListener('click', (e) => {
    e.preventDefault()
    activateBtn()
    createAlgeSetPage()
})

settings_Icon.addEventListener('click', (e) => {
    activateBtn(settings_Icon)
})


console.log(allSolves);
// allSolves[0].plus2()
console.log(allSolves);


let test = [{'333':[]}, {'444': []}, {'555': []}, {'666' : []}, {'777' : []}];

// const slv = findSolve("66ded863-6320-4240-a394-e25260158477", '333')

// console.log(slv.plus2());