<template>
  <div>
    <button @click="changePage(links.first)"
      :disabled="meta.total===1||meta.current_page===1">
      First
    </button>
    <button @click="changePage(links.prev)" :disabled="!links.prev">
      Prev
    </button>
    <button @click="changePage(links.next)" :disabled="!links.next">
      Next
    </button>
    <button @click="changePage(links.last)"
      :disabled="meta.total===1||meta.current_page===meta.last_page">
      Last
    </button>
  </div>
  <div class="info">
    <p>Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }}</p>
    <p>Page {{ meta.current_page }} of {{ meta.last_page }}</p>
  </div>

</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  props: {
    meta: Object,
    links: Object,
    action: String,
    path: String,
  },
  methods: {
    async changePage(page: string | number): void {
      const url = typeof page === 'string' ?
        page : `${this.meta.path}?page=${page}`;
      await this.$store.dispatch(
        this.action, url,
      ).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: this.meta.current_page },
          });
        }
      });
    },
  },
  watch: {
    async currentPage(newVal: number, oldVal: number): void {
      if (newVal > this.meta.last_page || newVal < 1) {
        this.$router.push({
          query: { page: this.meta.current_page },
        });
      }
      else if (this.meta.current_page !== newVal) {
        await this.changePage(newVal);
      }
    }
  },
  setup() {
    const route = useRoute();
    return {
      currentPage: computed(() => +route.query.page)
    }
  }
})
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>