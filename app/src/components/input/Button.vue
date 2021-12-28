<template>
  <button :class="color">
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
    },
    color: {
      type: String,
      default: () => 'primary',
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/colors';
button {
  color: $link;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  padding: .375rem .75rem;
  text-transform: uppercase;
  border: none;
  border-radius: .25rem;
}
.primary {
  background-color: $primary;
  &:hover,:focus {
    background-color: $primary-light;
    color: $secondary-dark;
  }
  &:active {
    background-color: $primary-dark;
  }
}
.secondary {
  background-color: $secondary;
  &:hover,:focus {
    background-color: $secondary-light;
    color: $primary-dark;
  }
  &:active {
    background-color: $secondary-dark;
  }
}
.success {
  background-color: $success;
  &:hover,:focus {
    background-color: $success-dark;
  }
  &:active {
    background-color: $success-light;
  }
}
.danger {
  background-color: $danger;
  &:hover,:focus {
    background-color: $danger-dark;
  }
  &:active {
    background-color: $danger-light;
  }
}
</style>