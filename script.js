const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector('[data-length]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#Ucase');
const lowercaseCheck = document.querySelector('#Lcase');
const numberCheck = document.querySelector('#num');
const symbolCheck = document.querySelector('#sym');
const indicator = document.querySelector('[data-indicator]');
const generator = document.querySelector('.generateBtn');
const allChecks = document.querySelectorAll('input[type=checkbox]');

const symbols='!@#$%&*'

let password = "";
let passwordLength = 5;
let checkCount = 1;

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

handleSlider();

function getrandInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
function genearteNum(){
    return getrandInt(0,9)
}
function generateLcase(){
    return String.fromCharCode(getrandInt(97,123))
}
function generateUcase(){
    return String.fromCharCode(getrandInt(65,91))
}
function generateSymbol(){
    const randSym=getrandInt(0,symbols.length)
    return symbols.charAt(randSym)
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function strength(){
    let ucase=false;
    let lcase=false;
    let num=false;
    let sym=false;

    if(uppercaseCheck.checked) ucase=true;
    if(lowercaseCheck.checked) lcase=true;
    if(numberCheck.checked) num=true;
    if(symbolCheck.checked) sym=true;

    if(ucase && lcase && num && sym && passwordLength >=8){
        setIndicator('#0f0')
    }else if(
        (lcase || ucase) && (num || sym) && passwordLength>=6
    ){
        setIndicator('#ff0')
    }else{
        setIndicator('#f00')
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied"
    } catch (error) {
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active")

    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000);
}

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})