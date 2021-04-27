$(document).ready(() => {
    $(".chat-btn").click(() => {
        $(".chat-box").slideToggle("slow")
    })
})

let btn = document.getElementById('sendButton');
btn.addEventListener('click', sendToFlask);
// let btn = document.getElementById("sendButton");
// btn.addEventListener('click', printText);

function sendToFlask(e){
    
    let txt = document.getElementById('inputText');

    let line = txt.value;
    printText(line, true);
    txt.value = '';

    let availID = localStorage.getItem('availID');
    if (availID == null) availID = 1;
    else availID = parseInt(availID);

    let taskList = JSON.parse(localStorage.getItem('taskList'));
    if (taskList == null) taskList = [];

    // console.log(availID, taskList);
    

    let pack = {
        "line" : line,
        "availID" : availID,
        "taskList" : taskList
    };

    fetch(`${window.origin}/receive-data`,{
        method : "POST",
        credentials: "include",
        body: JSON.stringify(pack),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then(response => response.json())
    .then(data =>
        //console.log(processResponse(data[0]));
        processResponse(data[0]))
        //return data[0];
    .catch(error => console.error(error));
}

function processResponse(pack){
    let availID = pack["availID"];
    let message = pack["message"];
    let taskList = pack["taskList"];

    localStorage.setItem('availID', JSON.stringify(availID));
    localStorage.setItem('taskList', JSON.stringify(taskList));
    
    printText(message, false);
    return message
}


function printText(e,isFromUs){
    //e.preventDefault(); //biar ga reload

    //let txt = document.getElementById("inputText");
    if (isFromUs){
        let message = `<div class="my-chat">${e}</div>`
        let chats = document.getElementById("chatbox");
        chats.innerHTML += message;
    } else {
        let message = `<div class="client-chat">${e}</div>`
        let chats = document.getElementById("chatbox");
        chats.innerHTML += message;
    }
    
    
}