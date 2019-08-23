// pages/order_enter/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],  // 商品列表
    sites:{},  // 收货地址
    allPrice: 0  // 总价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const cartList = wx.getStorageSync("cartList") || {};
    const sites = wx.getStorageSync("sites") || {};
    // 获取总价
    let allPrice = 0
    cartList.forEach(v => {
      // console.log(v)
      allPrice += v.goods_price * v.number
    })
    // console.log(allPrice)

    this.setData({
      cartList,
      sites,
      allPrice
    })
  },

  // 点击支付  
  handelPay () {
    // console.log(123)
    const { cartList, sites, allPrice} = this.data
    const token = wx.getStorageSync("token") || {};
    // console.log(token,'这是token')
    const goods = cartList.map( v => {
      return {
        goods_id : v.goods_id,
        goods_number : v.number,
        goods_price : v.goods_price
      }
    })
    // console.log(goods)
    request({
      url: '/my/orders/create',
      method: "POST",
      data: {
        order_price: allPrice,
        consigaee_addr: sites.detaliInfo,
        goods
      },
      header: {
        Authorization: token || ""
      }
    }).then( res => {
      // console.log(res)
      const { order_number } = res.data.message
      request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        },
        header: {
          Authorization: token || ""
        }
      }).then( res => {
        // console.log(res,"支付")
        const {pay} = (res.data.message)
        wx.requestPayment(
          pay
        )
        // console.log(888)
      })
    })
  }

})