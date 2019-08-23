// pages/auth/index.js
import request from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 授权点击
  authorization(msg) {

    // console.log(msg)
    // console.log(msg.detail.encryptedData, "授权信息")

    // 获取code
    wx.login({
      success(res) {
        // console.log(res, "授权信息")
        if (res.code) {
          // 拼接参数
          const data = {
            code: res.code,
            encryptedData: msg.detail.encryptedData,
            rawData: msg.detail.rawData,
            iv: msg.detail.iv,
            signature: msg.detail.signature,
          }
          request({
            url: "/users/wxlogin",
            method: 'POST',
            data
          }).then( res=> {
            //  console.log(res,"toke")
            console.log(res.data.message)
            const {token} = res.data.message
            // 把token保存到本地
            wx.setStorageSync("token", token)
            wx.navigateBack({
              delta: 2
            })
          })
        } else {
          console.log("登录失败", res.errMsg)
        }
      }
    })
  }

})