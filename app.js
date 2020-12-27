window.addEventListener('resize', element => {
    start();
})

const defaultDay = 1;
var days = ["MON", "TUE", "WED", "THU", "FRI"];
const navButtons = document.getElementsByClassName('navButton');
const array = [0, 1, 2, 3, 4];
var day = (new Date()).getDay() - 1;
if (day < 0 || day > 4) {
    day = defaultDay;
}

let data;
fetch("./assets/days.json")
    .then(res => res.json())
    .then(res => {
        data = res;
    })
    .then(res => {
        start();
    })



function convertHeight(n) {
    return window.innerWidth / 1600.0 * n + "rem";
}

function changeNavbar() {
    const nav = document.getElementsByClassName("navbar")[0];
    removeAllChildNodes(nav);

    for (var i = 0; i < days.length; i++) {
        var temp = document.createElement('a');
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

function changeContent() {
    const bg = document.body.style;
    changeClasses();
    changeStuff();
    changeHw();
}

function changeClasses() {
    const classData = data[day].classes;
    const finalClass = document.getElementsByClassName("classes")[0];
    removeAllChildNodes(finalClass);
    const cat = document.getElementsByClassName("category");
    cat[0].style.height = convertHeight(14);
    cat[0].style.color = "rgb(205,205,205)";
    cat[0].style.fontSize = convertHeight(1.15);
    cat[2].style.height = convertHeight(14);
    cat[2].style.color = "rgb(205,205,205)";
    cat[2].style.fontSize = convertHeight(1.15);
    cat[1].style.height = convertHeight(14);
    cat[1].style.color = "rgb(0,0,0)";
    cat[1].style.fontSize = convertHeight(1.15);
    const bor = document.getElementsByClassName('borderline');
    for (var i = 0; i < bor.length; i++) {
        bor[i].style.height = convertHeight(0.5);
    }

    for (var i = 0; i < 4; i++) {
        if (i != 0) {
            const freeSpace = document.createElement('a');
            freeSpace.style.height = convertHeight(14);
            freeSpace.className = "space";
            finalClass.appendChild(freeSpace);
        }
        if (i < classData.length) {
            const tempClass = document.createElement('a');
            tempClass.style.height = convertHeight(14);
            tempClass.className = "show1";
            tempClass.style.borderRadius = convertHeight(3)
            const t1 = document.createElement('h1');
            t1.style.fontSize = convertHeight(2.5);
            t1.appendChild(document.createTextNode(classData[i].name));
            tempClass.appendChild(t1);
            const t2 = document.createElement('h1');
            t2.style.fontSize = convertHeight(2.5);
            t2.appendChild(document.createTextNode(classData[i].number));
            tempClass.appendChild(t2);
            const t3 = document.createElement('h2');
            t3.style.fontSize = convertHeight(1.2);
            t3.appendChild(document.createTextNode(classData[i].time));
            tempClass.appendChild(t3);
            tempClass.href = classData[i].zoomLink;
            tempClass.target = "_blank";
            const t4 = document.createElement('h3');
            t4.style.fontSize = convertHeight(1);
            t4.appendChild(document.createTextNode(classData[i].password));
            tempClass.appendChild(t4);
            finalClass.appendChild(tempClass);
        } else {
            const tempClass = document.createElement('a');
            tempClass.style.height = convertHeight(14);
            tempClass.className = "free";
            tempClass.appendChild(document.createElement('h1'));
            tempClass.appendChild(document.createElement('h1'));
            tempClass.appendChild(document.createElement('h2'));
            tempClass.appendChild(document.createElement('h3'));
            finalClass.appendChild(tempClass);
        }
    }
}

function changeStuff() {
    const classData = data[day].classes;
    const finalClass = document.getElementsByClassName('stuff')[0];
    removeAllChildNodes(finalClass);
    for (var i = 0; i < 4; i++) {
        if (i != 0) {
            const freeSpace = document.createElement('a');
            freeSpace.style.height = convertHeight(14);
            freeSpace.className = "space";
            finalClass.appendChild(freeSpace);
        }
        if (i < classData.length) {
            const stuffData = classData[i].stuff;

            const tempClass = document.createElement('a');
            tempClass.style.height = convertHeight(14);
            tempClass.className = "show2";
            for (var j = 0; j < 4; j++) {
                tempClass.appendChild(get_L_img(25 + (j + 1) * 3.3));
                if (j < stuffData.length) {
                    tempClass.appendChild(getButton(75 - (j + 1) * 3.3, stuffData[j].name, stuffData[j].link));
                }
                else {
                    tempClass.appendChild(getButton(75 - (j + 1) * 3.3));
                }
            }
            finalClass.appendChild(tempClass);
        }
        else {
            const tempClass = document.createElement('a');
            tempClass.className = "free";
            tempClass.appendChild(document.createElement('h1'));
            tempClass.appendChild(document.createElement('h1'));
            tempClass.appendChild(document.createElement('h2'));
            tempClass.appendChild(document.createElement('h3'));
            finalClass.appendChild(tempClass);
        }
    }
}

function get_L_img(w) {
    const temp = document.createElement('div');
    temp.style.width = w + "%";

    temp.style.height = convertHeight(3.5);
    temp.style.textAlign = "right";
    temp.style.float = "left";
    const img = document.createElement('img');
    img.src = "./assets/left.png";
    img.style.width = convertHeight(3.5);
    temp.appendChild(img);
    return temp;
}

function getButton(w, name, link) {
    const temp = document.createElement('div');
    temp.style.width = w + "%";
    temp.style.height = convertHeight(3.5);
    temp.style.float = "left";
    temp.style.textAlign = "left";
    const button = document.createElement('a');
    button.style.width = convertHeight(11);
    button.style.height = convertHeight(0.95);

    if (link != undefined) {
        button.id = "stuffButton";
        button.href = link;
        button.target = "_blank";
        button.appendChild(document.createTextNode(name));
        button.style.borderRadius = convertHeight(0.4);
        button.style.fontSize = convertHeight(1.8);
        button.style.paddingTop = convertHeight(1.2);
        button.style.paddingBottom = convertHeight(1.2);
        button.style.marginLeft = convertHeight(0.3);
        button.style.marginRight = convertHeight(0.3);
    }
    temp.appendChild(button);
    return temp;
}

function changeHw() {
    const classData = data[6].classes;
    const finalClass = document.getElementById('checkboxList');
    removeAllChildNodes(finalClass);
    for (var i = 0; i < classData.length; i++) {
        const input = document.createElement('input');
        input.className = "cb";
        input.type = "checkbox";
        input.id = "box" + (i + 1);
        finalClass.appendChild(input);
        const label = document.createElement('label');
        label.setAttribute("for", "box" + (i + 1));
        label.appendChild(document.createTextNode(classData[i]));
        label.style.fontSize = convertHeight(1.1)



        finalClass.appendChild(label);
    }
    db.collection('Homework').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            checkOrUncheck(doc);
        })
    })

    const buttons = document.getElementById('checkboxList');
    buttons.style.height = convertHeight(14);
    const SandC = document.getElementById('sButtonAndcButton');
    SandC.style.height = convertHeight(14);
    const hw = document.getElementsByClassName('checkboxes')[0];
    hw.style.height = convertHeight(14);
    const free = document.getElementById('checkboxFree');
    free.style.height = convertHeight(14);
    const btns = document.getElementsByClassName("btn");
    const cirs = document.getElementsByClassName("circle");
    for (var i = 0;i<2;i++) {
        btns[i].style.width = convertHeight(4);
        btns[i].style.height = convertHeight(2);
        btns[i].style.borderRadius = convertHeight(.6);
        btns[i].style.borderRadius = convertHeight(.6);
        btns[i].style.fontSize = convertHeight(1);
        btns[i].style.paddingBottom = convertHeight(.6);
        btns[i].style.paddingTop = convertHeight(.6);
        btns[i].style.fontSize = convertHeight(1.2);
        btns[i].style.margin = convertHeight(1);
        cirs[i].style.width = convertHeight(4);
        cirs[i].style.height = convertHeight(3);

    }

}

function checkOrUncheck(doc) {
    if (doc.data().isFinished) {

        const cb = document.getElementById(doc.data().id);
        if (cb) {
            cb.checked = true;
            cb.disabled = true;
        }

    }
}

function changeExtra() {
    const snowflakes = document.getElementsByClassName("snowflakes")[0];
    snowflakes.style.fontSize = convertHeight(2);
}


const submit = document.getElementById('submitButton');
submit.addEventListener('click', element => {
    const cb = document.getElementsByClassName('cb');

    for (var i = 0; i < cb.length; i++) {
        const doc = db.collection('Homework').doc(cb[i].id);
        if (cb[i].checked) {
            cb[i].disabled = true;
        }
        doc.update({
            'isFinished': cb[i].checked
        })
    }
})


const clear = document.getElementById('clearButton');
clear.addEventListener('click', element => {
    const cb = document.getElementsByClassName('cb');
    for (var i = 0; i < cb.length; i++) {
        cb[i].disabled = false;
        cb[i].checked = false;
    }
})

function start() {
    changeExtra();
    changeNavbar();
    changeContent();
}


