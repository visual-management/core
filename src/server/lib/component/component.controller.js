const Component = require('./component.model');

class ComponentController {

  constructor (socket) {
    this.socket = socket;
  }

  updateAll (data) {
    data.forEach(async (item) => {
      await Component.update({ _id: item._id }, { $set: item })
    });
  }

  save (data) {
    const component = new Component({
      x: 0,
      y: 0,
      w: data.defaultWidth || 5,
      h: data.defaultHeight || 5,
      plugin: data.plugin,
      component: data.tag,
      config: data.config
    });

    return component.save()
      .then((cmpt) => {
        cmpt.i = cmpt._id;

        this.socket.emit('componentCreated', cmpt);
      })
      .catch(err => console.error(err));
  }

}

module.exports = ComponentController;
