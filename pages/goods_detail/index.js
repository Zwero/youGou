
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
        goods_id: 3
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

  // 点击购物车保存数据到本地
  handleCart(e){
    // console.log("触发")
    console.log(e)

    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000
    });

    const goods = wx.getStorageSync('goods') || {};
    // 把商品添加到本地的goods对象中
    // var goods ={}
    const {detail} = this.data;

    // 添加默认的选中状态和默认的数量
    detail.selected = true;
    detail.number = 1;

    goods[detail.goods_id] = detail;
    // 保存到本地
    wx.setStorageSync("goods", goods)
  }
  
})