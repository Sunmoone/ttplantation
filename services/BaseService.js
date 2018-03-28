import {toast} from '../utils/util.js'

const app = getApp()
export function request(url,method,data,success){
  delete data.showLoading
  wx.request({
    url: `http://10.8.127.110:9909/api/v1/${url}/`,
    method: method||'GET',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      const code = res.data.meta.statusCode
      const msg = res.data.meta.msg
      if (code === 0) {
        success.call(this, res.data)
      } else if(msg) {
        toast(msg)
      }
    },
    fail: function (res) {
      toast(res.errMsg)
    }
  })
}