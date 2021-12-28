<template>
  <div class="home">
    <p v-if="query">
      Thanks for verifying your email!
    </p>
    <Button @click="openModal">
      <span>Open Modal</span>
    </Button>
    <ImageAsset
      v-if="avatar"
      class="avatar"
      :path="avatar"
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
import Button from '@/components/input/Button.vue';
import ImageAsset from '@/components/images/ImageAsset.vue';
export default defineComponent({
  components: {
    FileUpload,
    ImageAsset,
    Button,
  },
  props: {
    verified: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    avatar() {
      return this.$store.getters['auth/authUser']?.avatar;
    },
    query(): Boolean {
      return this.verified ?
        !!this.verified : false;
    },
  },
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