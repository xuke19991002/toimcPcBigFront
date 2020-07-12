<template>
  <div class="fly-panel" v-if="list.length > 0">
    <div class="fly-panel-title fly-filter">置顶</div>
    <ListItem :list="list" isTop />
  </div>
</template>

<script>
  import ListItem from './ListItem'
  import { getListApi } from '_api/content'

  export default {
    name: 'topList',
    components: {
      ListItem
    },
    data () {
      return {
        page: 0,
        limit: 20,
        list: []
      }
    },
    mounted () {
      // this.getList()
    },
    methods: {
      getList () {
        // 添加请求锁 防止用户多次点击 等待数据返回 锁才打开
        if (this.isRepeat) return
        this.isRepeat = true
        if (this.isEnd) return
        let options = {
          isTop: 1, // 是否置顶 1-是
          page: this.page,
          limit: this.limit
        }
        getListApi(options).then(res => {
          if (res.code === 200) {
            this.list = res.data.slice(0, 5)
          }
        }).catch(err => {
          if (err) {
            this.$alert(err)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
