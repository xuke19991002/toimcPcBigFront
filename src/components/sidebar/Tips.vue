<template>
  <!-- 温馨通道 -->
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <ul class="fly-panel-main">
      <li
        class="layui-col-xs6"
        :key="index"
        v-for="(item, index) in list"
      >
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </li>

    </ul>
  </div>
</template>

<script>
  import { getTipsApi } from '_api/content'

  export default {
    name: 'tips',
    data () {
      return {
        list: []
      }
    },
    mounted () {
      // getTipsApi().then(res => {
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
  $border-color: #f2f2f2;
  .fly-panel-main {
    overflow: hidden;
    padding: 15px;
    .layui-col-xs6 {
      padding: 0 10px;
      border: 1px solid $border-color;
      position: relative;
      &:nth-of-type(2n) {
        margin-left: -1px;
      }
      &:nth-of-type(n+3) {
        margin-top: -1px;
      }
      a {
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        list-style: none;
      }
    }
  }
</style>
