const body = document.body

import { ScrambleDisplay } from "scramble-display";
import { findSolveIndex, findSolve, deleteSolve, saveSolvesToStorage} from "..";
import { Solve, isPlus2, isDNF } from "../Components/Solve";
import { createDropdown } from "../Components/Dropdown";

import closeIcon from '../imgs/close-icon.png'



const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];


const displaySolves = (solveType) => {
    let allSolves = JSON.parse(localStorage.getItem("allSolvesStorage"))
  ? JSON.parse(localStorage.getItem("allSolvesStorage"))
  : undefined;

  if (allSolves && document.querySelector('.solves')) {
  let solveDisplayTxt;
  let solveIndex;
    switch (solveType) {
        case '222':
            solveDisplayTxt = '2x2'
            solveIndex = 0
            break;
        case '333':
            solveDisplayTxt = '3x3'
            solveIndex = 1;
            break;    
        case '444':
            solveDisplayTxt = '4x4'
            solveIndex = 2;
            break;  
        case '555':
            solveDisplayTxt = '5x5'
            solveIndex = 3;
        break;         
        case '666':
            solveDisplayTxt = '6x6'
            solveIndex = 4;
        break;  
        case '777':
            solveDisplayTxt = '7x7'
            solveIndex = 5;
        break;  
    }  


    allSolves[solveIndex][solveType].forEach(solve => {
    let [solveDisplayDate, yearAndTime] = solve.date.split(',')
    let [_ ,year, time] = yearAndTime.split(' ')

        let html = `
         <div class="solve" data-solveID=${solve.id} data-solvetype=${solve.type}>
                    <h2 class="solve-date">${solveDisplayDate}, ${year}</h2>
                    <div class="solve-type">${solveDisplayTxt}</div>
                    <h1 class="solve-time">${solve.time}</h1>
        `
        document.querySelector('.solves').insertAdjacentHTML('afterbegin', html)

    });

  }

}

const createInfoModal = (solve) => {
    let solveDisplayTxt;
    switch (solve.type) {
        case '222':
            solveDisplayTxt = '2x2'
            break;
        case '333':
            solveDisplayTxt = '3x3'
            break;    
        case '444':
            solveDisplayTxt = '4x4'
            break;  
        case '555':
            solveDisplayTxt = '5x5'
        break;         
        case '666':
            solveDisplayTxt = '6x6'
        break;  
        case '777':
            solveDisplayTxt = '7x7'
        break;  
    }
    
    let html = `
      <dialog class="solve-info">
        <section class="section-1">
            <div class="btns">
                <button class="delete-btn">Delete</button>
                <img src=${closeIcon} class="close-icon icon" alt="Close Button" role="button">
            </div>
            <div class="solve-time"><h1>${solve.time}</h1></div>
            <div class="solve-options">
                 <button disabled>${solveDisplayTxt}</button>
                <button id="plus2-btn" class=${solve.plus2 ? "plus2-active" : ""}>+2</button>
                <button id="DNF-btn" class=${solve.DNF ? "DNF-active" : ""}>DNF</button>
            </div>
            <div class="solve-date">${solve.date}</div>
        </section>
        <section class="section-2">
            <div class="solve-scrambleDisplay"></div>
            <div class="solve-scramble"></div>
        </section>
    </dialog>
    
     `

     body.insertAdjacentHTML('afterbegin', html)
      
     const el = new ScrambleDisplay()
     el.scramble = solve.scramble
     el.event = solve.type
     document.querySelector('.solve-scramble').textContent = solve.scramble
     document.querySelector('.solve-scrambleDisplay').insertAdjacentElement('beforeend',el)

}

displaySolves()


const createSolvesPage = () => {
    if ( document.querySelector('.top')) {
        body.removeChild(document.querySelector('.top'))
    }

    let html = `
     <div class="top solvespage">
        <div class="top-nav">
     
        </div>
        <div class="main">
            <div class="solves">
            </div>
        </div>
       </div>
   `;

   body.insertAdjacentHTML('afterbegin', html)
   document.querySelector('.solves-icon').classList.add('active')
   createDropdown()

    displaySolves('333')

    document.querySelectorAll('.solve').forEach(solve => {
        solve.addEventListener('click', () => {
            const solveID = solve.dataset.solveid
            const solveType = solve.dataset.solvetype
            const solve_ = findSolve(solveID, solveType)
            createInfoModal(solve_)
            
            const infoModal = document.querySelector('.solve-info')
            infoModal.showModal()

            
            const displaySolveTime = document.querySelector('.solve-time h1')
            const plus2Btn = document.querySelector('#plus2-btn')
            const solveTime = solve_.time
            body.addEventListener('click', (e) => {
                if(e.target.classList.contains('close-icon')){
                    infoModal.close()
                    saveSolvesToStorage()
                }
                if (e.target.textContent === 'DNF') {
                    if(!solve_.DNF){
                        isDNF(solve_)
                        e.target.classList.add('DNF-active')
                        displaySolveTime.textContent = 'DNF'
                        plus2Btn.disabled = true    
                    }else if (solve_.DNF) {
                        solve_.DNF = false
                        solve_.time = solveTime
                        e.target.classList.remove('DNF-active')
                        displaySolveTime.textContent = solveTime
                        plus2Btn.disabled = false
                    }
                }
                if (e.target.textContent === '+2') {
                    if(!solve_.plus2){
                        isPlus2(solve_)
                        e.target.classList.add('plus2-active')
                        displaySolveTime.textContent = solve_.time
                        console.log(solve_);
                    }else if (solve_.plus2) {
                        solve_.plus2 = false
                        solve_.time = solveTime
                        e.target.classList.remove('plus2-active')
                        displaySolveTime.textContent = solveTime
                        console.log(solve_);
                    }
                }
                if (e.target.textContent === 'Delete') {
                    deleteSolve(solveID, solveType)
                    solve.remove()
                    infoModal.close()
                }
            })

    })
    
})

}


export {createSolvesPage}






