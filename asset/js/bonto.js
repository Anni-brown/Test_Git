function Selector(d){
  return document.querySelector(d);
}


let h1 = document.querySelector('.rtn1');

// alert("join");
/*
let a = 50
function add(a, b) {

  if(a == 40){
    alert('yesss');
    return;


  }
   alert('nooooo');
}
*/

/*
function showNname(){
  let name = "manful computer"

  return name;
}

function displayName() {

  h1.innerHTML = 'this is name: ' + showNname();

  }
  displayName();
*/

  let mybtn = Selector('.mybtn');

  mybtn.addEventListener('click', () => {
    alert("Hello")
  })

  function _calc(n1, n2, callback){

    alert(n1 + n2);
    if(callback)callback(this);
  }
  _calc(2, 5, function(){

    alert('don calculating numbers');
  });