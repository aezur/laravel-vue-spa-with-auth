<template>
  <input
    type="file"
    :accept="['image/*']"
    @change="fileChange"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FileService from '@/services/FileService';
export default defineComponent({
  props: {
    endpoint: {
      type: String,
      default: () => '',
    },
  },
  emits: ['fileUploaded'],
  methods: {
    fileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.$store.dispatch('ui/showLoader');
        FileService.uploadFile({ file: formData, endpoint: this.endpoint })
        .then(() => {
          this.$store.dispatch('ui/hideLoader');
          this.$emit('fileUploaded');
        })
        .catch((error: Error) => {
          this.$store.dispatch('ui/hideLoader');
          console.log(error);
        });
      }
    },
  }
});
</script>