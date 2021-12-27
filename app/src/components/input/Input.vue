<template>
  <label
    v-if="$attrs.label"
    :for="$attrs.id"
  >
    {{ $attrs.label }}
  </label>
  <input
    :id="$attrs.id"
    v-model="inputValue"
    :type="$attrs.type"
    :accept="$attrs.accept"
    :placeholder="$attrs.placeholder"
    :style="$attrs.errors?'margin:0;':''"
    @change="$emit('change', $event)"
  >
  <div v-if="$attrs.errors">
    <small
      v-for="error in $attrs.errors"
      :key="error"
    >
      {{ error }}
    </small>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  watch: {
    inputValue() {
      this.$emit('update:modelValue', this.inputValue);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
small {
  color: $danger;
}
</style>