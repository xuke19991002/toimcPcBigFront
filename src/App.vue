<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/layui/css/layui.css';
  @import './assets/css/global.css';
  @import './assets/layui/css/modules/layer/default/layer.css';
  #app {
    background: #f2f2f2;
  }
  .gray{
    color: #999;
  }
</style>
