import VueGridLayout from 'vue-grid-layout';

import TestComponent from './test/test.component.vue';

let testLayout = [
  {"x": 0, "y": 0, "w": 1, "h": 1, "i": "0"},
  {"x": 1, "y": 0, "w": 1, "h": 1, "i": "1"},
  {"x": 2, "y": 0, "w": 1, "h": 1, "i": "2"},
  {"x": 3, "y": 0, "w": 1, "h": 1, "i": "3"},
  {"x": 4, "y": 0, "w": 1, "h": 1, "i": "4"}

];

export default {
  name      : 'app',
  components: {
    GridLayout    : VueGridLayout.GridLayout,
    GridItem      : VueGridLayout.GridItem,
    'my-component': TestComponent
  },
  data () {
    return {
      layout: testLayout
    }
  }
}
