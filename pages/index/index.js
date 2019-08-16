import request from "../../utils/request.js"
Page({
  data: {
    autoplay: true,
    imgUrls: [],
    imgClassify:[],
    floors: []
  },


  onLoad () {
    request({
      url: "/home/swiperdata"
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        imgUrls: message
      })
    })

    // 分类数据
    request({
      url: "/home/catitems"
    }).then(res => {
      // console.log('分类数据',res)
      const { message } = res.data
      // console.log(message)
      this.setData({
        imgClassify: message 
      })
    })

  // 女装
    request({
      url: "/home/floordata"
    }).then(res => {
      // console.log('分类数据', res)
      const { message } = res.data
      // console.log(message)
      this.setData({
        floors: message 
      })
    })
  }
  
})
