const app   = require('http').createServer(),
  io        = require('socket.io')(app),
  mongoose  = require('mongoose'),
  config    = require('config');

app.listen(9090);

// Socket.IO
io.on('connection', (socket) => {
  console.log('CONNECTED');
});

// MongoDB
let uri = `${config.get('MONGODB.HOST')}:${config.get('MONGODB.PORT')}/${config.get('MONGODB.DATABASE')}`;
if (config.has('MONGODB.USERNAME') && config.has('MONGODB.PASSWORD')) {
  uri = `${config.get('MONGODB.USERNAME')}:${config.get('MONGODB.PASSWORD')}@` + uri;
}

mongoose.connect(uri);

