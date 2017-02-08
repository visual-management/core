const app   = require('http').createServer(),
  io        = require('socket.io')(app),
  mongoose  = require('mongoose'),
  config    = require('config'),

  GridItem  = require('./schemas/grid-item');

app.listen(9090);

// Socket.IO
io.on('connection', (socket) => {
  console.log('CONNECTED');

  // Emit grid on client's connection
  GridItem.find().then((grid) => socket.emit('grid', grid));

  // Save the grid
  socket.on('grid.save', (data) => {
    GridItem.remove({})
      .then(() => GridItem.create(data))
      .catch((err) => console.error(err));
  })
});

// MongoDB
let uri = `${config.get('MONGODB.HOST')}:${config.get('MONGODB.PORT')}/${config.get('MONGODB.DATABASE')}`;
if (config.has('MONGODB.USERNAME') && config.has('MONGODB.PASSWORD')) {
  uri = `${config.get('MONGODB.USERNAME')}:${config.get('MONGODB.PASSWORD')}@` + uri;
}

// Use native promises for Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(uri);

