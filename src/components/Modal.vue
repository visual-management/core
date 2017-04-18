<template>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Plugins Manager</h2>
      <span class="close" @click="close()">&times;</span>
    </div>
    <div class="modal-body">
      <div v-for="plugin in plugins">
        <div class="plugin-name">{{ plugin.name }}
        </div>
        <div class="content-component">
          <div v-for="subPlugin in plugin.components" class="component">
            {{ subPlugin.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
    </div>
  </div>
</template>
<script>
  import { Plugins } from '../plugins'

  export default {
    props: ['value'],
    data: function () {
      return {
        internalValue: '',
        plugins: {}
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
    }
  }
</script>
<style lang="scss" scoped>
  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 16px;
    background-color: #5cb85c;
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

  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;

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

  @-webkit-keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }

  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
