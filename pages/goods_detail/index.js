
// pages/goods_details/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    // 商品详情
    detail:{},
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品详情数据
    const {id} = options
    request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    }).then(res => {
      // console.log(res,'商品详情数据')
      const { message } = res.data
      this.setData({
        detail: message,
        imgUrls: message.pics
      })
      // console.log(this.data.detail, "获取到的数据")
    })
  },

})