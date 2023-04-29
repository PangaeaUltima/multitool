<template>
<v-app>
  <app-cursor-follower v-if="isGameActive" />
  <transition name="fade" mode="out-in">
  </transition>
  <div class="fill-height wrapper relative d-flex flex-column">
    <slot />
  </div>
</v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import AppCursorFollower from '@/components/app/AppCursorFollower.vue'

export default defineComponent({
  name: 'AppLayout',
  components: {
    AppCursorFollower,
  },
  setup() {
    const appStore = useAppStore()
    // const isGameActive = ref(appStore.isGameActive)

    const isGameActive = computed({
      get() {
        return appStore.isGameActive
      },
      set() {}
    })

    return {
      isGameActive,
    }
  }
})
</script>

<style lang="scss" scoped>
.v-application {
  background: $primary-background;
  color: $primary-font;

  .wrapper {
    z-index: 2;
  }
}
</style>