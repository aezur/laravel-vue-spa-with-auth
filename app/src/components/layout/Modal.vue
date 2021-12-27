<template>
  <teleport to="nav">
    <div class="modal">
      <div class="wrapper">
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
        <Button @click="closeModal">
          Close
        </Button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Button from '@/components/input/Button.vue';
export default defineComponent({
  components: { Button },
  setup() {
    const store = useStore();
    return {
      title: computed(() => store.getters['ui/modalTitle']),
      text: computed(() => store.getters['ui/modalText']),
      closeModal: () => store.dispatch('ui/closeModal'),
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
@import '@/assets/scss/vars.scss';
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: hsl(0 0% 70% / 0.1);
  backdrop-filter: blur(.1rem);
  z-index: 9999;
  .wrapper {
    h1 {
      margin: 0;
    }
    background-color: $bg;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    @media (max-width: $phoneLandscape) {
      width: 100vw;
    }
    @media (max-width: $tabletLandscape) {
      width: 60vw;
    }
    @media (min-width: $tabletLandscape) {
      width: 40vw;
    }
  }
}
</style>
