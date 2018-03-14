export function request(url,method,data,success){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: `http://10.8.127.110/${url}`,
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
      success.call(this, res)
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