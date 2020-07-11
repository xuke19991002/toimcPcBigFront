import AlertComponent from '@/components/modules/alert/Alert.vue'

const Alert = {
  install (Vue) {
    const AlertConstructor = Vue.extend(AlertComponent)
    const instance = new AlertConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    Vue.prototype.$alert = msg => {
      return new Promise((resolve, reject) => {
        instance.type = 'alert'
        instance.msg = msg
        instance.isShow = true
        const close = instance.close
        instance.close = () => {
          close()
          resolve()
        }
      })
    }
    Vue.prototype.$confirm = (msg, confirm, cancel) => {
      instance.type = 'confirm'
      instance.msg = msg
      instance.isShow = true
      if (typeof confirm === 'function') {
        instance.confirm = confirm
      }
      if (typeof cancel === 'function') {
        instance.cancel = cancel
      }
    }
  }
}

export default Alert
