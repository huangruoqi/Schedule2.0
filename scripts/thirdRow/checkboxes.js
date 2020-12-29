function changeCheckbox() {
    const classData = data[6].classes;
    const finalClass = document.getElementById('checkboxList');
    removeAllChildNodes(finalClass);
    for (var i = 0; i < classData.length; i++) {
        const input = document.createElement('input');
        input.className = "cb";
        input.type = "checkbox";
        input.style.margin = convertHeight(0.2);
        input.style.padding = convertHeight(0.2);

        input.id = "box" + (i + 1);
        finalClass.appendChild(input);
        const label = document.createElement('label');
        label.setAttribute("for", "box" + (i + 1));
        label.style.margin = convertHeight(0.2);
        label.style.padding = convertHeight(0.2);
        label.appendChild(document.createTextNode(classData[i]));
        label.style.fontSize = convertHeight(1.1)
        finalClass.appendChild(label);
    }

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
    for (var i = 0; i < 2; i++) {
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

    const spaces = document.getElementsByClassName('space3');
    for (var i = 0;i<spaces.length;i++) {
        spaces[i].style.height = convertHeight(14);
    }
}

db.collection('Homework').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        checkOrUncheck(doc);
    })
})

function checkOrUncheck(doc) {
    if (doc.data().isFinished) {
        const cb = document.getElementById(doc.data().id);
        if (cb) {
            cb.checked = true;
            cb.disabled = true;
        }

    }
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
