let userId = prompt('userid?');
let socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value, userId);
        input.value = '';
    }
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