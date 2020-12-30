class PdfFile {
    constructor(file) {
        this.file = file;
        this.pdf = null;
        this.reader = new FileReader();
    }

    async setPdf() {
        function isReady(r) {
            return new Promise((resolve, reject) => {
                r.addEventListener("load", () => {
                    resolve(r.result);
                }, false);
            })
        }
        this.reader.readAsDataURL(this.file)
        let a = await isReady(this.reader)
        this.pdf = await PDFLib.PDFDocument.load(a)
        return this
    }


}

let pdfFiles = [];
let selected = [];
let order = [];

const inputFile = document.getElementById("inputfile");








async function createPDF() {
    if (selected.length != 0) {
        for (file of selected) {
            order.push(file);
        }
        clearFiles();
        clearSelect();
    }
    const finalPdf = await PDFLib.PDFDocument.create();
    let pages;
    for (let i = 0; i < order.length; i++) {
        const p = order[i].pdf;
        pages = await finalPdf.copyPages(p, p.getPageIndices());
        for (const page of pages) {
            await finalPdf.addPage(page);
        }
    }
    const pdfDataUri = await finalPdf.saveAsBase64({ dataUri: true });
    clearOrder();
    return pdfDataUri;
}

function changePDFCombine() {
    const ac = document.getElementsByClassName('pdfCombine')[0];
    removeAllChildNodes(ac);
    ac.style.height = convertHeight(14);

    const form = document.createElement('form');
    form.className = "input";
    form.method = "post";
    form.enctype = "multipart/form-data";
    form.style.float = "left";
    form.style.fontSize = convertHeight(1.1);

    const input = document.createElement('input');


    input.type = "file";
    input.id = "getFile";
    input.style.display = "none";


    input.addEventListener("change", async element => {
        clearFiles();
        if (selected.length != 0) {
            for (file of selected) {
                order.push(file);
            }
            clearSelect();
        }
        for (let i = 0; i < input.files.length; i++) {
            if (i == 9) {
                break;
            }
            pdfFiles.push(new PdfFile(input.files[i]))
            await pdfFiles[pdfFiles.length - 1].setPdf();
        }

        changePDFCombine();
    })

    input.multiple = true;
    form.appendChild(input);

    const button = document.createElement("a");
    const container2 = document.createElement('div');
    container2.id = "input-container";
    button.id = "inputfile";
    button.style.float = "left";
    button.style.display = "block";
    button.appendChild(document.createTextNode("Select PDFs"));
    button.addEventListener('click', element => {
        document.getElementById('getFile').click();
    })

    container2.appendChild(button);
    form.appendChild(container2);


    const container1 = document.createElement('div');
    const create = document.createElement('a');
    container1.id = "create-container";
    create.id = "create";
    create.style.float = "left";
    create.appendChild(document.createTextNode("Create"));
    create.addEventListener("click", element => {
        createPDF().
            then(data => {
                return fetch(data)
            }).
            then(res => res.blob()).
            then(blob => {
                downloadFile(blob, "combinedPDF.pdf")
            })
    })
    container1.appendChild(create);
    form.appendChild(container1);
    ac.appendChild(form);
    const fileList = document.createElement('div');
    fileList.style.fontSize = convertHeight(1.1);
    fileList.className = "fileList";

    for (let i = 0; i < pdfFiles.length; i++) {
        const temp = document.createElement('div');
        temp.id = "file" + i;
        temp.className = "file-container"
        temp.addEventListener("click", element => {
            selected.push(pdfFiles[i]);
            pdfFiles.splice(i, 1);
            changePDFCombine();
        })
        const inside = document.createElement('a');

        let s = pdfFiles[i].file.name;
        s = s.substring(0, s.length - 4);
        if (s.length > 13) {
            s = s.substring(0, 10) + "...";
        }
        inside.appendChild(document.createTextNode(s)); // remove ".pdf"

        temp.appendChild(inside);
        fileList.appendChild(temp);
    }
    ac.appendChild(fileList)

    const total = document.createElement('div');
    const container6 = document.createElement('div');
    total.className = "total";
    total.style.fontSize = convertHeight(1.3);
    const a = document.createElement('a');
    a.style.paddingTop = convertHeight(2)
    a.appendChild(document.createTextNode("Total: "+ (order.length + selected.length)));
    container6.style.width = "100%";
    container6.style.height = "70%";
    container6.style.float = "left";

    a.style.float = "left"
    container6.appendChild(a);

    total.appendChild(container6);
    

    const container5 = document.createElement('div');
    const reset = document.createElement('a');
    container5.id = "reset-container";
    reset.id = "reset";
    reset.style.float = "left";
    reset.appendChild(document.createTextNode("Reset"));
    reset.addEventListener("click", element => {
        clearSelect();
        clearOrder();
        changePDFCombine()
    })
    container5.appendChild(reset);
    total.appendChild(container5);

    ac.appendChild(total);


    const edit = document.createElement('div');
    edit.className = "edit";
    edit.style.float = "left";
    edit.style.fontSize = convertHeight(1.1);


    const container4 = document.createElement('div');
    const clear = document.createElement('a');
    container4.id = "clear-container";
    clear.id = "clear";
    clear.style.float = "left";
    clear.appendChild(document.createTextNode("Clear"));
    clear.addEventListener("click", element => {
        clearFiles()
        if (selected.length != 0) {
            for (file of selected) {
                order.push(file);
            }
            clearSelect();
        }
        changePDFCombine()
    })
    container4.appendChild(clear);
    edit.appendChild(container4);

    const container3 = document.createElement('div');
    const back = document.createElement('a');

    container3.id = "back-container";
    back.id = "back";
    back.style.float = "left";
    back.style.display = "block";
    back.appendChild(document.createTextNode("Undo"));
    back.addEventListener('click', element => {
        undoSelect()
        changePDFCombine()
    })

    container3.appendChild(back);
    edit.appendChild(container3);



    ac.appendChild(edit);






}



function downloadFile(blob, fileName) {
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};

function clearFiles() {
    pdfFiles.splice(0, pdfFiles.length);
}

function clearSelect() {
    selected.splice(0, selected.length);
}
function clearOrder() {
    order.splice(0, order.length);
}

function undoSelect() {
    if (selected.length > 0) {
        pdfFiles.push(selected.pop());
    }
}
