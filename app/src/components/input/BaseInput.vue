<template>
  <label v-if="$attrs.label" :for="$attrs.id">{{ $attrs.label }}</label>
  <input
    :id="$attrs.id"
    :style="$attrs.errors?'margin:0;':''"
    :type="$attrs.type"
    :placeholder="$attrs.placeholder"
    v-model="inputValue"
  />
  <div v-if="$attrs.errors">
    <small v-for="error in $attrs.errors" :key="error">
      {{error}}
    </small>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  props: {
    modelValue: String,
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  emits: ['update:modelValue'],
  watch: {
    inputValue() {
      this.$emit('update:modelValue', this.inputValue);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
small {
  color: $errorFontColor;
}
</style>