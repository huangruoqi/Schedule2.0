function URLAndName(url, name) {
    this.url = url;
    this.name = name;
    this.equals = n=> {
        return n.name.localeCompare(this.name)==0
    }
}

var uploadedFileList = [];
var isDeleting = false;
const d = document.getElementsByClassName("dd")[0];
d.addEventListener('click', element => {
    isDeleting = !isDeleting;
    setDownloadOrDelete();
    setupFileList()
})
const u = document.getElementsByClassName("uu")[0];
u.addEventListener('click', element => {
    document.getElementById('uploadInput').click();
})



function changeFileUpload() {
    const ac = document.getElementsByClassName('fileUpload')[0];
    ac.style.height = convertHeight(14);
    getUploadedFiles()
    setDownloadOrDelete();
    setUpload();

}

function setupFileList() {
    const fileList = document.getElementsByClassName("uploadedFiles")[0];
    removeAllChildNodes(fileList);
    fileList.style.fontSize = convertHeight(1);
    for (let i = 0; i < uploadedFileList.length; i++) {
        if (i == 12) { break }
        const temp = document.createElement('div');
        temp.className = "upload-container"
        temp.addEventListener("click", e => {
            deleteOrDownloadFile(uploadedFileList[i]);
        })
        let s = uploadedFileList[i].name;
        if (s.length > 15) {
            s = s.substring(0, 12) + "...";
        }

        if (isDeleting) {
            temp.classList.remove("HoverClassRed", "HoverClassGreen");
            temp.classList.add('HoverClassRed')
        } else {
            temp.classList.remove("HoverClassRed", "HoverClassGreen");
            temp.classList.add('HoverClassGreen')
        }
        const inside = document.createElement('a');
        inside.appendChild(document.createTextNode(s)); // remove ".pdf"

        temp.appendChild(inside);
        fileList.appendChild(temp);
    }
}

function AddSingleFileToList(file) {
    const fileList = document.getElementsByClassName("uploadedFiles")[0];
    fileList.style.fontSize = convertHeight(1);
    if (uploadedFileList.length > 12) return

    const temp = document.createElement('div');
    temp.className = "upload-container"
    temp.addEventListener("click", e => {
        deleteOrDownloadFile(file);
    })
    let s = file.name;
    if (s.length > 15) {
        s = s.substring(0, 12) + "...";
    }
    if (isDeleting) {
        temp.classList.remove("HoverClassRed", "HoverClassGreen");
        temp.classList.add('HoverClassRed')
    } else {
        temp.classList.remove("HoverClassRed", "HoverClassGreen");
        temp.classList.add('HoverClassGreen')
    }
    const inside = document.createElement('a');
    inside.appendChild(document.createTextNode(s)); // remove ".pdf"

    temp.appendChild(inside);
    fileList.appendChild(temp);
}

function setDownloadOrDelete() {
    const d = document.getElementsByClassName("dd")[0];

    d.classList.remove("deleteOrDownloadRed", "deleteOrDownloadGreen");
    d.classList.remove("HoverClassRed", "HoverClassGreen");
    const text = document.getElementsByClassName('dd-text')[0];

    removeAllChildNodes(text)
    if (isDeleting) {
        d.classList.add("deleteOrDownloadRed", 'HoverClassRed');
        text.appendChild(document.createTextNode("Delete"))
        text.style.fontSize = convertHeight(1.3)
    } else {
        d.classList.add("deleteOrDownloadGreen", 'HoverClassGreen');
        text.appendChild(document.createTextNode("Download"))
        text.style.fontSize = convertHeight(1.15)
    }
}

function setUpload() {
    const u = document.getElementsByClassName("uu")[0];
    const text = document.getElementsByClassName('uu-text')[0];
    removeAllChildNodes(text)
    text.appendChild(document.createTextNode("Upload"))
    text.style.fontSize = convertHeight(1.3)
    u.style.fontSize = convertHeight(1.3)
    const upload = document.getElementById("uploadInput");
    upload.addEventListener('change', async function () {
        for (let i = 0; i < upload.files.length; i++) {
            const name = "files/" + upload.files[i].name
            await storageRef.child(name).put(upload.files[i])
            await getSingleUploadedFile(name)
        }
    })
}

async function getUploadedFiles() {
    uploadedFileList.splice(0, uploadedFileList.length);
    const a = await storageRef.child("files").list();
    for (let i = 0; i < a.items.length; i++) {
        const path = a.items[i].location.path_;
        uploadedFileList.push(new URLAndName(await storageRef.child(path).getDownloadURL(), path.substring(6)));
        setupFileList();
    }
}

async function getSingleUploadedFile(name) {
    const a = new URLAndName(await storageRef.child(name).getDownloadURL(), name.substring(6))
    for (let i = 0; i < uploadedFileList.length; i++) {
        if (a.equals(uploadedFileList[i])) {
            console.log("repeat")
            return;
        }
    }
    uploadedFileList.push(a);
    AddSingleFileToList(a);
}


function deleteOrDownloadFile(file) {
    if (isDeleting) {
        deleteFile(file.name);
    } else {
        openFromUrl(file.url);
    }
}


function openFromUrl(url) {
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = url;
    link.target = "_blank";
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};

function deleteFile(name) {
    for (let i = 0; i < uploadedFileList.length; i++) {
        if (name.localeCompare(uploadedFileList[i].name) == 0) {
            uploadedFileList.splice(i, 1);
            break;
        }
    }

    storageRef.child("files").child(name).delete()
    setupFileList();
}
