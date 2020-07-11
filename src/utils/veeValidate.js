import { extend, localize } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  length,
  confirmed
} from 'vee-validate/dist/rules'
// localize 引入中文名
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('min', min)
extend('max', max)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('name', {
  validate: value => {
    return !(/^\d+$/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}',
  },
  // names 与组件ValidationProvider name属性相对应
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '用户名',
    code: '验证码'
  },
  // 对message进行自定义
  // fields 是对单个 names中的内容进行定义
  fields: {
    // 自定义email 对 name=email 的ValidationProvider组件 下使用的规则（email, required）进行message定义
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    password: {
      confirmed: '两次输入的密码不一致'
    },
    name: {
      min: (field, { length }) => {
        return `请在${field}输入至少${length}个字符`
      }
    }
  }
})

