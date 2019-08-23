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
    goods: {}, // 保存添加到购物车的商品详情
    allPrice: 0, // 总价
    // 全部的选中状态
    allSelected: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 当切换页面的时候重新加载数据
  onShow: function(options) {
    
    this.handleAllSelectedChange()
  },

  // 点击单个商品时候出来全选的状态
  handleAllSelectedChange() {
    // 获取本地的商品列表
    const goods = wx.getStorageSync("goods") || {};

    // 记录状态
    let selected = true;

    // 判断全选的状态
    Object.keys(goods).forEach(v => {
      // 只要有一项的选中状态时false，全选的状态就是false
      if (!selected) return;

      if (!goods[v].selected) {
        selected = false
      }
    })

    this.setData({
      goods,
      allSelected: selected
    });
    // 计算总价格
    this.getAllPrice();
  },

  // 收货地址
  handleGetAddress() {

    wx.chooseAddress({
      success: res => {
        // console.log(res, "收货地址")
        // console.log(123)
        // 获取收货地址
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detaliInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        // 保存地址
        wx.setStorageSync("sites", this.data.address)
      }
    })
  },

  // 计算总价格
  getAllPrice() {
    // console.log(123)
    let price = 0;

    Object.keys(this.data.goods).forEach(v => {
      // item是当前的商品
      const item = this.data.goods[v];

      // 满足选中状态时true的时候才添加价格
      if (item.selected) {
        price += item.goods_price * item.number;
      }
    });

    this.setData({
      allPrice: price
    });

    // 把当前的最新商品列表保存到本地
    wx.setStorageSync("goods", this.data.goods);
  },

  // 选中状态
  handleSelected(event) {
    // 获取参数
    const {
      id
    } = event.currentTarget.dataset;

    const {
      goods
    } = this.data;

    // 把选中状态取反
    goods[id].selected = !goods[id].selected;

    this.setData({
      goods
    })
    // 计算总价格
    this.getAllPrice();
   // 如果当前的selected的值是false时候，要修改全选的状态
    this.handleAllSelectedChange();

  },

  // 增加数量
  handleAddNunber(e) {
    const {
      id
    } = e.currentTarget.dataset;
    const {
      goods
    } = this.data;

    // 给商品的数量加以1
    goods[id].number += 1;
    this.setData({
      goods
    })
    this.getAllPrice()
  },

  // 减数量
  handleMinus(e) {
    const {
      id
    } = e.currentTarget.dataset;
    const {
      goods
    } = this.data;

    // 给商品的数量加以1

    if (goods[id].number === 1) {
      wx.showModal({
        title: '提示',
        content: '你要删除商品吗?',
        success: res => {
          // 点击确认的时候触发
          if (res.confirm) {
            // 删除data.goods的商品数据
            //delete是js原生的
            delete goods[id];
            this.setData({
              goods
            })
            this.getAllPrice()
          }
        }
      })
    } else {
      goods[id].number -= 1;
      this.setData({
        goods
      })
      this.getAllPrice()
    }
  },

  //全选
  handleAllSelected() {
    // 循环给所有的商品全部状态取反
    const {
      goods
    } = this.data;
    // 循环商品的状态全部状态取反
    Object.keys(goods).forEach(v => {
      goods[v].selected = !this.data.allSelected;
    });
  // 同时修改data的goods和全部状态
    this.setData({
      goods,
      allSelected: !this.data.allSelected
    });

    this.getAllPrice();
  },

  // 结算
  handleClose() {
    console.log('结算')
    const {address, goods} = this.data
    // 判断收货地址不能为空
    if(!address.userName){
      wx.showToast({
        title: '收货地址不能为空',
        icon: "none"
      })
      return
    }

    // 判断购物车是否为空
    if(Object.keys(goods).length === 0 ) {
      wx.showToast({
        title: '购物车不能为空',
        icon: "nome"
      });
      return
    }

    // 保存选中的

    let pitchOn = []

    Object.keys(this.data.goods).forEach(v => {
      // item是当前的商品
      const item = this.data.goods[v];


      // 满足选中状态时true的时候添加商品
      if (item.selected) {
        pitchOn.push(item)
      }
    });
    console.log(pitchOn)
    wx.setStorageSync("cartList", pitchOn);

    wx.navigateTo({
      url: '/pages/order_enter/index',
    })
  }

})