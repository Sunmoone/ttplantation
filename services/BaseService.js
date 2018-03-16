export function request(url,method,data,success){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: `http://10.2.195.63:8000/api/v1/${url}/`,
    method: method||'GET',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if(res.statusCode!==200){
        wx.showToast({
          icon: 'none',
          title: res.data.message||'请求失败，请稍候重试',
        })
        return false
      }
      success.call(this, res.data)
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