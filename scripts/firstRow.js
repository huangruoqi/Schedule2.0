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
    for (let i = 0; i < bor.length; i++) {
        bor[i].style.height = convertHeight(1.43);
    }

    for (let i = 0; i < 4; i++) {
        if (i != 0) {
            const freeSpace = document.createElement('a');
            freeSpace.className = "space1";
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
            tempClass.className = "free1";
            finalClass.appendChild(tempClass);
        }
    }

    const frees = document.getElementsByClassName('free1');
    for (let i = 0;i<frees.length;i++) {
        frees[i].style.height = convertHeight(14);
    }
    const spaces = document.getElementsByClassName('space1');
    for (let i = 0;i<spaces.length;i++) {
        spaces[i].style.height = convertHeight(14);
    }
}