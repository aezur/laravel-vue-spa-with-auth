<template>
  <button>
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    text: {
      type: String,
      default: () => '',
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/colors';
button {
  color: $link;
  background-color: $primary;
  cursor: pointer;
  font-size: 1.1rem;
  padding: .375rem .75rem;
  text-transform: uppercase;
  border: none;
  border-radius: .25rem;
  &:hover,:focus {
    background-color: $primary-light;
  }
  &:active {
    background-color: $primary-dark;
  }
}
</style>