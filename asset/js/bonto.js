

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

  // Array 
  let myarr = [
                  'MANFUL',
                  455000,
                  'COMPUTER',
                  'EDUCATION',
                  true
  ]

      // myarr.forEach(eachElement => {
      //   console.log(eachElement)
      // })



      // to bring out the element that are less than 5
  let xx = myarr.forEach(ele => {
    let txt = ele.toString().length > 5 ;

    console.log(txt)
  }) 

  // converting sring to array
  let arrayToString = myarr.toString();
  console.log(arrayToString);

  let newArr = arrayToString.split(',');

    console.log(newArr);
  
  // JAVASCRIPT ARRAY METHOD IS USE TO RETURN NEW ARRAY OF ALL THE ELEMENT THAT PASS A TEST

  let mp = myarr.filter(mapElement => mapElement.length >= 5);
    console.log(mp)


      mp.forEach(element => {
        console.log(element)
      })
    

    // to bring out the element that are less than 5, method 2

  for(let x =0; x < myarr.length; x++){
    let tx = myarr[x];

    console.log(tx)
  } 
  
  // array.pop(),  is use to remove an element from array
  // method remove the last element from an array: it remove an element that was pop out

  let arr1 = [45, 50, 65, 70, 100];
     alert (myarr.pop());
      console.log(arr1)

  // 

  let inputFile = Selector('.selectmaltiple');
  let fileList = [];
      inputFile.addEventListener('change', function(){

        // alert('ok yess')
        let = files = this.files;

        for(let x =0; x < files.length; x++){

          let tmp = URL.createObjectURL(files[x]);

          let img = document.createElement('img');
              img.className = 'generateImg';
              img.src = tmp;

              this.insertAdjacentElement('afterend', img);

              fileList.push(files[x].name);
        }
        console.log(fileList);
      }); 