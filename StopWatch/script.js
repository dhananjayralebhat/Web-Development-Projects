const playButton=document.getElementsByClassName("play")[0];
const lapButton=document.getElementsByClassName("lap")[0];
const resetButton=document.getElementsByClassName("reset")[0];
const clearButton=document.getElementsByClassName("lap-clear-button")[0];

const minute=document.getElementsByClassName("minute")[0];
const second=document.getElementsByClassName("sec")[0];
const centiSecond=document.getElementsByClassName("msec")[0];
const laps=document.getElementsByClassName("laps")[0];


let isPlay = false;
let secCounter=0;
let min;
let sec;
let centiSec;
let centiCounter=0;
let minCounter=0;
let lapItem=0;

let isreset= false;

const toggleButton=()=>{
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")

}
const play=()=>{
    if(!isPlay && !isreset){
        playButton.innerHTML='pause';
        min=    setInterval(()=>{
            if(minCounter===60){
                minCounter=0;
            }
                    minute.innerHTML= `${++minCounter} :&nbsp; `;
                },1000*60)
        sec=    setInterval(()=>{
            if(secCounter===60){
                secCounter=0;
            }
                    second.innerHTML= `${(secCounter < 9 ? '0' : '')+(++secCounter)}:&nbsp; `;
                },1000)
        centiSec =    setInterval(()=>{
            if(centiCounter===100){
                centiCounter=0;
            }
                centiSecond.innerHTML= `${(centiCounter< 9 ? '0' : '')+(++centiCounter)} `;
                },10)
        isPlay=true;
        isreset=true;
    }else{
        playButton.innerHTML='Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay=false;
        isreset=false;
        
    }
    toggleButton();
}



const reset= ()=>{
    isreset=true;
    play();
    
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    minute.innerHTML='00 :';
    second.innerHTML=' &nbsp00 :';
    centiSecond.innerHTML=' &nbsp00';
    minCounter   = 0
    secCounter = 0
    centiCounter = 0
}

const lap = () =>{
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class","lap-item");
    number.setAttribute("class","number");
    timestamp.setAttribute("class","time-stamp");

    number.innerText=`#${++lapItem}`;
    timestamp.innerHTML= `${minCounter} : ${(secCounter < 9 ? '0' : '')+(++secCounter)} : ${(centiCounter< 9 ? '0' : '')+(++centiCounter)}`;

    li.append(number, timestamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
}

const clearAll=()=>{
    laps.innerHTML="";
    laps.append(clearButton);
    clearButton.classList.add("hidden");
}
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearAll);