function changeStuff() {
    const classData = data[day].classes;
    const finalClass = document.getElementsByClassName('stuff')[0];
    removeAllChildNodes(finalClass);
    for (let i = 0; i < 4; i++) {
        if (i != 0) {
            const freeSpace = document.createElement('a');
            freeSpace.style.height = convertHeight(14);
            freeSpace.className = "space2";
            finalClass.appendChild(freeSpace);
        }
        if (i < classData.length) {
            const stuffData = classData[i].stuff;

            const tempClass = document.createElement('a');
            tempClass.style.height = convertHeight(14);
            tempClass.className = "show2";
            for (let j = 0; j < 4; j++) {
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
            tempClass.className = "free2";
            finalClass.appendChild(tempClass);
        }
    }

    const frees = document.getElementsByClassName('free2');
    for (let i = 0;i<frees.length;i++) {
        frees[i].style.height = convertHeight(14);
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