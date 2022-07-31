//let userId = prompt('userid?');
import { io } from "socket.io-client";
const socket = io();

const messageForm = document.getElementById('messageForm');
const message = document.getElementById('message');
const chatRoom = document.getElementById("chatRoom");
const welcome = document.getElementById("welcome");
const newRoom = document.getElementById("roomName");

// chatRoom.hidden = true;
let roomName;

function addMessage(message){
    const listUl = room.querySelector("#list");
    console.log(listUlper.innerHTML);
    const listLi = document.createElement("li");
    listLi.innerText(message);
    ul.appendChild(listLi);
}

//메시지 보내기 function
function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#messageForm input");
    const value = input.value;
    //입력받은 메시지를 back-end로 보내준다.
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You : ${value}`); //백엔드에서 시작시킬 수 있는 function
    });
    input.value = "";
}

//닉네임 정하기 function
function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#nameform input");
    socket.emit("nickname", input.value);
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const messageForm = room.querySelector("#messageForm");
    const nameForm = room.querySelector("#nameForm");
    messageForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
};

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("roomName");
     //argument ->  1. 이벤트이름, 2. 보내고 싶은 payload, 3. 서버에서 호출하는 function
    socket.emit(
      "enter_room",
      input.value, //방 이름
      showRoom//function - backend에서 끝났다는 사실을 알리기 위한 function은 맨 마지막 arg가 되어야한다.
    );
    roomName = input.value;
    input.value="";
    // 1. 특정한 event 를 어떤 이름이든 상관없이 emit 해줄 수 있다.
    // 2. JS object 를 전송할 수 있다.
};

form.addEventListener("submit", handleRoomSubmit);
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', input.value, userId);
//         input.value = '';
//     }
// });
//새로운 참여자가 room에 들어오면 수행될 function
socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`[ ${user} arrived. ]`);
});
//참여자가 방을 나가면 수행하게 될 function
socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`[ ${left} left. ]`);
});
//메시지 확인
socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    roomList.innerHTML = '';
    //room이 하나도 없을 때, 모든 것을 비워준다.
    if(room.length === 0){
      return;
    }
    const roomList = welcome.querySelector("ul");
    rooms.forEach(room => {
      const li = document.createElement("li");
      li.innerText = room;
      roomList.append(li);
    })
});

socket.on('chat message', function(msg, id) {
    let itemId = document.createElement('li');
    let item = document.createElement('li');
    if(userId != id) {
        itemId.style.textAlign = 'right'; 
        item.style.textAlign = 'right'; 
    }
    itemId.textContent = id;
    item.textContent = msg;
    messages.appendChild(itemId);
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});