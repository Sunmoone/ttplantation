export function request(url,data,success){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: `http://10.8.127.110/${url}`,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      success.call(this, res)
    },
    fail: function(res){
      console.log(res)
      wx.showToast({
        title: res.data,
      })
    },
    complete: function(){
      wx.hideToast()
    }
  })
}