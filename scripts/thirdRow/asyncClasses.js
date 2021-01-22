var currentAsyncClass = 0;

function changeAsyncClasses() {
    const ac = document.getElementsByClassName('asyncClasses')[0];
    ac.style.height = convertHeight(14);
    changeAsync1();
    changeAsync2();
    changeAsync3();
    
}

function changeAsync1() {
    const asyncClasses = data[5].classes;
    const final = document.getElementsByClassName('async1')[0];
    removeAllChildNodes(final);
    const numOfAsync = asyncClasses.length;
    const heightPercent = 100.0/numOfAsync;
    for (let i = 0 ;i<numOfAsync;i++) {
        final.appendChild(getAsyncClassButton(asyncClasses[i].name+asyncClasses[i].number, heightPercent,i))
    }
}

function getAsyncClassButton(name, height, index) {
    const temp = document.createElement('div');
    temp.className = "asyncClassButton";
    temp.style.height = height+"%";
    const button = document.createElement('a');
    button.appendChild(document.createTextNode(name));
    button.className = "show3";
    button.style.padding = convertHeight(1);
    button.style.borderRadius = convertHeight(0.3);
    button.style.fontSize = convertHeight(1.3);
    button.addEventListener('click', element => {
        currentAsyncClass = index;
        console.log(index);
        changeAsync2();
        changeAsync3();
    })
    temp.appendChild(button);
    return temp;
}

function changeAsync2() {
    const canvas = document.getElementById('lines');    
    const c = canvas.getContext('2d');
    const numOfAsync = data[5].classes.length;
    const numOfStuff = data[5].classes[currentAsyncClass].stuff.length;
    const h = 150;
    let interval = h/numOfAsync/2;
    let startY = interval*(2*currentAsyncClass+1);
    let endY;
    c.clearRect(0, 0, canvas.width, canvas.height);


    c.beginPath();
    c.moveTo(1,startY);
    c.lineTo(100,startY);
    c.lineWidth = 3;
    c.stroke();
    c.closePath();
    
    c.beginPath();
    interval = h/numOfStuff/2;
    endY = h-interval;
    if (endY<interval) {
        endY = interval;
    }
    if (startY>interval) {
        startY = interval;
    }
    
    c.moveTo(100, startY-1.5);
    c.lineTo(100, endY+1.5);
    c.lineWidth = 14;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.lineWidth = 3;
    for (let i = 0;i<numOfStuff;i++) {
        c.moveTo(100,startY+i*interval*2);
        c.lineTo(300,startY+i*interval*2);
    }
    


    c.stroke();
    c.closePath();
}
function changeAsync3() {
    const currentStuff = data[5].classes[currentAsyncClass].stuff;
    const final = document.getElementsByClassName('async3')[0];
    removeAllChildNodes(final);
    const numOfStuff = currentStuff.length;
    
    const heightPercent = 100.0/numOfStuff;
    
    for (let i = 0; i< numOfStuff;i++) {
        final.appendChild(getAsyncStuffButton(currentStuff[i], heightPercent));
    }
}

function getAsyncStuffButton(stuff, height) {
    const temp = document.createElement('div');
    temp.className = "asyncStuffButton";
    temp.style.height = height+"%";
    const button = document.createElement('a');
    button.appendChild(document.createTextNode(stuff.name));
    button.className = "show4";
    button.style.padding = convertHeight(.7);
    button.style.borderRadius = convertHeight(0.5);
    button.style.fontSize = convertHeight(1.5);
    button.href = stuff.link;
    button.target = "_blank";
    temp.appendChild(button);
    return temp;
}
