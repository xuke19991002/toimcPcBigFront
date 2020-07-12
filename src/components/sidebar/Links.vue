<template>
  <!--友情链接-->
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd><a href="/" target="_blank">layui</a>
      <dd>
      <dd><a href="http://layim.layui.com/" target="_blank">WebIM</a>
      <dd>
      <dd><a href="http://layer.layui.com/" target="_blank">layer</a>
      <dd>
      <dd><a target="_blank">layDate</a>
      <dd>
      <dd><a class="fly-link">申请友链</a></dd>
    </dl>
  </div>
</template>

<script>
  import { getLinksApi } from '_api/content'

  export default {
    name: 'links',
    data () {
      return {
        list: []
      }
    },
    mounted () {
      // getLinksApi().then(res => {
      //   if (res.code === 200) {
      //     this.list = res.data
      //   }
      // }).catch(err => {
      //   if (err) {
      //     this.$alert(err)
      //   }
      // })
    }
  }
</script>

<style lang="scss" scoped>

</style>
