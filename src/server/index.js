const app = require('http').createServer(),
  io = require('socket.io')(app);

app.listen(9090);

io.on('connection', (socket) => {
  console.log('CONNECTED');
});
