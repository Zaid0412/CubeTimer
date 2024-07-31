import { createDropdown } from '../Components/Dropdown'

const body = document.body

const createAlgeSetPage = () => {
    if ( document.querySelector('.top')) {
        body.removeChild(document.querySelector('.top'))
    }

    let html = ` <div class="top algsetpage">
    <div class="top-nav">
    <h1> Algorithms </h1>
    <div class="dropdown">
        <div class="select">
            <span class="selected">OLL</span>
            <div class="caret"></div>
        </div>
        <ul class="menu">
            <li>PLL</li>
            <li class="active">OLL</li>
        </ul>
    </div>

    </div>
       <div class="main">
       
    </div>
    <div class="aside">
     
       </div>
    </div>
    
   </div>`;

   body.insertAdjacentHTML('afterbegin', html)
   createDropdown()
   document.querySelector('.algset-icon').classList.add('active')



}



export {createAlgeSetPage}