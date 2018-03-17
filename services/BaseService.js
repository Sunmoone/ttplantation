export function request(url,method,data,success){
  if(data.showLoading!==false){
    wx.showLoading({
      title: '加载中',
    })
  }
  wx.request({
    url: `http://10.2.195.63:8000/api/v1/${url}/`,
    method: method||'GET',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      const code = res.data.meta.statusCode
      const msg = res.data.meta.msg || '请求失败，请稍候重试'
      if (code === 10001 || code === 0) {
        success.call(this, res.data)
      } else {
        wx.showToast({ icon: 'none', title: msg })
      }
    },
    fail: function(res){
      wx.showToast({
        icon: 'none',
        title: '请求失败，请稍候重试',
      })
    },
    complete: function(){
      wx.hideLoading()
    }
  })
}