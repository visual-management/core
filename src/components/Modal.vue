<template>
  <div class="modal-container" @click="close()">
    <div class="modal-content" v-on:click.stop="">
      <div class="modal-header">
        <h2>Plugins Manager</h2>
        <span class="close" @click="close()">&times;</span>
      </div>
      <div class="modal-body">
        <div v-for="plugin in plugins" v-show="showPlugin">
          <div class="plugin-name">
            {{ plugin.name }}
            <div class="plugin-description">
              {{ plugin.description }}
            </div>
          </div>

          <div class="content-component">
            <div v-for="subPlugin in plugin.components" class="component" @click="showEditor(subPlugin)">
              {{ subPlugin.name }}
            </div>
          </div>
        </div>
        <editor class="editor" v-model="editorContent" v-show="editor">
        </editor>
      </div>
      <div class="modal-footer">
        <button @click="onSave()" v-show="editor" class="material-button primary">Save</button>
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
        plugins: {},
        editor: false,
        editorContent: '',
        showPlugin: true,
        currentPlugin: null
      }
    },

    created () {
      this.plugins = Plugins
    },

    methods: {
      close () {
        this.editor = false
        this.showPlugin = true
        this.$emit('input', false)
      },
      showEditor (p) {
        this.currentPlugin = p

        // check if a component has a config to set
        if (p.config) {
          this.editor = true
          this.showPlugin = false
          this.editorContent = JSON.stringify(p.config, null, 2)
        } else {
          this._save()
          this.$emit('input', false)
        }
      },
      onSave () {
        this.currentPlugin.config = JSON.parse(this.editorContent)
        this._save()
      },

      _save () {
        this.$socket.emit('component.save', this.currentPlugin)
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
    width: 30%;
    min-width: 600px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
    font-family: Roboto;

    .modal-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 2px 24px;
      background-color: $primary-color;
      color: white;

      span {
        width: 20px;
        cursor: pointer;
      }
    }

    .modal-body {
      background-color: white;
      display: block;
      max-height: 40vh;
      overflow: auto;
      padding: 24px;




      .plugin-name {
        color: $primary-color;
        display: flex;
        font-weight: bold;
        flex-direction: column;
        justify-content: space-around;
        padding: 8px 0;
        .plugin-description {
          color: darkgrey;
          font-size: 0.8em;
          font-weight: normal;
        }
      }

      .component {
        cursor: pointer;
        padding: 8px 15px;
        font-size: 0.95em;
        color: $primary-text-color;

        &:hover {
          background-color: $primary-color-light;
          color: $primary-color-text;
        }
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      margin: 0 10px;
      align-items: center;
      //background-color: $primary-color;
      color: white;
      padding-bottom: 10px;
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
