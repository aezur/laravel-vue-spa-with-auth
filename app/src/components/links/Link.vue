<template>
  <router-link :to="path">
    {{ text }}
  </router-link>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
      default: () => "",
    },
    path: {
      type: String,
      required: true,
      default: () => "",
    },
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/colors';
a {
  color: $secondary;
  &:hover,:focus,:active {
    color: $primary;
  }
}
</style>