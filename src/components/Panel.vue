<template>
  <div class="panel">
    <div class="fly-panel fly-column">
      <div class="layui-container">
        <ul class="layui-clear">
          <router-link class="layui-hide-xs" tag="li" to="/">
            <a>首页</a>
          </router-link>
          <router-link
            tag="li"
            :key="index"
            :to="item.path"
            v-for="(item, index) in list"
          >
            <a>{{item.title}}</a>
            <span v-if="item.isBadge" class="layui-badge-dot"></span>
          </router-link>

          <template v-if="isLogin">
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <span class="fly-mid"></span>
            </li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <a href="user/index.html">我发表的贴</a>
            </li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <a href="user/index.html#collection">我收藏的贴</a>
            </li>
          </template>
        </ul>

        <div class="fly-column-right layui-hide-xs">
          <span class="fly-search"><i class="layui-icon layui-icon-search"></i></span>
          <a class="layui-btn">发表新帖</a>
        </div>
        <div class="layui-hide-sm layui-show-xs-block"
             style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <a href="jie/add.html" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panel',
    data () {
      return {
        list: [
          {
            title: '提问',
            path: '/index/ask'
          },
          {
            title: '分享',
            path: '/index/share',
            isBadge: true
          },
          {
            title: '讨论',
            path: '/index/discuss'
          },
          {
            title: '建议',
            path: '/index/advise'
          },
          {
            title: '公告',
            path: '/index/notice'
          },
          {
            title: '动态',
            path: '/index/logs'
          }
        ],
        isLogin: this.$store.state.isLogin
      }
    }
  }
</script>
