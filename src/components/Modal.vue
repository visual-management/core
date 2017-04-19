<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Plugins Manager</h2>
        <span class="close" @click="close()">&times;</span>
      </div>
      <div class="modal-body">
        <div v-for="plugin in plugins" v-show="showPlugin">
          <div class="plugin-name">
            {{ plugin.name }}
          </div>
          <div class="content-component">
            <div v-for="subPlugin in plugin.components" class="component" @click="showEditor(subPlugin.config)">
              {{ subPlugin.name }}
            </div>
          </div>
        </div>
        <textarea ref="editor" v-show="editor">
        </textarea>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>

<script>
  import { Plugins } from '../plugins'

  export default {
    props: ['value'],

    data: () => {
      return {
        internalValue: '',
        plugins: {},
        editor: false,
        showPlugin: true
      }
    },

    watch: {
      'internalValue' () {
        this.$emit('input', false)
      }
    },

    created () {
      this.plugins = Plugins
      this.internalValue = this.value
    },

    methods: {
      close () {
        this.internalValue = !this.internalValue
      },
      showEditor (config) {
        this.editor = true
        this.showPlugin = false
        this.$refs.editor.innerHTML = JSON.stringify(config)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../static/abstract/color';

  .modal-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:before {
      position: fixed;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: lightgray;
      z-index: -1;
      opacity: 0.8;
    }
  }

  .modal-content {
    position: relative;
    background-color: #FEFEFE;
    margin: auto;
    padding: 0;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;

    .modal-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 2px 16px;
      background-color: $primary-color;
      color: white;

      span {
        width: 20px;
        cursor: pointer;
      }
    }

    .modal-body {
      padding: 2px 16px;
      background-color: white;
      display: block;
      max-height: 55vh;
      overflow: auto;

      .content-component {
        margin-left: 30px;
        cursor: pointer;
      }
    }

    .modal-footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #5cb85c;
      color: white;
      padding: 10px 0;
    }

    .hidden {
      display: none;
    }
  }

  @-webkit-keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }

  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
