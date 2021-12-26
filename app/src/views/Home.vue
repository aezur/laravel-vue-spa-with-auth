<template>
  <div class="home">
    <button @click="openModal">
      Open Modal
    </button>
    <p v-if="$props?.query?.verified">
      Thanks for verifying your email!
    </p>
    <FileUpload endpoint="/users/auth/avatar" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FileUpload from '@/components/input/FileUpload.vue';
export default defineComponent({
  components: {
    FileUpload,
  },
  // eslint-disable-next-line
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
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}
</style>