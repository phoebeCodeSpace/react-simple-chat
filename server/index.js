// create a websocket service
const io = require('socket.io')();

let numUsers = 0

io.on('connection', (socket) => {
    //  console.log(socket.id);
    let logined = false;        // 用户登录标识

    socket.on('user:join', (username) => {
        logined = true
        socket.username = username
        ++numUsers
        // 告知用户：有新用户加入
        socket.emit('user:joined', {
            numUsers
        })
        socket.broadcast.emit('user:add', {
            username,
            numUsers
        })
    })

    socket.on('message:send', (data) => {
        socket.broadcast.emit('message:receive', {
            username: socket.username,
            message: data.message
        });
    })

    socket.on('disconnect', () => {
        if (logined) {
            --numUsers;
            // 告知用户： 有用户离开
            socket.broadcast.emit('user:left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);