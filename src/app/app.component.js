import components from './app.module';


let testLayout = [
  {"x": 0, "y": 0, "w": 1, "h": 1, "i": "0", component: "critical-reporter"}

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
