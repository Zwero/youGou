// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      userName: "", // 收货人
      telNumber: "", // 电话
      detaliInfo: "" // 地址
    },
    goods: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 当切换页面的时候重新加载数据
  onShow: function(options) {
    // 获取本地存储的数据
    const goods = wx.getStorageSync("goods") || {}

    this.setData({
      goods
    })
    console.log(this.data.goods, '这是保存到对象里的')
  },

  // 收货地址
  handleGetAddress() {

    wx.chooseAddress({
      success: res => {
        console.log(res, "收货地址")
        console.log(123)
        // 获取收货地址
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detaliInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        console.log(this.data.address)
      }
    })
  },

  // 计算总价格
  getAllprice(){
    let price = 0;

    Object.keys(this.data.goods).forEach(v => {
      price += this.data.goods[v].goods-price;
    })

    this.setData({
      allPrice: price
    })
  },

  // 选中状态的方法
  handleSelected(e){
    console.log(e)
    const { id } = e.currentTarget.dataset

    const {goods} = this.data

    // 把选中状态取反
    goods[id].selected = !goods[id].selected

    this.setData({
      goods
    })
    // 计算总价
    this.getAllprice()
  }

})