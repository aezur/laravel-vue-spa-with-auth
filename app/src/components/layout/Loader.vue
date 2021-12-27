<template>
  <teleport to="nav">
    <div class="loader">
      <div class="wrapper">
        <span class="spinner" />
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.loader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 9999;
  .wrapper {
    background-color: $ui;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5rem;
    aspect-ratio: 1;
    border: solid 2px $font;
    .spinner::before {
      background-color: $ui;
      animation: 1.5s linear infinite spinner;
      animation-play-state: inherit;
      border: solid 5px $font;
      border-bottom-color: $secondary;
      border-radius: 50%;
      content: "";
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      will-change: transform;
    }
  }
}
@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
</style>
