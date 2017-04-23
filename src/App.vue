<template>
  <div id="app">
    <grid-layout
      :layout="layout"
      :col-num="24"
      :row-height="70"
      :is-draggable="editing"
      :is-resizable="editing"
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
        :class="[item.plugin + '-plugin', item.component + '-component', item.component + '-' + item.i + '-component', {'editing': editing, 'not-editing': !editing}]">
        <component :is="item.component" :config="item.config"></component>
      </grid-item>
    </grid-layout>

    <ul class="mfb-component--br mfb-slidein" data-mfb-toggle="hover" data-mfb-state="closed" v-show="!editing">
      <li class="mfb-component__wrap">
        <a class="mfb-component__button--main">
          <i class="mfb-component__main-icon--resting fa fa-bars"></i>
          <i class="mfb-component__main-icon--active fa fa-times"></i>
        </a>

        <ul class="mfb-component__list">
          <li>
            <a @click="onEdit" data-mfb-label="Edition mode" class="mfb-component__button--child">
              <i class="mfb-component__child-icon fa fa-pencil"></i>
            </a>
          </li>

          <li>
            <a @click="onAddNewComponent" data-mfb-label="Add new component" class="mfb-component__button--child">
              <i class="mfb-component__child-icon fa fa-plus"></i>
            </a>
          </li>
        </ul>
      </li>
    </ul>

    <a @click="onSave" class="save-btn mfb-component__button--main" v-show="editing">
      <i class="mfb-component__main-icon--resting fa fa-floppy-o"></i>
    </a>

    <modal v-show="showModal" v-model="showModal"></modal>
  </div>
</template>

<script>
  import { components } from './app.module'

//  let criticalReporterPlugin = plugins.getPluginById('sonar-plugin').getComponentByTag('critical-reporter')
//  let sonarConfig = {
//    url: 'http://ic-sonar.sii-ouest.fr/sonar/api/resources?resource={projectId}&depth=0&format=json&metrics=critical_violations,major_violations,minor_violations,info_violations,blocker_violations',
//    projectId: 21563
//  }
  let testLayout = [
    {
      'x': 0,
      'y': 0,
      'w': 1,
      'h': 1,
      'i': '0',
      plugin: 'sonar',
      component: 'critical-reporter',
      config: {
//        url: 'http://ic-sonar.sii-ouest.fr/sonar/api/resources?resource={projectId}&depth=0&format=json&metrics=critical_violations,major_violations,minor_violations,info_violations,blocker_violations',
        host: 'http://ic-sonar.sii-ouest.fr',
        projectId: 25559
      }
    }
  ]

  export default {
    name: 'app',
    components: components,
    data () {
      return {
        editing: false,
        layout: testLayout,
        showModal: false
      }
    },

    methods: {
      onEdit () {
        this.editing = !this.editing
      },

      onAddNewComponent () {
        this.showModal = !this.showModal
      },

      onSave () {
        this.$socket.emit('component.saveAll', this.layout.map((item) => ({
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          component: item.component
        })))

        this.editing = false
      }
    },

    sockets: {
      grid (data) {
        this.layout = data
      }
    }
  }
</script>

<style lang="scss">
  @import '../static/styles';

  html,
  body,
  #app,
  .vue-grid-layout{
    height: 100%;
    min-height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  h1 {
    width: 100%;
    text-align: center;
    font-size: 1.3em;
    margin-top: 5px;
  }

  .save-btn {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 25px;
    z-index: 30;
    background-color: $accent-color;
  }

  .not-editing {
    pointer-events: none;
  }

  .not-editing > .vue-resizable-handle {
    display: none;
  }
</style>
