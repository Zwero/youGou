// pages/search_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    pagenum: 1,
    pagesize: 10,
    keyword: "",
    goods:[],
    // 是否有更多
    hasMore: true
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      keyword: options.keyword
    })
    this.getData()
  },

  // tab 栏样式变化
  handleChange (event) {
    const {index} = event.currentTarget.dataset;
    this.setData({
      current:index
    })
  },

  // 获取数据
  getData() {
    // console.log(123)
    const { pagenum, pagesize, keyword} = this.data
    request({
      url: "/goods/search",
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res =>{
      const {goods} = res.data.message
        // 是否满足pagesize条数。不满足说明是最后一页
        if (goods.length < this.data.pagesize) {
          this.setData({
            hasMore: false
          })
        }

        // 循环给每个商品修改价格，保留两位小数点
        const newGoods = goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })

        this.setData({
          // 合并新旧的数据
          goods: [...this.data.goods, ...newGoods]
        })
      })
  

  },

// 下拉
  onReachBottom () {
    // 没有更多, 直接放回
    // console.log(567)
    // console.log(this.data.hasMore)

    if( !this.data.hasMore) {
      return;
    }
    // 页数加1
    // console.log(321)
    // 页数加1
    this.setData({
      pagenum: this.data.pagenum + 1
    });
    this.getData()
  }
})