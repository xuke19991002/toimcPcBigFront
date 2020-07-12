<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status === '' && tag === ''}" @click.prevent="search('')">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <ListItem :list="list" :isEnd="isEnd" @nextPage="nextPage" />
  </div>
</template>

<script>
  import ListItem from './ListItem'
  import { getListApi } from '_api/content'

  export default {
    name: 'list',
    components: {
      ListItem
    },
    data () {
      return {
        status: '', // 结贴的状态
        tag: '',
        sort: 'created',
        isEnd: false, // 是否还存在分页
        page: 0,
        limit: 20,
        catalog: this.$route.params.catalog || '', // 帖子的分类
        list: [],
        current: ''
      }
    },
    watch: {
      current: {
        handler(){
          this.init()
        },
        immediate: true
      },
      '$route.params'(val){
        this.catalog = val.catalog
        this.init()
      }
    },
    methods: {
      init(){
        this.page = 0
        this.isEnd = false
        this.getList()
      },
      search (val) {
        if(val === '' && this.current === '') return
        this.current = val
        this._changeStates(val)
      },
      _changeStates (val) {
        switch (val) {
          // 查询未结
          case 0:
            this.status = '0'
            this.tag = ''
            break
          // 查询已结
          case 1:
            this.status = '1'
            this.tag = ''
            break
          // 查询精华
          case 2:
            this.status = ''
            this.tag = '精华'
            break
          // 按照最新时间查询
          case 3:
            this.sort = 'created'
            break
          // 按照评论数查询
          case 4:
            this.sort = 'answer'
            break
          // 查询综合
          default:
            this.status = ''
            this.tag = ''
            this.current = ''
        }
      },
      getList () {
        // 添加请求锁 防止用户多次点击 等待数据返回 锁才打开
        if(this.isRepeat) return
        this.isRepeat = true
        if (this.isEnd) return
        let options = {
          catalog: this.catalog,
          isTop: 0, // 是否置顶 0-否
          page: this.page,
          limit: this.limit,
          sort: this.sort,
          tag: this.tag,
          status: this.status
        }
        getListApi(options).then(res => {
          this.isRepeat = false
          if (res.code === 200) {
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.list.length === 0) {
              this.list = res.data
            } else {
              this.list = this.page === 0 ? res.data : this.list.concat(res.data)
            }
          }

        }).catch(err => {
          this.isRepeat = false
          if (err) {
            this.$alert(err)
          }
        })
      },
      nextPage () {
        this.page++
        this.getList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fly-filter > a, .fly-filter-right > a {
    cursor: pointer;
  }
</style>
