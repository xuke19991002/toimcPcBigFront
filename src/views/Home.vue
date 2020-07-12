<template>
  <div>
    <Panel />
    <router-view></router-view>
  </div>
</template>

<script>
  import Panel from '_c/Panel'
  import Index from '_views/channels/Index'

  export default {
    components: {
      Panel,
      Index
    }
  }
</script>

<style lang="scss" scoped>

</style>
