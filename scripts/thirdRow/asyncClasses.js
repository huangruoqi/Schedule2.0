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
    const final = document.getElementsByClassName('async2')[0];


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
    temp.appendChild(button);
    return temp;
}