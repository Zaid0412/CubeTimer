import { v4 as uuidv4 } from 'uuid';


const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]




class Solve {
    constructor(time, scramble, type = '333') {

        this.time = time;
        this.scramble = scramble;
        this.date = `${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
        this.type = type;
        this.id = uuidv4();
        this.plus2 = false;
        this.DNF = false;
    }
}


const isPlus2 = (solve) => {
    solve.plus2 = true
    solve.time = Number(solve.time) + 2
}

const isDNF = (solve) => {
    solve.DNF = true
    solve.time = 'DNF'
}

export {Solve, isPlus2, isDNF}