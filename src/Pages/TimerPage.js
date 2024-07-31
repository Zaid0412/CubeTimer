import { displayScramble,getScramble } from '../Components/Scramble'
import { createDropdown } from '../Components/Dropdown'

const body = document.body


const createTimerPage = () => {
    if ( document.querySelector('.top')) {
        body.removeChild(document.querySelector('.top'))
    }

    let html = ` <div class="top timerpage">
    <div class="top-nav">
     <div class="dropdown">
        <div class="select">
            <span class="selected">3x3</span>
            <div class="caret"></div>
        </div>
        <ul class="menu">
            <li>2x2</li>
            <li class="select-active">3x3</li>
            <li>4x4</li>
            <li>5x5</li>
            <li>6x6</li>
            <li>7x7</li>
        </ul>
    </div>
    </div>
       <div class="main">
        <div class="timer">
            <div class="scramble"><h1></h1></div>
            <div class="stopwatch"><h1>00.00</h1></div>
        </div>
        
    </div>
    <div class="aside">
       </div>
       </div>
    
   </div>`;

   body.insertAdjacentHTML('afterbegin', html)
   document.querySelector('.timer-icon').classList.add('active')
   createDropdown()

   displayScramble(getScramble())

}



export {createTimerPage}