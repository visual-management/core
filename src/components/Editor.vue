<template>
  <div class="editor">
    <textarea v-bind:value="value"
              v-on:input="updateValue($event.target.value)">
      {{ value }}
    </textarea>
  </div>
</template>

<script>
  export default {
    props: ['value'],

    methods: {
      updateValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor {
    textarea {
      width: 99%;
      height: 50vh;
    }
  }
</style>
