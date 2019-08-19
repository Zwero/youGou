/**
 * 封装一个类似于axios的请求工具库.
 * 
 * axios的例子: 
 * 
 * 1. 省政府基准路径
 * axios.default.baseURL = ""
 * 
 * 2.发起请求, 返回的是promise
 * axios({参数}).then()>catch()
 * 
 * 3.监听错误
 * axios.onError(回调函数)
 * 
 * 封装思路:
 * 采用单例的封装模式
 */

/**
 * 发起请求
 */
const request = function (config = {}) {

  // url为空
  if (!config.url) {
    throw new Error("请输入url地址！");
    return;
  }

  // 拼接上baseURL

  // 条件是config.url开头是否包含http或者https
  // 如果包含了http不加上默认的baseURL
  // search的使用： https://www.w3school.com.cn/jsref/jsref_search.asp
  // 注释：如果没有找到任何匹配的子串，则返回 -1。
  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url;
  }

  return new Promise ( (resolve, reject) => {

    wx.request({
      // 用调用传入的对象解构
      ...config,
      success(res) {
        // 成功之后
        resolve(res);
        // console.log(res)
      },

      fail () {},

      // 后台接口可能会自定义错误, 错误的处理函数放到complete来执行
      complete(res) {

        //循环调用错误的错误函数
        request.errors.forEach(fn => {
          fn(res);
        })
      }
    })
  })
};

/**
 * request的默认属性
 */
request.defaults = {
  // 基准路径
  baseURL:""
};

//保存错误函数
request.errors = [];

/**
 * 接收错误的触发函数
 * 
 * @参数:callback | 传入的错误函数
 */
request.onError = function(callback) {
  //先保存到错误时间中, 请求错误的时候统一调用
  request.errors.push(callback)
}

export default request; 