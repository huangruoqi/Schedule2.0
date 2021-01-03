function URLAndName(url, name) {
    this.url = url;
    this.name = name;
}
var uploadedFileList;
var isDeleting = false;
function changeFileUpload() {
    const ac = document.getElementsByClassName('fileUpload')[0];
    removeAllChildNodes(ac);
    ac.style.height = convertHeight(14);
    const fileList = document.createElement('div');

    getUploadedFiles().then(element => {
        uploadFilesList = element;
        setupFileList(fileList);

        ac.appendChild(fileList);
        const DD = document.createElement('div');
        const DDcontainer = document.createElement('div');
        DDcontainer.className = "dd-container";
        DD.addEventListener('click', element => {
            isDeleting = !isDeleting;
            removeAllChildNodes(DD);
            setDownloadOrDelete(DD);
        })
        setDownloadOrDelete(DD);
        DDcontainer.appendChild(DD);
        ac.appendChild(DDcontainer);

        const UU = document.createElement('div');
        const UUcontainer = document.createElement('div');
        UUcontainer.className = "uu-container";

        UU.addEventListener('click', element => {
            document.getElementById('uploadInput').click();
        })

        UU.style.fontSize = convertHeight(1.3)
        const text = document.createElement('div');
        text.className = "uu-text";
        text.appendChild(document.createTextNode("Upload"));
        UU.appendChild(text);
        UU.className = "uu";
        const upload = document.getElementById("uploadInput");
        upload.addEventListener('change', element => {
            uploadFiles(upload.files).then(e => {
                changeFileUpload();
            });
        })
        UUcontainer.appendChild(UU);
        ac.appendChild(UUcontainer);
    })
}

function setupFileList(fileList) {
    removeAllChildNodes(fileList);
    fileList.className = "uploadedFiles";
    fileList.style.fontSize = convertHeight(1.1);
    for (let i = 0; i < uploadFilesList.length; i++) {
        if (i == 12) { break }
        const temp = document.createElement('div');
        temp.className = "upload-container"
        temp.addEventListener("click", e => {
            deleteOrDownloadFile(uploadFilesList[i]);
        })
        let s = uploadFilesList[i].name;
        if (s.length > 13) {
            s = s.substring(0, 10) + "...";
        }
        const inside = document.createElement('a');

        inside.appendChild(document.createTextNode(s)); // remove ".pdf"

        temp.appendChild(inside);
        fileList.appendChild(temp);
    }
}

function setDownloadOrDelete(d) {
    d.classList.remove("deleteOrDownloadRed", "deleteOrDownloadGreen");
    d.classList.remove("HoverClassRed", "HoverClassGreen");
    const text = document.createElement('div');
    text.className = "dd-text";

    if (isDeleting) {
        d.className = "deleteOrDownloadRed";
        d.classList.add('HoverClassRed');
        text.appendChild(document.createTextNode("Delete"))
        text.style.fontSize = convertHeight(1.3)
        const uploadContainers = document.getElementsByClassName("upload-container");
        for (let i = 0; i < uploadContainers.length; i++) {
            uploadContainers[i].classList.remove("HoverClassRed", "HoverClassGreen");
            uploadContainers[i].classList.add('HoverClassRed')
        }
    } else {
        d.className = "deleteOrDownloadGreen";
        d.classList.add('HoverClassGreen');
        text.appendChild(document.createTextNode("Download"))
        text.style.fontSize = convertHeight(1.15)
        const uploadContainers = document.getElementsByClassName("upload-container");
        for (let i = 0; i < uploadContainers.length; i++) {
            uploadContainers[i].classList.remove("HoverClassRed", "HoverClassGreen");
            uploadContainers[i].classList.add('HoverClassGreen')
        }
    }
    d.appendChild(text);





}

async function getUploadedFiles() {
    const list = [];

    const a = await storageRef.child("files").list();
    for (let i = 0; i < a.items.length; i++) {
        const path = a.items[i].location.path_;
        list.push(new URLAndName(await storageRef.child(path).getDownloadURL(), path.substring(6)));
    }
    return list;
}

function deleteOrDownloadFile(file) {
    if (isDeleting) {
        deleteFile(file.name);
    } else {
        openFromUrl(file.url);
    }
}

async function uploadFiles(files) {
    for (let i = 0; i < files.length; i++) {
        await storageRef.child("files/" + files[i].name).put(files[i]).on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`File #${i} is ${Math.floor(progress)}% done`);
        })
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
    for (let i = 0; i < uploadFilesList.length; i++) {
        if (name.localeCompare(uploadFilesList[i].name) == 0){
            uploadFilesList.splice(i, 1);
            break;
        }
    }

    storageRef.child("files").child(name).delete()
    const f = document.getElementsByClassName("uploadedFiles")[0];
    setupFileList(f);
    const uploadContainers = document.getElementsByClassName("upload-container");
    for (let i = 0; i < uploadContainers.length; i++) {
        uploadContainers[i].classList.remove("HoverClassRed", "HoverClassGreen");
        if (isDeleting) {
            uploadContainers[i].classList.add('HoverClassRed')
        } else {
            uploadContainers[i].classList.add('HoverClassGreen');
        }
    }
}