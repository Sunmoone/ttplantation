import { createdPlantList } from '../../services/UserService.js'

const app = getApp()

Page({
    data: {
        myTrees: [], // 存放植物信息
        treeImg: [ // 存储不同植物不同step使用的图片
            {
                pid: 1,
                data: [
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple1@3x_d5948095de31dd38717ee47ce65ccc27.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple2@3x_4d5d353152fdd52ea721dccda731543a.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/hetao3@3x_6d978cf36c56c50807ec3da3ea1fe159.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/hetao4@3x_9367c54c7cd52fa61f36f14dd0b2259d.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/hetao5@3x_d8e56f979309e41ff93ac62fe7d8cc5d.png'
                ]
            },
            {
                pid: 2,
                data: [
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple1@3x_d5948095de31dd38717ee47ce65ccc27.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple2@3x_4d5d353152fdd52ea721dccda731543a.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple3@3x_e44484595137a401beebd385fbfaa98e.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple4@3x_966dc59586ee2b55342b270c33bf9018.png',
                    'http://s2.pstatp.com/site_new/promotion/landing_page/img/apple5@3x_27598daf05062685ba880c5163a212c4.png'
                ]
            },
        ],
        treeStatus: [ // 展示植物当前时期；
            '发芽期',
            '小树期',
            '大树期',
            '开花期',
            '结果期'
        ],
        isComplete: [ // 展示作物进度的图标，分别表示进行中and已完成；
            'http://s2.pstatp.com/site_new/promotion/landing_page/img/ing@3x_2689a5389e2ead2a5d985d9504a07faf.png',
            'http://s2.pstatp.com/site_new/promotion/landing_page/img/end@3x_32446cc7f5434c94e49f4ba98d36ae8f.png'
        ],
        dayAndIcon: [] // 每棵植物显示的种植时间，取当前时间戳计算，向下取整
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '我的果树'
        })
        createdPlantList({ uid: app.globalData.userInfo.uid }, this.getMyTreesSuc);
    },
    onItemTap: function(event){ // 点击卡片跳转到植物详情页；
        wx.navigateTo({
            url: `/pages/my-tree/detail?pid=${event.currentTarget.dataset.pid}`,
        })
    },
    onShopTap: function(){ // 跳转到放心购页面
        wx.navigateTo({
            url: '/pages/my-tree/fangxingo',
        })
    },
    getMyTreesSuc: function (res) { // 获取植物列表成功后的回调；设置时间和状态数据
        var newDayAndIcon = [];
        for (var i = 0; i < res.data.length; i++) {
            newDayAndIcon.push({
                day: parseInt((new Date().getTime() / 1000 - res.data[i].start_time) / 86400),
                icon: res.data[i].complete ? this.data.isComplete[1] : this.data.isComplete[0]
            });
        }
        this.setData({
            myTrees: res.data,
            dayAndIcon: newDayAndIcon
        })
    },
})
