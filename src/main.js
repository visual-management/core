import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import App from './app/app.component.vue'

// Connect to the WebSocket
Vue.use(VueSocketio, 'http://localhost:9090');

new Vue({
  el     : '#app',
  render : h => h(App),
  sockets: {
    connect () {
      console.log('socket connected')
    }
  },
});
