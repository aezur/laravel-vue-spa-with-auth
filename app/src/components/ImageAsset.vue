<template>
  <img :src="url">
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    path: {
      type: String,
      default: '',
    }
  },
  computed: {
    url() {
      return `${process.env.VUE_APP_ASSET_URL}${this.path}`;
    },
  },
});
</script>