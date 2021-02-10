
window.addEventListener('load', element => {
    fetch("./assets/days.json")
    .then(res => res.json())
    .then(res => {
        data = res;
    })
    .then(res => {
        start();
        window.addEventListener('resize', element => {
            start();
        })
    })
})


function start() {
    convert();
    changeExtra();
    changeNavbar();
    changeContent();
}

let ratio;
function convert() {
    ratio = window.innerWidth / 1600.0;
}

function convertHeight(n) {
    return ratio * n + "rem";
}

const defaultDay = 2;
let days = ["MON", "TUE", "WED", "THU", "FRI"];
const navButtons = document.getElementsByClassName('navButton');
const array = [0, 1, 2, 3, 4];
//let day = (new Date()).getDay() - 1;
if (day < 0 || day > 4) {
    day = defaultDay;
}

let data;


function changeNavbar() {
    const nav = document.getElementsByClassName("navbar")[0];
    removeAllChildNodes(nav);

    for (let i = 0; i < days.length; i++) {
        let temp = document.createElement('a');
        const text = document.createTextNode(days[i]);
        temp.appendChild(text);
        temp.className = "navButton";
        if (day == i) {
            const special = document.createElement('div');
            special.appendChild(temp);
            special.className = "special";
            temp = special;
        }
        nav.appendChild(temp);
    }
    array.forEach(element => {
        navButtons[element].addEventListener('click', ele => {
            changeDay(element);
            start();
        })
    });
}

function changeDay(element) {
    day = element;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function changeExtra() {

    const spaces = document.getElementsByClassName('space') 
    for (let i = 0;i<spaces.length;i++) {
        spaces[i].style.height = convertHeight(14);
    }
    const snowflakes = document.getElementsByClassName("snowflakes")[0];
    snowflakes.style.fontSize = convertHeight(2);

    const borderLabel = document.getElementsByClassName('borderline')[2];
    borderLabel.style.fontSize = convertHeight(1.4);
    
}

function changeContent() {
    changeClasses();
    changeStuff();
    changeHw();
}

function changeHw() {
    changeCheckbox();
    changeAsyncClasses();
    changePDFCombine();
    changeFileUpload(); 
}

