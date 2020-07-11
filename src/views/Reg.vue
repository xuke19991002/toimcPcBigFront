<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <ValidationObserver ref="observer" v-slot="{validate}">
              <div class="layui-form layui-form-pane">
                <form>
                  <div class="layui-form-item">
                    <ValidationProvider name="username" rules="required|email" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="username" class="layui-form-label">用户名</label>
                        <div class="layui-input-inline">
                          <input
                            id="username"
                            autocomplete="off"
                            class="layui-input"
                            placeholder="请输入用户名"
                            v-model="username"
                            @keyup.enter="submit"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="name" class="layui-form-label">昵称</label>
                    <ValidationProvider name="name" rules="required|min:4|name" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          id="name"
                          autocomplete="off"
                          class="layui-input"
                          placeholder="请输入昵称"
                          v-model="name"
                          @keyup.enter="submit"
                        />
                      </div>
                      <div class="layui-form-mid error">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="password" class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            id="password"
                            autocomplete="off"
                            class="layui-input"
                            placeholder="请输入密码"
                            v-model="password"
                            @keyup.enter="submit"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-row">
                        <label for="repassword" class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            id="repassword"
                            autocomplete="off"
                            class="layui-input"
                            placeholder="请输入密码"
                            v-model="repassword"
                            @keyup.enter="submit"
                          />
                        </div>
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="code" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            id="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                            v-model="code"
                            @keyup.enter="submit"
                          />
                        </div>
                        <div style="display: inline-block;" v-html="svg" @click="getCode"></div>
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <!-- 校验登录 -->
                    <button class="layui-btn" type="button" @click="validate().then(submit)">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
                </form>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCodeApi, regApi } from '@/api/login'
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { mapState } from 'vuex'

  export default {
    name: 'Reg',
    components: {
      ValidationProvider,
      ValidationObserver
    },
    computed: {
      ...mapState(['sid'])
    },
    data () {
      return {
        svg: '',
        username: '',
        name: '',
        password: '',
        repassword: '',
        code: ''
      }
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
      async submit () {
        const isValid = await this.$refs.observer.validate()
        if (!isValid) return
        regApi({
          username: this.username,
          name: this.name,
          password: this.password,
          code: this.code,
          sid: this.$store.state.sid
        }).then(res => {
          if (res.code === 200) {
            this.username = ''
            this.name = ''
            this.password = ''
            this.code = ''
            this.repassword = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
            this.$alert('注册成功').then(() => {
              this.$router.push('/login')
            })
            // 跳转登录
            return this.$router.push('/login')
          }
          if (res.code === 401) {
            // 设置验证错误 表单提示信息
            // username => '用户名已注册'
            // res.data = {username: [], name: [], code: []}
            this.$refs.observer.setErrors(res.data)
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
