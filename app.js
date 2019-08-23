//app.js
import request from "./utils/request.js";
App({
  // 项目运行时触发, 只执行一次
  onLaunch: function () {
   // 初始化request 基准路径
    request.defaults.baseURL = "https://api.zbztb.cn/api/public/v1"
    // 错误拦截
    request.onError(function (res) {
      //console.log(res)

      if (res.data.meta.status === 401) {
        // 跳转到授权页
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
    })
  },
  
})