import { components, plugins } from './app.module';

let criticalReporterPlugin = plugins.getPluginById('sonar-plugin').getComponentByTag('critical-reporter');
let testLayout = [
  {"x": 0, "y": 0, "w": criticalReporterPlugin.defaultWidth, "h": criticalReporterPlugin.defaultHeight, "i": "0", component: criticalReporterPlugin.tag}
];


export default {
  name      : 'app',
  components: components,
  data () {
    return {
      editing: true,
      layout : testLayout
    };
  },

  methods: {
    onEdit () {
      this.editing = !this.editing;
    },

    onSave () {
      this.$socket.emit('grid.save', this.layout.map((item) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        component: item.component
      })));
    }
  },

  sockets: {
    grid (data) {
      this.layout = data;
    }
  }

}
