<template>
  <div id="app">
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="110"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        v-bind:class="{'editing': editing, 'not-editing': !editing}">
        <component :is="item.component" :config="item.config"></component>
      </grid-item>

      <div style="position: absolute; bottom: 0; right: 0; color: red; padding: 15px;">
        <button @click="onEdit()">EDIT</button>
        <button @click="onSave()" v-if="editing">SAVE</button>
      </div>
    </grid-layout>
  </div>
</template>

<script>
  import { components, plugins } from './app.module'

  let criticalReporterPlugin = plugins.getPluginById('sonar-plugin').getComponentByTag('critical-reporter')
  let sonarConfig = {
    url: 'http://ic-sonar.sii-ouest.fr/sonar/api/resources?resource={projectId}&depth=0&format=json&metrics=critical_violations,major_violations,minor_violations,info_violations,blocker_violations',
    projectId: 21563
  }
  let testLayout = [
    {'x': 0, 'y': 0, 'w': criticalReporterPlugin.defaultWidth, 'h': criticalReporterPlugin.defaultHeight, 'i': '0', component: criticalReporterPlugin.tag, config: sonarConfig}
  ]

  export default {
    name: 'app',
    components: components,
    data () {
      return {
        editing: true,
        layout: testLayout
      }
    },

    methods: {
      onEdit () {
        this.editing = !this.editing
      },

      onSave () {
        this.$socket.emit('grid.save', this.layout.map((item) => ({
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          component: item.component
        })))
      }
    },

    sockets: {
      grid (data) {
        this.layout = data
      }
    }
  }
</script>
<style>
  body {
    font-family: 'Roboto', sans-serif;
  }
  .vue-grid-item {
    background-color: gray;
  }

  h1 {
    width: 100%;
    text-align: center;
    font-size: 1.3em;
    margin-top: 5px;
  }


  .not-editing {
    pointer-events: none;
  }

  .not-editing > .vue-resizable-handle {
    display: none;
  }
</style>
