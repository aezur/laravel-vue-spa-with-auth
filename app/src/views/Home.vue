<template>
  <div class="home">
    <button @click="openModal">
      Open Modal
    </button>
    <p v-if="$props?.query?.verified">
      Thanks for verifying your email!
    </p>
    <ImageAsset
      class="avatar"
      :path="$store.getters['auth/authUser'].avatar"
    />
    <FileUpload
      endpoint="/users/auth/avatar"
      @fileUploaded="updateUser"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FileUpload from '@/components/input/FileUpload.vue';
import ImageAsset from '@/components/ImageAsset.vue';
export default defineComponent({
  components: {
    FileUpload,
    ImageAsset,
  },
  // eslint-disable-next-line
  props: ['query'],
  methods: {
    openModal() {
      this.$store.dispatch('ui/openModal', {
        title: 'Test Modal',
        text: 'This is a test modal!'
      })
    },
    updateUser(user: User) {
      this.$store.dispatch('auth/setUser', user);
    }
  },
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.avatar {
  border-radius: 50%;
  width: 20vw;
  aspect-ratio: 1;
}
</style>