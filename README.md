## 项目说明
此项目为[慕课网大前端](https://class.imooc.com/sale/webfullstack)对应的课程学习项目，此项目为前端PC项目，技术栈为使用vue、axios、vuex、vue-router、layui作为基本开发

## 项目笔记

关于axios 返回的err信息
```javascript
// axios 返回的错误信息 err：错误信息对象
console.log('err >>> ', err)
const data = err.response.data
// err.response 包含了请求头与后台返回的一些数据参数
console.log('err.response >>> ', err.response)
// 后端接口返回的信息值
console.log('data >>> ', data)
```

### git中常用命令
- `git commit --amend` 当commit的自定义消息写错的时候 使用此命令进行更改
- git fatal: 拒绝合并无关的历史的错误解决：在pull 时候, 添加–allow-unrelated-histories参数 即可
