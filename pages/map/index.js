// pages/map/index.js
import QQMapWX from "../../utils/qqmap-wx-jssdk.js"

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'LSKBZ-LGR6G-LNAQV-I4SED-NP4I6-4YF6K' // 必填
});

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

  // 事件触发，调用接口
  nearby_search: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: 'kfc',  //搜索关键词
      location: '39.980014,116.313972',  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/zwero.jpg", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }

})