import io from "socket.io-client";
const socket = io('http://localhost:8000');

const login = (username) => {
  socket.emit('user:join', username)
}

const onLogin = (cb) => {
    socket.on('user:add', cb);
}

const onJoin = (cb) => {
    socket.on('user:joined', cb);    
}

const send = (data) => {
  socket.emit('message:send', data);
}

const onMessage = (cb) => {
  socket.on('message:receive', cb);
}

const onLeft = (cb) => {
  socket.on('user:left', cb);
}

export {
    login,
    onLogin,
    onJoin,
    send,
    onMessage,
    onLeft
};