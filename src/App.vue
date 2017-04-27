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

    <modal v-show="showModal"
           :value="showModal"
           @input="toggleModal()"></modal>
  </div>
</template>

<script>
  import { components } from './app.module'

  export default {
    name: 'app',
    components: components,
    data () {
      return {
        editing: false,
        layout: [],
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
      },

      toggleModal () {
        console.log('couucou')
        this.showModal = !this.showModal
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
