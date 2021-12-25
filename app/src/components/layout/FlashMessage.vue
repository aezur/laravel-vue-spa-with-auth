<template>
<teleport to="body">
  <div class="flash-msg">
    <p v-if="$attrs.message" key="message">
      {{ $attrs.message }}
    </p>
    <p
      v-if="$attrs.error && getType($attrs.error) === 'string'"
      key="error"
     >
      {{ $attrs.error }}
    </p>
    <ul
      v-if="getType($attrs.error) === 'object'"
      key="error-list"
    >
      <li v-for="key in errorKeys" :key="key">
        <b>{{ titleCase(key) }}</b>
        <ul>
          <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
            {{ item }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</teleport>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    errorKeys() {
      if (!this.error || this.getType(this.error) === "string") {
        return null;
      }
      return Object.keys(this.error);
    },
  },
  methods: {
    getErrors(key) {
      return this.error[key];
    },
    getType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },
    titleCase(value) {
      return value.replace("_", " ");
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
.flash-msg {
  p {
    margin: 0;
  }
  border: 1px solid $errorFontColor;
  background-color: rgba($errorFontColor, 20%);
  color: $errorFontColor;
  padding: 1rem;
  text-align: center;
  @media (max-width: $phoneLandscape) {
    margin: 3rem 0;
  }
  @media (min-width: $phoneLandscape) {
    margin: 0 3rem;
  }
}
</style>