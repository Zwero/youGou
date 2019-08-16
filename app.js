//app.js
import request from "./utils/request.js";
App({
  // 项目运行时触发, 只执行一次
  onLaunch: function () {
   // 初始化request 基准路径
    request.defaults.baseURL = "https://api.zbztb.cn/api/public/v1"
  },
})