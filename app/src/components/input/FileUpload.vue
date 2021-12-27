<template>
  <Input
    id="file"
    type="file"
    :accept="['image/*']"
    @change="fileChange"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FileService from '@/services/FileService';
import Input from '@/components/input/Input.vue';
export default defineComponent({
  components: { Input },
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
        .then(({data}) => {
          this.$emit('fileUploaded', data.data);
          this.$store.dispatch('ui/hideLoader');
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