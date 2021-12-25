<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
  </div>
  <p v-if="$props?.query?.verified">Thanks for verifying your email!</p>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  props: ['query'],
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
}
</style>