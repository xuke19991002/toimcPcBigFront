<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <List />
      </div>
      <div class="layui-col-md4">
        <!--本周热议-->
        <HotList />
        <!--广告-->
        <Ads />
        <!--友情链接-->
        <Links />
      </div>
    </div>
  </div>
</template>

<script>
  import Ads from '_c/sidebar/Ads'
  import HotList from '_c/sidebar/HotList'
  import Links from '_c/sidebar/Links'
  import Sign from '_c/sidebar/Sign'
  import Tips from '_c/sidebar/Tips'
  import List from '_c/contents/List.vue'
  export default {
    name: 'template1',
    components: {
      List,
      Ads,
      HotList,
      Links,
      Sign,
      Tips
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>

</style>
