<template>
  <header class="d-flex align-center">
    <div class="w-100 d-flex align-center" :class="mobile ? 'px-3 py-2' : 'px-6 py-4'">
      <router-link
        class="header-main-link text-primary"
        to="/"
      >
        Multitool
      </router-link>
      <app-cursor-follower-control class="ml-auto" />
      <app-navigation />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppCursorFollowerControl from '@/components/app/AppCursorFollowerControl.vue'
import AppNavigation from '@/components/app/AppNavigation.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppCursorFollowerControl,
    AppNavigation,
  },
  setup() {
    const { mobile } = useDisplay()

    return {
      mobile: ref(mobile),
    }
  }
})
</script>
