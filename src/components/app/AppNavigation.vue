<template>
<div>
  <v-app-bar-nav-icon class="ml-auto" color="transparent" size="36" @click.stop="appStore.setDrawer(true)" />
  <v-navigation-drawer
    v-model="isDrawerVisible"
    class="bg-secondary-background"
    :width="mobile ? 250 : 280"
    absolute
    left
    temporary
  >
    <div class="w-100" :class="mobile ? 'px-3 py-2' : 'px-6 py-4'">
      <router-link class="header-main-link text-primary" :to="{ name: '' }">
        Multitool
      </router-link>
      <v-list class="px-0" nav density="compact">
        <v-list-item-group>
          <v-list-item
            v-for="link in navigationLinks"
            :key="link.title"
            :to="link.routeName"
            class="text-white px-3"
          >
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-navigation-drawer>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/store/app'

export default defineComponent({
  name: 'AppNavigation',
  setup() {
    const appStore = useAppStore()
    const { mobile } = useDisplay()

    const navigationLinks: { title: string, routeName: string }[] = ref([
      {
        title: 'Currency Converter',
        routeName: '/currency-converter',
      },
      {
        title: 'Historical Data on Currency Rates',
        routeName: '/currency-history',
      },
    ])

    const isDrawerVisible: boolean = computed({
      get() {
        return appStore.isDrawerVisible
      },
      set(value) {
        appStore.setDrawer(value)
      }
    })

    return {
      appStore,
      mobile: ref(mobile),
      navigationLinks,
      isDrawerVisible
    }
  }
})
</script>
