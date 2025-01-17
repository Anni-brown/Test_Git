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
let wrapper = document.querySelector('.gam-wrapper')
let selectedAmount = document.querySelector('.selectedAmount');






function  randomNumber(num){
    return Math.floor(Math.random() * num);
}

balls.forEach((ball, i) => {
    ball.addEventListener('click',  function(){
        let col1 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
        let col2 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;

        if(window.gameSession){
            return;
        }
       
        if(retrivefromstorage().length !== 0){

            // trying to check if the selected number is in local storsge
            if(retrivefromstorage().includes(this.innerHTML)){
                this.removeAttribute('style');
                this.classList.remove('_dbclick_');

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
        this.classList.add('_dbclick_');

        clearOutSelection();

    })
})
// when double click it freeze after selecting ball
function clearOutSelection(){
    // alert(20);
    let dblele = document.querySelectorAll('._dbclick_');
        dblele.forEach(ele => {
            ele.addEventListener('dblclick',function(){
                localStorage.removeItem('UserSelect');

                for(let x=0; x<balls.length;x++){
                    balls[x].removeAttribute('style');
                }
                returnselectedhere.innerHTML = '';
            })
        })
}

for(let x=0; x < 50; x++){
    let clr = `rgb(${randomNumber(255)}, ${randomNumber(255)}, 
    ${randomNumber(255)})`;
  

    let spn =document.createElement("span")
    spn.className = "gamebubles";
    spn.style.setProperty('background', `radial-gradient(${clr}, ${clr} 60%` );

  
    mainbubble.appendChild(spn)
}
// notification
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

//get nummer array by generating javascrrpt
function retriveSystemNumber(){
    let SelectData = localStorage.getItem('systemNumber');
    return SelectData ? JSON.parse(SelectData) : [];
}


// close notification start here
// console.log(retrivefromstorage().lenght)



function notification(txt, icon, sound, notificationType){
    let notitxt;
    if(notificationType == 'warn'){
        notitxt = 'Warning alert';
    }else if(notificationType == 'win'){
        notitxt = 'Win alert';
    }else if(notificationType == 'fund'){
        notitxt = 'Fundinf alert';
    }
    let wrapper = document.createElement('div');
    let notificationAppear = document.querySelector('.gam-wrapper');
        wrapper.className = 'notificationWrap';
        wrapper.innerHTML = `
        <div class="notificationContent">
            <h3>${notitxt} ${icon}</h3>

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

        // trying to prevent double selection once the  section is active

        if(window.gameSession){
            return;
        }
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
            spn.style.setProperty('background', clr);
            spn.style.setProperty('border-color', clr1);

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

// startBtn.onclick = function(event){
//     event.prevent



startBtn.onclick = function(){
    //game starter
    let gameStart = 0;

    let walletfundwraper = document.querySelector('.fundaccount');
    gameResult.innerHTML = '';

    if(retrivefromstorage().length != 6){
        notification('please select 6 random number!', '<i class="fas fa-angry-face"></i>', '', 'warn');
        close();
        return;
    }
// checking if user select betting amount
    if(getBettingAmount() == null) {
        notification('select betting amount', '<i class="fas fa-angry-face"></i>', '', 'warn');
        close();
        return;

    }
    //checking if current game balance is less than betting amount
    if (parseInt(getBalance()) < parseInt(getBettingAmount())){
        notification('wallet balance is low, fund your amount', '<i class="fas fa-angry-face"></i>', '', 'fund'); 
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

    winAnimation
// subtract betting amount from the current balance
    updateBalance('subtract', getBettingAmount());

    window.gameSession = true;

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

        //trying to remove previovs game round
        if(retriveSystemNumber().length >= 6){
            localStorage.removeItem('systemNumber');
        }


        let rstBall = document.createElement('div');
            rstBall.className = 'balls';
         let sysGen = numberArr [Math.floor(Math.random() * numberArr.length)];  
            rstBall.innerHTML = sysGen


            gameResult.appendChild(rstBall);
            systemNumber(sysGen); //system number funtions record the number system generating

            gStartBtn.innerHTML = 'Round ' +roundCounter;
            gameStart++;
    }

    // checking if 6 rounds is complete
    if(gameStart >= 6){
        clearInterval(bubblesStart);
        clearInterval(gamingInterval);
        gStartBtn.disabled = false;
        gStartBtn.innerHTML = 'play again';
        bubblesleg.innerHTML = ''; //clear out the dropout animation
        window.gameSession = false;


        console.log(checkoutcome());
        if(checkoutcome().length != 0){
       
            
            let winAmount;
    // subtract betting amount from the current balance
            //let winAmount = getBettingAmount() * checkoutcome().length;
            if(checkoutcome().length ==1){
                winAmount = getBettingAmount() / 2;
            }else{
                winAmount = getBettingAmount() * checkoutcome().length;
            }



            updateBalance('add', parseInt(winAmount));

            notification(`congrats, you won &#8358;${winAmount}`, '<i class="fas fa-angry-face"></i>', '', 'win'); 
            close();

            winAnimation(); //call win animatiin function here

        return;
        }
     notification('sorry, you did\'nt win anything this round', '<i class="fas fa-angry-face"></i>', '', 'lose'); 
        close();

        


    }

   
 }, 2000)
}
function updateBalance(type, amount){
    let newAmount = '';

    if(type == 'subtract'){
        newAmount = getBalance() - amount;
    }

    if(type == 'add'){
        newAmount = Number (getBalance()) + amount;
    }
// updating account balance
    balance.innerHTML = newAmount;

    localStorage.setItem('GameBalance', newAmount); //saving the new balance to storage
}

// allow wallet using input
function fundwallet(){
    let fInput = document.querySelector('.f-accountInput');
    let fundwalletWrapper = document.querySelector('.fundaccount')

    if(fInput.value == '' || isNaN(fInput.value)){
        notification('Enter a valid funding amount', '<i class="fas fa-angry-face"></i>', '', 'fund'); 
        close();
        return;
    }

    let currBalance = Number(getBalance());
    let fundAamount = Number(fInput.value);
    let mainBalance = currBalance + fundAamount;


    // checking if funding amount is bellow or less than minimum amount
    if(fInput.value < 100){
        notification('Minimum funding amount is &#8358;100', '<i class="fas fa-angry-face"></i>', '', 'fund'); 
        close();
        return;
    }

    localStorage.setItem('GameBalance', mainBalance);
    notification(`Congrats,wallet fund  succesfully with &#8358;${fInput.value}`, '<i class="fas fa-angry-face"></i>', '', 'fund'); 
    close();
    balance.innerHTML = mainBalance;
    fundwalletWrapper.remove();
}


function winAnimation(){
    // wrapper
    let cover = document.createElement('div');
        cover.className = "animation-cover";

        // for(let x=0; x < 500; x++){
        //     let col = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
        //     let clr1 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
            
        //     let spn = document.createElement('span');
        //     spn.className = 'win-animation';
        //     spn.style.backgroundColor = clr1;
        //     spn.style.setProperty('background', `radial-gradient(white, ${col} 60%)` );
        //     cover.appendChild(spn);
        // }


        for(let x=0; x < 80; x++){
            let col = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
            let clr1 = `rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`;
            
            let spn = document.createElement('span');
            spn.className = 'win-animation';
            spn.style.backgroundColor = clr1;
            cover.appendChild(spn);
        }
 
        

        wrapper.insertAdjacentElement('afterbegin', cover);
//when user the cover, we remove the entire animatiion
        cover.onclick = function(){
            this.remove();
        }
}

function winBubbles(){
    let nwpsn = document.querySelectorAll('.win-animation');
    let cnt = document.querySelector('.animation-cover');

    nwpsn.forEach((bubbles, index) => {
        let bblw = bubbles.clientWidth;
        let bblh = bubbles.clientHeight;
    
        let bbcnt1 = cnt.clientWidth;
        let bbcnt2 = cnt.clientHeight;
    
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










function bubblemovements(){
    let bub = document.querySelectorAll('.win-animation');

    bub.forEach((bubble) => {
        let bubblesWidths= bubble.clientWidth;
        let bubblesHeights = bubble.clientHeight;

        var containersWidth = mainbubble.clientWidth;
        var containersHeights = mainbubble.clientHeight;

        let randXs = Math.random() * (containersWidth - bubblesWidths);
        let randYs = Math.random() * (containersHeights - bubblesHeights)

        bubble.style.transform = `translate(${randXs}px, ${randYs}px)`;
    })
}

winAnimation();
setInterval(bubblemovements, 1000)



window.addEventListener('load', function(){
    _returnColor_();
    localStorage.removeItem('systemNumber');


// trying to set default 1500 wallet balance if it not already set

    if(localStorage.getItem('GameBalance') == null){
        localStorage.setItem('GameBalance', 1500);
    }

    balance.innerHTML = getBalance();

})



function systemNumber(number){
    let emptyArra = [];
    if(localStorage.getItem('systemNumber') !==null){
        let available = JSON.parse(localStorage.getItem('systemNumber'));
            emptyArra.push(number);

        let mergeArr = available.concat(emptyArra);

        localStorage.setItem('systemNumber', JSON.stringify(mergeArr));

        
    }else{
        emptyArra.push(number);
//saving into localstorage
        localStorage.setItem('systemNumber', JSON.stringify(emptyArra) )
    }
}

//check outcome
    function checkoutcome(){
        let user = retrivefromstorage();
        let system = JSON.parse(localStorage.getItem('systemNumber')); //system generate


        let t = system.filter(value => user.map(Number).includes(value))
        return t;
    }

