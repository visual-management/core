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
      layout: testLayout
    }
  }
}
