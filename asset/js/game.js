let balls = document.querySelectorAll('.spn');
let  startBtn = document.querySelector('.startGameBtn');
let mainbubble = document.querySelector(".mainbubble");
let bettingAmount = document.querySelectorAll('.amount')
let returnselectedhere = document.querySelector('.returnselectedhere');
let bubblesleg = document.querySelector('.bles-legs');
let gameResult = document.querySelector('.game-result');
let balance = document.querySelector('.ballance');
let animation = ['fallout', 'moveleft'];
let bAmountWrapper = document.querySelector('.game-amount');
let selectedAmount = document.querySelector('.selectedAmount');






function  randomNumber(num){
    return Math.floor(Math.random() * num);
}

balls.forEach((ball, i) => {
    ball.addEventListener('click',  function(){
        let col1 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
        let col2 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;

       
        if(retrivefromstorage().length !== 0){

            // trying to check if the selected number is in local storsge
            if(retrivefromstorage().includes(this.innerHTML)){
                this.removeAttribute('style');
                unselected(this.innerHTML);
                // alert('yrsssss')
                return;
            }
        }

        if(retrivefromstorage().length >=6){
            notification('you can only select six number in a row', '<i class="fas fa-exclamation-circle"></i>', '');
            close();
            return;   
        }

        saveToStorage(this.innerHTML) //calling save to storage funtion

        let newSpan = document.createElement('span');
            newSpan.innerHTML = this.innerHTML;
            newSpan.style.setProperty('background', col1);
            newSpan.style.setProperty('border-color', col2);

        returnselectedhere.appendChild(newSpan);
        
        

        // this.style.background  = col1;
        this.style.setProperty('background', col1);
        this.style.setProperty('border-color', col2)
    })
})

for(let x=0; x < 50; x++){
    let clr = `rgb(${randomNumber(255)}, ${randomNumber(255)}, 
    ${randomNumber(255)})`;
  

    let spn =document.createElement("span")
    spn.className = "gamebubles";
    spn.style.setProperty('background', `radial-gradient(${clr}, ${clr} 60%` );

  
    mainbubble.appendChild(spn)
}

function bubblemovement(){
    let bbls = document.querySelectorAll('.gamebubles')

    bbls.forEach((bubbles, index) => {
        let bblw = bubbles.clientWidth;
        let bblh = bubbles.clientHeight;

        let bbcnt1 = mainbubble.clientWidth;
        let bbcnt2 = mainbubble.clientHeight;

        let x = bbcnt1 - bblw;
        let y = bbcnt2 - bblh;

        let randX = Math.floor(Math.random() * x) -100;
        let randY = Math.floor(Math.random() * y) -100;

        let clr = `rgb(${randomNumber(255)}, ${randomNumber(255)}, 
        ${randomNumber(255)})`;

        bubbles.style.position = 'relative';
        bubbles.style.top = randY +'px';
        bubbles.style.left = randX + 'px';
    bubbles.style.setProperty('background', `radial-gradient(${clr}, ${clr} 60%` );


    })
}

// setInterval(bubblemovement, 500);

function saveToStorage(number){
    let emptyArra = [];
    if(localStorage.getItem('UserSelect') !==null){
        let available = retrivefromstorage();
            emptyArra.push(number);

        let mergeArr = available.concat(emptyArra);

        localStorage.setItem('UserSelect', JSON.stringify(mergeArr));

        
    }else{
        emptyArra.push(number);

        localStorage.setItem('UserSelect', JSON.stringify(emptyArra) )
    }
}
// get number from the storage
function retrivefromstorage(){
    let SelectData = localStorage.getItem('UserSelect');
    return SelectData ? JSON.parse(SelectData) : [];
}

// close notification start here
// console.log(retrivefromstorage().lenght)



function notification(txt, icon, sound){
    let wrapper = document.createElement('div');
    let notificationAppear = document.querySelector('.gam-wrapper');
        wrapper.className = 'notificationWrap';
        wrapper.innerHTML = `
        <div class="notificationContent">
            <h3>warning alert ${icon}</h3>

            <h6>${txt}</h6>

            <button class="closeNotification">closs notification</button>
        </div>

        `;

        notificationAppear.insertAdjacentElement('afterbegin', wrapper);
}


function close(){
    let notificationWrapper = document.querySelector('.notificationWrap');
    let closeBtn = document.querySelector('.closeNotification');
        closeBtn.onclick = function(){
            notificationWrapper.remove();
        }
}
// selecting betting amount
for(let x=0; x < bettingAmount.length; x++){
    bettingAmount[x].onclick = function(){
        let activeBtn = document.querySelector('.selectedAmount');
        if(activeBtn !== null){
            activeBtn.classList.remove('selectedAmount');
        }

       
        this.classList.add('selectedAmount');
    }
}
// unselected selected numbers
function unselected(number){
    let currNumbers = retrivefromstorage();

    // retun possition of any already selected number
    let position = currNumbers.indexOf(number);

    currNumbers.splice(position, 1); //removing the selected number out from the list

    let selectedspn = returnselectedhere.querySelectorAll('span');
    let arr = Array.from(selectedspn);
    // let toRemove = arr.filter(spn => spn.innerHTML == number);

        arr.filter(span => {
            if(span.innerHTML === number){
                span.remove();
            }
        })

    localStorage.setItem('UserSelect', JSON.stringify(currNumbers));
}

//color numbers if page is reload
function _returnColor_(){


    for(let i =0; i < retrivefromstorage().length; i++){
        let clr = `rgb(${randomNumber(255)}, ${randomNumber(255)}, 
        ${randomNumber(255)})`;
        let clr1 = `rgb(${randomNumber(255)}, ${randomNumber(255)}, 
        ${randomNumber(255)})`;


        let selection = document.querySelector('.num-'+ retrivefromstorage()[i]);


         selection.style.setProperty('background', clr);
        selection.style.setProperty('border-color', clr1);

        let spn = document.createElement('span');
            spn.innerHTML = retrivefromstorage()[i];
            selection.style.setProperty('background', clr);
            selection.style.setProperty('border-color', clr1);

            returnselectedhere.appendChild(spn);    
        
    }
}

// getting user betting amount 
function getBettingAmount(){
let amount = document.querySelector('.selectedAmount');

    return amount ? amount.getAttribute('data-value') : null;
}

// get user balance
function getBalance(){
    let amount = localStorage.getItem('GameBalance');
    return amount ? amount : null;
}
console.log(getBalance());


startBtn.onclick = function(){
    //game starter
    let gameStart = 0;

    let walletfundwraper = document.querySelector('.fundaccount');
    gameResult.innerHTML = '';

    if(retrivefromstorage().length != 6){
        notification('please select 6 random number!', '<i class="fas fa-angry-face"></i>', '');
        close();
        return;
    }
// checking if user select betting amount
    if(getBettingAmount() == null) {
        notification('select betting amount', '<i class="fas fa-angry-face"></i>', '');
        close();
        return;

    }
    //checking if current game balance is less than betting amount
    if(getBalance() < getBettingAmount()){
        notification('wallet balance is low, fund your amount', '<i class="fas fa-angry-face"></i>', ''); 
        close();

        // start generating new element here that will allow users to fund their wallet if wallet is too low

      if(walletfundwraper === null){

        let wrp = document.createElement('DIV');
        wrp.className = 'fundaccount';

        let input = document.createElement('input');
            input.className = 'f-accountInput';
            input.type = 'text';
            input.placeholder = 'Enter Amount';

        let btn = document.createElement('button');
            btn.className = 'f-accountBtn';
            btn.innerHTML = '<i class="fas fa-wallet"></i>';
            btn.setAttribute('onclick', 'fundwallet()');
            
            wrp.appendChild(input);
            wrp.appendChild(btn);

        bAmountWrapper.insertAdjacentElement('afterend', wrp); 
      }  
          

        return;
    }

// subtract betting amount from the current balance
    updateBalance('subtract', getBettingAmount());

 //generating fallout animation span

 for(let x=0; x< 2; x++){
    let spn = document.createElement('span');
        spn.className = animation[x] 

        bubblesleg.appendChild(spn);
 }
    this.disabled = true;
    this.innerHTML = 'loading...';
    let gStartBtn = this;
    let numberArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];

    let bubblesStart = setInterval(bubblemovement, 400) ;
    let gamingInterval = setInterval(function(){

    // update current round
    let roundCounter = gameStart + 1;

    if(gameStart <= 6){
        let rstBall = document.createElement('div');
            rstBall.className = 'balls';
            rstBall.innerHTML = numberArr[Math.floor(Math.random() * numberArr.length)];

            gameResult.appendChild(rstBall);

            gStartBtn.innerHTML = 'Round ' +roundCounter;
            gameStart++;
    }

    // checking if 6 rounds is complete
    if(gameStart == 6){
        clearInterval(bubblesStart);
        clearInterval(gamingInterval);
        gStartBtn.disabled = false;
        gStartBtn.innerHTML = 'play again';
        bubblesleg.innerHTML = ''; //clear out the dropout animation
    }

   
 }, 2000)
}
function updateBalance(type, amount){
    let newAmount = '';

    if(type == 'subtract'){
        newAmount = getBalance() - amount;
    }

    if(type == 'add'){
        newAmount = getBalance() + amount;
    }
// updating account balance
    balance.innerHTML = newAmount;

    localStorage.setItem('GameBalance', newAmount); //saving the new balance to storage
}

// allow wallet using input
function fundwallet(){
    let fInput = document.querySelector('.f-accountInput');

    if(fInput.value == '' || isNaN(fInput.value)){
        notification('Enter a valid funding amount', '<i class="fas fa-angry-face"></i>', ''); 
        close();
        return;
    }

    // checking if funding amount is bellow or less than min amount
    if(fInput.value < 100){
        notification('Minimum funding amount is &#8358;100', '<i class="fas fa-angry-face"></i>', ''); 
        close();
        return;
    }

    localStorage.setItem('GameBalance', getBalance() + fInput.value);
    notification(`Congrats,wallet fund  succesfully with &#8358;${fInput.value}`, '<i class="fas fa-angry-face"></i>', ''); 
    close();
    balance.innerHTML = getBalance();
}

window.addEventListener('load', function(){
    _returnColor_();


// trying to set default 1500 wallet balance if it not already set

    if(localStorage.getItem('GameBalance') == null){
        localStorage.setItem('GameBalance', 1500);
    }

    balance.innerHTML = getBalance();

})

