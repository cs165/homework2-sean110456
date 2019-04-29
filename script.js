// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
const CHECKED = 'images/checked.png';
const checked_img1 = document.createElement('img');
const checked_img2 = document.createElement('img');
const checked_img3 = document.createElement('img');
checked_img1.src = checked_img2.src = checked_img3.src = CHECKED;
checked_img1.classList.add('checkbox');
checked_img2.classList.add('checkbox');
checked_img3.classList.add('checkbox');
let answer = ['','',''];
let result;
function changeBGColor(questionId, quesList){
    for(let q of quesList){
        q.style.backgroundColor = '#f4f4f4';
        q.style.opacity = 0.6;
    }
}
function onRestartClick(){
    answer = ['','',''];
    restart_flag = 1;
    const title = document.querySelector('header');
    title.scrollIntoView();
    checked_img1.classList.add('hidden');
    checked_img2.classList.add('hidden');
    checked_img3.classList.add('hidden');
    for(let choice of choices){
        choice.addEventListener('click',onClick);
        choice.style.opacity = 1;
        choice.style.backgroundColor = '#f4f4f4';
    }
    for(let c of cBoxes){
        c.classList.remove('hidden');
    }
    const ans_block = document.querySelector('#answer');
    ans_block.classList.add('hidden');
    const to_remove = document.querySelectorAll('.removeWhenRestart');
    for(let r of to_remove){
        r.remove();
    }
}
function score(){
    let sum = [];
    for(let i=0; i<9; i++)
        sum.push(0);
    const encode = {
        blep:0, happy:1, sleeping:2, dopey:3, burger:4, cart:5, nerd:6,
        shy:7, sleepy:8
    };
    for(a of answer){
        switch(a){
            case 'blep':
                sum[0]++;
                break;
            case 'happy':
                sum[1]++;
                break;
            case 'sleeping':
                sum[2]++;
                break;
            case 'dopey':
                sum[3]++;
                break;
            case 'burger':
                sum[4]++;
                break;
            case 'cart':
                sum[5]++;
                break;
            case 'nerd':
                sum[6]++;
                break;
            case 'shy':
                sum[7]++;
                break;
            case 'sleepy':
                sum[8]++;
                break;
                
        }
    }
    let max = 0;
    for(s of sum){
        if(s > max){
            max = s; 
        }
    }       
    if(max === 1){
        result = answer[0];
    }
    else{
        if(sum.indexOf(max) === encode[answer[0]])
            result = answer[0];
        else if(sum.indexOf(max) === encode[answer[1]])
            result = answer[1];
        else
            result = answer[2];
    }
    //console.log(result);
    const ans_block = document.querySelector('#answer');
    const newHeader = document.createElement('h1');
    newHeader.textContent = 'You got: '+RESULTS_MAP[result].title;
    newHeader.classList.add('removeWhenRestart');
    const newContent = document.createElement('p');
    newContent.textContent = RESULTS_MAP[result].contents;
    newContent.classList.add('removeWhenRestart');
    const button = document.createElement('div');
    button.textContent = 'Restart quiz';
    button.classList.add('button');
    button.classList.add('removeWhenRestart');
    button.addEventListener('click',onRestartClick);
    ans_block.appendChild(newHeader);    
    ans_block.appendChild(newContent);
    ans_block.appendChild(button);
}
function onClick(event){
    const curr = event.currentTarget;    
    if(curr.dataset.questionId === 'one'){
        changeBGColor(curr.dataset.questionId,q1);  
        for(let c of c1){
            c.classList.remove('hidden');
        } 
        const s = '[data-choice-id=' +'"'+curr.dataset.choiceId+'"]' +'[data-question-id="one"]' 
                    +' .checkbox';
        const t = document.querySelector(s);  
        t.classList.add('hidden');  
        checked_img1.classList.remove('hidden');
        curr.appendChild(checked_img1);
        answer.splice(0,1);
        answer.splice(0,0,curr.dataset.choiceId);
    }
    if(curr.dataset.questionId === 'two'){
        changeBGColor(curr.dataset.questionId,q2); 
        for(let c of c2){
            c.classList.remove('hidden');
        }  
        const s = '[data-choice-id=' +'"'+curr.dataset.choiceId+'"]' +'[data-question-id="two"]' 
                    +' .checkbox';
        const t = document.querySelector(s);  
        t.classList.add('hidden');  
        checked_img2.classList.remove('hidden');
        curr.appendChild(checked_img2); 
        answer.splice(1,1);
        answer.splice(1,0,curr.dataset.choiceId);
    }
    if(curr.dataset.questionId === 'three'){
        changeBGColor(curr.dataset.questionId,q3);
        for(let c of c3){
            c.classList.remove('hidden');
        }    
        const s = '[data-choice-id=' +'"'+curr.dataset.choiceId+'"]' +'[data-question-id="three"]' 
                    +' .checkbox';
        const t = document.querySelector(s);  
        t.classList.add('hidden');  
        checked_img3.classList.remove('hidden');
        curr.appendChild(checked_img3);
        answer.splice(2,1);
        answer.splice(2,0,curr.dataset.choiceId);
    }
    curr.style.backgroundColor = '#cfe3ff';
    curr.style.opacity = 1;
    //check whether the quiz is done
    let done = true;
    for(let a of answer){
        if(a === '')
            done = false;
    } 
    if(done === true){
        for(choice of choices){
            choice.removeEventListener('click',onClick);
        }
        const ans_block = document.querySelector('#answer');
        ans_block.classList.remove('hidden');
        score();
    }
}
const choices = document.querySelectorAll('.choice-grid div');
const cBoxes = document.querySelectorAll('.choice-grid .checkbox');
const q1 = [];
const q2 = [];
const q3 = [];
const c1 = [];
const c2 = [];
const c3 = [];
for(let choice of choices){
    choice.addEventListener('click',onClick);
    if(choice.dataset.questionId === 'one'){
        q1.push(choice);
    }
    if(choice.dataset.questionId === 'two'){
        q2.push(choice);
    }
    if(choice.dataset.questionId === 'three'){
        q3.push(choice);
    }
}
for(let i=0; i<cBoxes.length; i++){
    if(i<9){
        c1.push(cBoxes[i]);
    }
    else if(i<18){
        c2.push(cBoxes[i]);
    }
    else{
        c3.push(cBoxes[i]);
    }
}