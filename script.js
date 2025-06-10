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

const symbols = '!@#$%&*';

let password = "";
let passwordLength = 5;
let checkCount = 1;


function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
  
}

handleSlider();

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

function getrandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateNum() {
    return getrandInt(0, 10).toString();
}

function generateLcase() {
    return String.fromCharCode(getrandInt(97, 123));
}

function generateUcase() {
    return String.fromCharCode(getrandInt(65, 91));
}

function generateSymbol() {
    const randSym = getrandInt(0, symbols.length);
    return symbols.charAt(randSym);
}

function shufflePassword(pwd) {
    return pwd.split('').sort(() => Math.random() - 0.5).join('');
}


function setIndicator(color) {
    indicator.style.backgroundColor = color;
}


function strength() {
    let ucase = uppercaseCheck.checked;
    let lcase = lowercaseCheck.checked;
    let num = numberCheck.checked;
    let sym = symbolCheck.checked;

    if (ucase && lcase && num && sym && passwordLength >= 8) {
        setIndicator('#0f0'); 
    } else if ((ucase || lcase) && (num || sym) && passwordLength >= 6) {
        setIndicator('#ff0'); 
    } else {
        setIndicator('#f00'); 
    }
}


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


function handleCheckBoxChange() {
    checkCount = 0;
    allChecks.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}


allChecks.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) copyContent();
});


generator.addEventListener('click', () => {
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    let funcArr = []; 

    if (lowercaseCheck.checked) funcArr.push(generateLcase);
    if (uppercaseCheck.checked) funcArr.push(generateUcase);
    if (numberCheck.checked) funcArr.push(generateNum);
    if (symbolCheck.checked) funcArr.push(generateSymbol);

   
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

   
    for (let i = funcArr.length; i < passwordLength; i++) {
        let randIndex = getrandInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }

   
    password = shufflePassword(password);
    

    
    passwordDisplay.value = password;
    strength();
});

