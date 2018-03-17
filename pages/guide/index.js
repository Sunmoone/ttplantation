import { getOrSave } from '../../services/UserService.js'

// 引导页；
const app = getApp();

Page({
    data: {},
    onLoad: function () {
        //get planting_rid
        const userInfo = app.globalData.userInfo;
        var getDataPromise = new Promise((resolve, reject) => { //请求数据
            getOrSave(userInfo, (res) => {
                app.globalData.userInfo = res.data;
                resolve(res);
            });
        });
        var waitTimePromise = new Promise((resolve, reject) => { //计时器
            setTimeout(() => {resolve('timer')}, 1500);
        })
        Promise.all([getDataPromise, waitTimePromise]).then((res) => {
            if (res != 'timer') { // 过滤计时器的resolve
                if (res.planting_rid == -1 || typeof(res.planting_rid) == "undefined") { // 没有种植记录
                    wx.redirectTo({
                        url: '../index/index'
                    });
                } else { // 如果有种植记录
                    wx.redirectTo({
                        url: `../home/index?rid=${res.planting_rid}`
                    });
                }
            }
        }).catch((e) => {
            wx.showToast({ icon: 'none', title: '网络异常，启动失败' });
        });
    }
})
