import { displayScramble,getScramble } from '../Components/Scramble'

const body = document.body


const createTimerPage = () => {
    if ( document.querySelector('.top')) {
        body.removeChild(document.querySelector('.top'))
    }

    let html = ` <div class="top timerpage">
    <div class="top-nav"></div>
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

   displayScramble(getScramble())

}



export {createTimerPage}