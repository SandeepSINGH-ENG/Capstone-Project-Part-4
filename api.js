let play = document.getElementById("playground");
let scoreB = document.getElementById('float-number');
let btn1 = document.getElementById('btn1');
function step1c(){
  let step1 = document.getElementById('step1');
  let step2 = document.getElementById('step2');
  step1.style.display = "none";
  step2.style.display = "block";
}
btn1.addEventListener("click", step1c);
let btn2 = document.getElementById('btn2');
function step2c(){
  let step2 = document.getElementById('step2');
  let step3 = document.getElementById('step3');
  step2.style.display = "none";
  step3.style.display = "block";
}
btn2.addEventListener("click", step2c);
  var keysArray = [];
document.getElementById("preForm").addEventListener("submit", function(event) {
  let step3S = document.getElementById('preStart');
  step3S.style.display = "none";
  scoreB.style.display = 'block';
  play.style.display = 'block';
 
  event.preventDefault();
  
  var formData = new FormData(event.target);
  

  var formDataObject = {};
  

  formData.forEach(function(value, key){
    formDataObject[key] = value;
  });
  localStorage.setItem('name', formDataObject['name']);
  localStorage.setItem('tags', formDataObject['tags']);
  localStorage.setItem('difficulity', formDataObject['difficulity']);
 
  const API_TOKEN = "FAiyfhJlIcP0Yeq5S2n8GsrYCKKnTmR4dP6alsYO";
  let name = formDataObject['name'];
  let tags = formDataObject['tags'];
  let difficulity = formDataObject['difficulity'];
  async function fetchQuizQuestions() {
    try {
      const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=" + API_TOKEN + "&limit=5&tags=" + tags + "&difficulity=" + difficulity);
  
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      return null;
    }
  }
  fetchQuizQuestions()
    .then(questions => {
      if (questions) {
        console.log(questions);
       
        for (i = 0; i < 5; i++) {
          
          const liElement = document.createElement('div');
  
          if (i == 0) {
            liElement.classList = `quix-${i} quiz-start`;
          }
          else {
            liElement.classList = `quix-${i} hidden quiz-start `;
          }
          let data = (` <div class="quizer-s" index="${i}"><h1> ${questions[i]['question'].replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                 </h1><div class="box-selection">
                 <form action="/action_page.php" id='quiz-${questions[i]['id']}'>
                    </form></div>`);
          if (i == 0) {
            let btn = (`<div class="mylink-btn w30 step-btns" onclick="next(${i})">Next</div>`);
            liElement.innerHTML = data + btn;
            play.appendChild(liElement);
          }
          else if (i == 4) {
            let btn = (`
                      <div class="quiz-btn-flex">
                      <div class="mylink-btn w30 step-btns" onclick="pre(${i})">previous</div>
                      <div class="mylink-btn w30 step-btns" onclick="result()">finish</div>
                      </div>
                      `);
            liElement.innerHTML = data + btn;
            play.appendChild(liElement);
          } else {
            let btn = (`
                      <div class="quiz-btn-flex">
                      <div class="mylink-btn w30 step-btns" onclick="pre(${i})">previous</div>
                      <div class="mylink-btn w30 step-btns" onclick="next(${i})">Next</div>
                      </div>
                      `);
            liElement.innerHTML = data + btn;
            play.appendChild(liElement);
          }
  
  
          for (var key in questions[i]['answers']) {
            if (questions[i]['answers'][key] != null) {
              let options = (` <input type="radio" id="${questions[i]['id']}-${key}" name="quizer" option="${key}">
                          <label for="${questions[i]['id']}-${key}"><div class="selection"><div class="check">1</div></div>${questions[i]['answers'][key].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</label><br>`);
              let form = document.getElementById(`quiz-${questions[i]['id']}`);
              const formoption = document.createElement('div');
              formoption.innerHTML = options;
              form.appendChild(formoption);
            }
            
          }
         
          for (var key in questions[i]['correct_answers']) {
         if(questions[i]['correct_answers'][key] == 'true'){
      
          keysArray.push(key);
        
  
        }
        }
         
        
        }
      
      } else {
        console.log("Failed to fetch questions.");
      }
    })
    .catch(error => console.error("Error:", error));
});

function next(n) {
  var click = document.getElementById("click"); 
  click.play(); 
  let cur = document.getElementsByClassName(`quix-${n}`);
  cur[0].classList.add("hidden");
  let nxt = document.getElementsByClassName(`quix-${n + 1}`);
  nxt[0].classList.remove("hidden");
  let curStep = document.getElementById('cur-step');
  curstep = parseInt(curStep.textContent);
  let nexStep = curstep + 1;
  curStep.innerText = nexStep;
}
function pre(n) {
  var click = document.getElementById("click"); 
  click.play(); 
  let cur = document.getElementsByClassName(`quix-${n}`);
  cur[0].classList.add("hidden");
  let nxt = document.getElementsByClassName(`quix-${n - 1}`);
  nxt[0].classList.remove("hidden");
  let curStep = document.getElementById('cur-step');
  curstep = parseInt(curStep.textContent);
  let prestep = curstep - 1;
  curStep.innerText = prestep;
}

function result() {
  let name = localStorage.getItem('name');
  let tags = localStorage.getItem('tags');
  let difficulity = localStorage.getItem('difficulity');
  scoreB.style.display = 'none';
  var resultArray = [];
  for(i=0; i<5; i++){
   let check = document.querySelectorAll(`[index="${i}"] .box-selection input:checked`); 
  
  
    resultArray.push(`${check[0].getAttribute("option")}_correct`);
   
   
  }
  // console.log(resultArray);

let plus = 0;
for(i=0; i<5; i++){
  if(resultArray[i] == keysArray[i] ){
   
   plus++;
  //  console.log(`${[i]} is correct ${plus}`)
   let correct = document.querySelectorAll(`[index="${i}"] .box-selection`); 
   correct[0].classList.add("correct");
  }
  else{
    // console.log(`${[i]} is incorrect`)
    let incorrect = document.querySelectorAll(`[index="${i}"] .box-selection`); 
    incorrect[0].classList.add("incorrect");
  }
}
// console.log(plus);

var existingArrayString = localStorage.getItem('myArray');

var existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

let currentDate = new Date();
let year = currentDate.getFullYear(); 
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate(); 
let hours = currentDate.getHours(); 
let minutes = currentDate.getMinutes(); 
let seconds = currentDate.getSeconds();
let date = year + "-" + month + "-" + day;
let time = hours + ":" + minutes + ":" + seconds;
var newData = {
  "name": name,
  "Score": plus,
  "tags":tags,
  "difficulity": difficulity,
  "date": date,
  "time": time
};
  
existingArray.push(newData);

// Stringify the updated array
var updatedArrayString = JSON.stringify(existingArray);

// Store the updated string back into local storage
localStorage.setItem('myArray', updatedArrayString);

 var retrievedArray = JSON.parse(localStorage.getItem('myArray'));
 console.log(retrievedArray);


    let contentP = (`<div class="review"> <div class="quizer-s"><div class="box-selection">
           <div>
           <div class="emoji">&#128512;</div>
           <div class="resultHeading"><h1> ${plus}/5</h1></div>
           <p>Congratulations! 🎉 ${name}</p>
           <p>You are officially a quiz champion! 🏆✨ We are thrilled to announce that you have conquered our quiz with flying colors, answering every question with precision and expertise. Your knowledge and skills in the ${tags} is truly commendable.
           <p>Take a moment to bask in the glory of your achievement. You've not only demonstrated your understanding of complex ${tags} concepts but also showcased your dedication to continuous learning and improvement.
</p>

           <div class="mylink-btn w30 step-btns" onclick="review()">Review</div>
           </div></div>`);

  let contentN = (`<div class="review"> <div class="quizer-s"><div class="box-selection">
           <div>
           <div class="emoji">&#128542;</div>
           <div class="resultHeading"><h1> ${plus}/5</h1></div>
           <p>Sorry ${name}</p>
           <p>You didn't do as well as you hoped in the quiz. Remember, setbacks like this 
           are opportunities for growth and learning. Analyze what went wrong, identify areas for improvement, and
            keep striving for success. With persistence 
           and dedication, you'll improve and achieve better results next time. If you need any help or support, feel free to ask!</p>
           <div class="mylink-btn w30 step-btns" onclick="review()">Review</div>
           </div></div>`);


  let resultDisplay = document.getElementById("playground");
  const liElement = document.createElement('div');
  if(plus > 3){
    var success = document.getElementById("success"); 
    success.play(); 
     liElement.innerHTML = contentP;
  }
 else{
  var failed = document.getElementById("failed"); 
  failed.play(); 
  liElement.innerHTML = contentN;
 }
  let lastQ = document.getElementsByClassName(`quix-4`);
  lastQ[0].classList.add('hidden');
  resultDisplay.appendChild(liElement);

}
function review() {

  let showAll = document.getElementsByClassName(`quiz-start`);
  let label = document.querySelectorAll('label');

  for (let i = 0; i < label.length; i++) {
  // console.log(label);
    label[i].setAttribute("disabled", "true");;
  }
 
  for (let i = 0; i < 5; i++) {
    showAll[i].classList.remove('hidden');
  }
  let resultDisplay = document.getElementById("playground");
  const liElement = document.createElement('div');
  let content = (`<a href="index.html" class=" last-btn-link"><div class="btn-last w30">Home</div></a><style>.quiz-start {
                  top: 0;
                  transform: unset;
              }.step-btns,.review,#float-number{display:none;}.quizBody-all {
                height: 100%;}.hidden{display:block;}</style>`);
  liElement.innerHTML = content;
  resultDisplay.appendChild(liElement);
}

var retrievedArray = JSON.parse(localStorage.getItem('myArray'));
let newRecord = document.getElementById("newRecord");
let newscroll = document.getElementById("scroll");

if(retrievedArray){
  // console.log('hove');
  newRecord.style.display = 'block';
  newscroll.style.display = 'block';
  let records = document.getElementById("records");
  let bin = document.getElementById("bin");
  function del(){
     localStorage.clear();
     records.innerHTML = '<h1>All records has been deleted</h1>';
  }
  bin.addEventListener("click", del);
  for(i=0;i<retrievedArray.length;i++){
     const newE = document.createElement('div');
     newE.innerHTML = `<div class="quiz-card">
         <div class="card-flex">
             <div class="icon"><img src="assets/user.png"></div>
             <div class="info">${retrievedArray[i]['Score']}/5</div>
         </div>
         <div class="detail">
             Name : ${retrievedArray[i]['name']}<br>
               tags : ${retrievedArray[i]['tags']} <br>
                difficulity : ${retrievedArray[i]['difficulity']}<br>
                date : ${retrievedArray[i]['date']} <br>
                time : ${retrievedArray[i]['time']}<br>
          </div>`;
     records.appendChild(newE); 
 }
}
else{
  newRecord.style,display = 'none';
}


