<template>
<v-app>
  <div class="fill-height wrapper relative d-flex flex-column">
    <slot />
  </div>
</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLayout',
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