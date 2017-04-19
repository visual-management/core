const app   = require('http').createServer(),
  io        = require('socket.io')(app),
  mongoose  = require('mongoose'),
  config    = require('config'),

  Component  = require('./schemas/component');

app.listen(9090);

// Socket.IO
io.on('connection', (socket) => {
  console.log('CONNECTED');

  // Emit grid on client's connection
  Component.find().then((grid) => socket.emit('grid', grid));

  // Save the grid
  socket.on('component.saveAll', (data) => {
    Component.remove({})
      .then(() => Component.create(data))
      .catch((err) => console.error(err));
  })

  socket.on('component.saveConfig', (component, config) => {
    console.log('component', component)
    Component.find({ 'component': component}).then(c => {
      console.log(c)
    }).catch(err => {
      console.error(err)
    })
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

