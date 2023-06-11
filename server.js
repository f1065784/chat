const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const scriptFile = fs.readFileSync(path.join(__dirname, 'static', 'index.js'));
const styleFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const registerFile = fs.readFileSync(path.join(__dirname, 'static', 'register.html'));
const authFile = fs.readFileSync(path.join(__dirname, 'static', 'auth.js'));

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/': res.end(indexHtmlFile);
        break;
        case '/index.js':  res.end(scriptFile);
        break;
        case '/style.css': res.end(styleFile);
        break;
        case '/register': res.end(registerFile);
        break;
        case '/auth.js': res.end(authFile);
        break;
        default: res.end('Error 404');
    }
});


server.listen(3000);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', async (socket) => {
  console.log('a user connected. id - ' + socket.id);

  
  let messages = await db.getMessages();

  socket.emit('all_messages', messages);

  socket.on('new_message', (message) => {
    db.addMessage(message, 1);
    io.emit('message',  message);
  });
});