<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form>
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">用户名</label>
                    <ValidationProvider name="username" rules="required|email" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          id="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                          v-model="username"
                          @keyup.enter="login"
                        />
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
                    <ValidationProvider name="password" rules="required|min:6" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          id="password"
                          type="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                          v-model="password"
                          @keyup.enter="login"
                        />
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider ref="codeField" name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="code" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            id="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                            v-model="code"
                            @keyup.enter="login"
                          />
                        </div>
                        <div style="display: inline-block;" v-html="svg" @click="getCode"></div>
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </ValidationProvider>

                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="login">立即登录</button>
                    <span style="padding-left:20px;">
                    <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                  </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </ValidationObserver>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCodeApi, loginApi } from '@/api/login'
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import {mapState} from 'vuex'

  export default {
    name: 'Login',
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data () {
      return {
        svg: '',
        username: '',
        password: '',
        code: ''
      }
    },
    computed: {
      ...mapState(['sid'])
    },
    mounted () {
      this.getCode()
    },
    methods: {
      getCode () {
        getCodeApi(this.sid).then(res => {
          this.svg = res.data
        })
      },
      async login () {
        const isValid = await this.$refs.observer.validate()
        if (!isValid) return
        loginApi({
          username: this.username,
          password: this.password,
          code: this.code,
          sid: this.$store.state.sid
        }).then(res => {
          if (res.code === 200) {
            this.username = ''
            this.password = ''
            this.code = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
          } else if (res.code === 401) {
            this.$refs.codeField.setErrors([res.msg])
          }
        }).catch(err => {
          if (err.response.data.code === 500) {
            this.$alert('用户名或密码错误')
          } else {
            this.$alert('服务器错误')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error {
    color: #c00;
  }

  .layui-row + .error {
    margin-top: 5px;
  }
</style>
