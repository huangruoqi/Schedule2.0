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
let order = [];
const inputFile = document.getElementById("inputfile");








async function createPDF() {
    const finalPdf = await PDFLib.PDFDocument.create();
    for (let i = 0; i < order.length; i++) {
        const p = pdfFiles[order[i]].pdf;
        const pages = await finalPdf.copyPages(p, p.getPageIndices());
        for (const page of pages) {
            await finalPdf.addPage(page);
        }
    }
    const pdfDataUri = await finalPdf.saveAsBase64({ dataUri: true });
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
        files = input.files;

        for (const file of files) {
            pdfFiles.push(new PdfFile(file))
            await pdfFiles[pdfFiles.length - 1].setPdf();
            changePDFCombine();
        }

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
            }).
            then(element => {
                clearFiles();
                console.log(order);
            })
    })
    container1.appendChild(create);
    form.appendChild(container1);
    ac.appendChild(form);
    const fileList = document.createElement('div');
    fileList.className = "fileList";

    for (let i = 0; i < pdfFiles.length; i++) {
        const temp = document.createElement('div');
        temp.id = "file" + i;
        temp.className = "file-container"
        temp.addEventListener("click", element => {
            if (order.indexOf(i) == -1) {
                order.push(i);
            }
        })
        const inside = document.createElement('a');

        let s = pdfFiles[i].file.name;
        s = s.substring(0, s.length - 4);
        if (s.length > 15) {
            s = s.substring(0, 12) + "...";
        }
        inside.appendChild(document.createTextNode(s)); // remove ".pdf"

        temp.appendChild(inside);
        fileList.appendChild(temp);
    }
    ac.appendChild(fileList)

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
        clearFiles();
    })
    container4.appendChild(clear);
    edit.appendChild(container4);

    const container3 = document.createElement('div');
    const back = document.createElement('a');

    container3.id = "back-container";
    back.id = "back";
    back.style.float = "left";
    back.style.display = "block";
    back.appendChild(document.createTextNode("Backspace"));
    back.addEventListener('click', element => {
        popFile()
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
    order.splice(0, pdfFiles.length);
    changePDFCombine()
}

function popFile() {
    if (order.length > 0) {
        order.pop();
    } else if(pdfFiles.length) {
        pdfFiles.pop();
    }
    changePDFCombine()
}
