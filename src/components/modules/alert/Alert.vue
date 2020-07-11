<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="flex">{{msg}}</div>
      <div class="btnCommon success" v-if="type === 'alert'" @click="close">确定</div>
      <div v-else class="space-round">
        <div class="btnCommon cancel" @click="cancelEvent">取消</div>
        <div class="btnCommon success" @click="confirmEvent">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask"></div>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'alert'
      },
      cancel: {
        type: Function,
        default: () => ({})
      },
      confirm: {
        type: Function,
        default: () => ({})
      }
    },
    methods: {
      close (_self) {
        this.isShow = false
      },
      closeMask () {
        if(this.type !== 'alert') return
        this.isShow = false
      },
      cancelEvent(){
        this.cancel()
        this.close()
      },
      confirmEvent(){
        this.confirm()
        this.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $btn-main: #009688;
  $btn-dark: darken($btn-main, 5%);
  .alert {
    width: 300px;
    height: 150px;
    position: fixed;
    background: #fff;
    border-radius: 6px;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -75px;
    padding: 20px 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btnCommon {
    width: 105px;
    height: 32px;
    line-height: 32px;
    border-radius: 30px;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    &.success {
      background: #009688;
      color: #fff;
      &:hover {
        background: $btn-dark;
      }
    }
    &.cancel{
      background: #ededed;
      color: #666;
    }
  }
  .flex {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 998;
  }
  .space-round{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
  }
</style>
