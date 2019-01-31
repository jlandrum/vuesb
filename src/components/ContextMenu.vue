<template>
  <div>
    <div :class="classes">{{ label }}</div>
    <ul>
      <li v-for="(item, $index) in data" index="$index">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Icon from '../features/icons';

class {
  @Prop() private data?: [];
}

Vue.component('context-menu', ContextMenu);
</script>

<style scoped lang="scss">
</style>
