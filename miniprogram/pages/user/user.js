
// // pages/user/user.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },



//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
//index.js
let interstitialAd = null
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    modalHidden: true,
    // avatar1Url: './shoucang.jpg',
    // avatar2Url: './qingli.jpg',
    // avatar3Url: './xinxi.jpg',
    // avatar4Url: './more.jpg',
    // avatar5Url: './fanhui.jpg',
    logged: false,
    takeSession: false,
    requestResult: ''
  },

//跳转收藏区
  goNext: function () {
    wx.navigateTo({
      url: '../about/about'//跳转
    })
  },
  //跳转迷你世界
  goText: function () {
    wx.navigateTo({
      url: '../gnuemsgPages/gnuemsgPages?id=6025bedb5e71d7650013307513058e57'
    })
  },

//分享页面
  onShareAppMessage: function(res){
    if(res.from === 'button'){
      console.log(res.target, res)
    }
return{
   title:'迷你世界等着你',
   path:'pages/index/index',
   imageUrl:'../../image/gnue1.jpg'
}

  },
  /**
      * 显示弹窗
      */
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },


  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../index/index',
      })
      return
    }
   //广告插入
    // if (wx.createInterstitialAd) {
    //   interstitialAd = wx.createInterstitialAd({
    //     adUnitId: 'adunit-8a6829990396f0e0'
    //   })
    //   interstitialAd.onError(err => {
    //     console.log(err);
    //   })
    // }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  // onShow: function () {
  //   if (interstitialAd) {
  //     interstitialAd.show().catch((err) => {
  //       console.error(err)
  //     })
  //   }
  // },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../touxiang/touxiang',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../about/about',
        })
      }
    })
  },

  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
