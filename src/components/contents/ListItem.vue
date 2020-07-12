<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in lists">
        <a href="user/home.html" class="fly-avatar">
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
        </a>
        <h2>
          <a v-if="item.catalog" class="layui-badge">{{item.catalog}}</a>
          <a>{{item.title}}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{item.uid.name}}</cite>
            <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
            <i v-if="item.uid.isVip !== '0'" class="layui-badge fly-badge-vip">VIP{{item.uid.isVip}}</i>
          </a>
          <span>{{item.created | moment}}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
          <span v-if="item.isEnd === '1'" class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge" v-if="item.tags.length > 0">
          <span
            class="layui-badge"
            :class="tag.class"
            :key="index"
            v-for="(tag, index) in item.tags">
            {{tag.name}}
          </span>
        </div>
      </li>

    </ul>
    <div style="text-align: center; cursor: pointer;" v-if="!isTop">
      <div class="laypage-main" v-if="!isEnd">
        <a class="laypage-next" @click.prevent="$emit('nextPage')">更多求解</a>
      </div>
      <div class="nomore gray" v-else>
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn.js' // 中文包

  export default {
    name: 'listItem',
    props: {
      list: {
        type: Array,
        default: () => ({})
      },
      isTop: {
        type: Boolean,
        default: false
      },
      isEnd: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    filters: {
      moment (date) {
        // 超过七天显示日期
        if (moment(date).isBefore(moment().subtract(7, 'days'))) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          // 显示 多少时间前
          return moment(date).from(moment())
        }
      }
    },
    computed: {
      lists () {
        return _.map(this.list, item => {
          switch (item.catalog) {
            case 'ask':
              item.catalog = '提问'
              break
            case 'share':
              item.catalog = '分享'
              break
            case 'discuss':
              item.catalog = '讨论'
              break
            case 'advise':
              item.catalog = '建议'
              break
            case 'notice':
              item.catalog = '公告'
              break
            case 'logs':
              item.catalog = '动态'
              break
          }
          return item
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.nomore{
  font-size: 16px;
  padding: 30px 0;
}
</style>
