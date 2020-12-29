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
var files
var pdfFiles = [];
const inputFile = document.getElementById("inputfile");
inputFile.addEventListener("change", element => {
    files = inputFile.files;
    for (const file of files) {
        pdfFiles.push(new PdfFile(file))
        pdfFiles[pdfFiles.length - 1].setPdf().then(element => {
            console.log(element);
        })
    }
})

const button1 = document.getElementById('upload');
button1.addEventListener("click", element => {

    

})

const button2 = document.getElementById('create');
button2.addEventListener("click", element => {
    createPDF();

})


function changePDFCombine() {
    const
}




async function createPDF() {
    const finalPdf = await PDFLib.PDFDocument.create();
    for (var i = 0; i < pdfFiles.length; i++) {
        const p = pdfFiles[i].pdf;
        const pages = await finalPdf.copyPages(p, p.getPageIndices());
        for (const page of pages) {
            finalPdf.addPage(page);
        }
    }
    const pdfDataUri = await finalPdf.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
}
