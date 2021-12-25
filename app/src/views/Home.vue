<template>
  <div class="home">
    <button @click="openModal">Open Modal</button>
  </div>
  <p v-if="$props?.query?.verified">Thanks for verifying your email!</p>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  props: ['query'],
  methods: {
    openModal() {
      this.$store.dispatch('ui/openModal', {
        title: 'Test Modal',
        text: 'This is a test modal!'
      })
    }
  },
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
}
</style>