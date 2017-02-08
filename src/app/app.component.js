import VueGridLayout from 'vue-grid-layout';
import TestComponent from './test/test.component.vue';

let testLayout = [
  { x: 0, y: 0, w: 1, h: 1, i: "0" },
  { x: 1, y: 0, w: 1, h: 1, i: "1" },
  { x: 2, y: 0, w: 1, h: 1, i: "2" },
  { x: 3, y: 0, w: 1, h: 1, i: "3" },
  { x: 4, y: 0, w: 1, h: 1, i: "4" }
];

export default {
  name: 'app',

  components: {
    'grid-layout' : VueGridLayout.GridLayout,
    'grid-item'   : VueGridLayout.GridItem,
    'my-component': TestComponent
  },

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
        h: item.h
      })));
    }
  }

}
