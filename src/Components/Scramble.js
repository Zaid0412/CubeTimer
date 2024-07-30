const Scrambow = require('scrambow').Scrambow;
import { ScrambleDisplay } from "scramble-display"




export const getScramble = (type = '333') =>{

const scrambleObj = new Scrambow().setType(type); // Defaults to 3x3
const scramble = scrambleObj.get(1)[0].scramble_string



return [type, scramble]
}


export const displayScramble = (scrambleArr) => {
const scrambleTxt = document.querySelector('.scramble h1')
   
    if (document.querySelector('.aside scramble-display')) {
        document.querySelector('.aside').removeChild(document.querySelector('.aside scramble-display'))
    }

    const [type, scrambleStr] = scrambleArr
    scrambleTxt.textContent = scrambleStr
    
    const el = new ScrambleDisplay()
    el.scramble = scrambleStr
    el.event = type
    document.querySelector('.aside').insertAdjacentElement('beforeend',el)

}