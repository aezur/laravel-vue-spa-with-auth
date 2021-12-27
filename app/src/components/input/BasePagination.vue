<template>
  <div>
    <BaseButton
      :disabled="meta.total===1||meta.current_page===1"
      @click="changePage(links.first)"
    >
      First
    </BaseButton>
    <BaseButton
      :disabled="!links.prev"
      @click="changePage(links.prev)"
    >
      Prev
    </BaseButton>
    <BaseButton 
      :disabled="!links.next"
      @click="changePage(links.next)" 
    >
      Next
    </BaseButton>
    <BaseButton 
      :disabled="meta.total===1||meta.current_page===meta.last_page"
      @click="changePage(links.last)"
    >
      Last
    </BaseButton>
  </div>
  <div>
    <p>Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }}</p>
    <p>Page {{ meta.current_page }} of {{ meta.last_page }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, RouteLocation } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '@/components/input/BaseButton.vue';
export default defineComponent({
  components: { BaseButton },
  props: {
    meta: {
      type: Object,
      required: true,
    },
    links: {
      type: Object,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    return {
      currentPage: computed(() => store.getters['admin/currentPage']),
      totalPages: computed(() => store.getters['admin/totalPages']),
    };
  },
  watch: {
    // Watch the route for changes, and if the user changes
    // the '?page=' query, update the list.
    $route(newVal: RouteLocation, oldVal: RouteLocation): void {
      const hasntChangedPage =
        newVal.path === '/users' &&
        oldVal.path === '/users';

      const pageQuery = newVal.query.page;
      const page = pageQuery ? +pageQuery : 1;

      const diffPageRequested = page !== this.currentPage;

      if (hasntChangedPage && diffPageRequested) {
        const outOfBounds = page > this.$store.getters['admin/totalPages'] || page < 0;
        if (outOfBounds) {
          this.$router.push({ query: { page: this.currentPage }});
        } else {
          this.changePage(page);
        }
      }
    }
  },
  methods: {
    async changePage(page: string | number): Promise<void> {
      const url = typeof page === 'string' ?
        page : `${this.meta.path}?page=${page}`;
      await this.$store.dispatch(
        this.action, url,
      ).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: this.meta?.current_page || 1 },
          });
        }
      });
    },
  },
});
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: min(400px, 100%);
}
</style>