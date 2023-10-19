const questions=[
    {
        question:"which is largest animal in the world?",
        answer:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
            
        ]
    },
    {
        question:"which is smallest country in the world?",
        answer:[
            {text:"vatican city",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri Lanka",correct:false},
            
        ]

    },
    {
        question:"which is largest desert in the world?",
        answer:[
            {text:"kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
            
        ]

    },
    {
        question:"which is smallest continent in the world?",
        answer:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
            
        ]
    }
];

const questionElement=document.getElementById("question");
const answerbutton=document.getElementById("answer-buttons");
const nextbutton=document.getElementById("next-btn");

let currentquestionindex=0;
let score=0;

function startquiz(){
    
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionno=currentquestionindex+1;
    questionElement.innerHTML=questionno+". "+currentquestion.question;

    currentquestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        

        button.addEventListener("click",selectanswer);
    });
}
function resetstate(){
    nextbutton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";

}


function showscore(){
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="play Again";
    nextbutton.style.display="block";
}

function handlnextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}
nextbutton.addEventListener('click',()=>{
    if(currentquestionindex<questions.length){
        handlnextbutton();
    }
    else{
        startquiz();
    }
});



startquiz();