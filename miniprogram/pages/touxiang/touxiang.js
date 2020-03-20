// pages/touxiang/touxiang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

      noramalData: [{
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
        "CoverHeight": 467,
        "CoverWidth": 350
    },
        {
          "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
          "CoverHeight": 467,
          "CoverWidth": 350
    }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023918503.jpg?sign=90826e327b85a1c166b779f91ee7c913&t=1584643564",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023909377.jpg?sign=a23e2cd4787e0aa47b7f5e2d23f0e990&t=1584643608",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023902804.jpg?sign=c2dfcc34c2425a6cdd25c06dff92ec91&t=1584643617",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023855652.jpg?sign=edc48fe1d6a10d659490e5baf7ce053a&t=1584643625",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023850327.jpg?sign=98e720a01cfbb38e736ef93b7e516fd4&t=1584643633",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023844384.jpg?sign=11145339c667aa432f9bc8a6a0fec2c1&t=1584643642",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023836054.jpg?sign=831897110d5c35c726546f9c938b844e&t=1584643662",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023830263.jpg?sign=c8e37ffa50e2deee3b398a482e8e5aef&t=1584643672",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023821784.jpg?sign=11fd0b0ef72e6c7194ecad6dbf6d9a6f&t=1584643681",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023813561.jpg?sign=48ab5952c112b1d5b13192c4c4b169fc&t=1584643691",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023806428.jpg?sign=3528d218a359f6d7b98527b568bc7852&t=1584643700",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
        ,
        {
          "Cover": "https://7465-text12-ced5h-1301394136.tcb.qcloud.la/touxiang/360%E6%88%AA%E5%9B%BE20200320023745846.jpg?sign=3df50ae692534b80f784c6ba7969bff2&t=1584643709",
          "CoverHeight": 467,
          "CoverWidth": 350
        }
      ],

      leftList: [],
      rightList: [],
      leftHight: 0,
      rightHight: 0
},
    //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
    onLoad: function(options) {
    var that = this;
    var allData = that.data.noramalData;
    //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
    var leftH = that.data.leftHight;
    var rightH = that.data.rightHight;
    var leftData = [];
    var rightData = [];
    for(let i = 0; i<allData.length; i++) {
  var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
  allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
  if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
    leftData.push(allData[i]);
    leftH += currentItemHeight;
  } else {
    rightData.push(allData[i]);
    rightH += currentItemHeight;
  }
}

//更新左右两栏的数据以及累计高度
that.setData({
  leftHight: leftH,
  rightHight: rightH,
  leftList: leftData,
  rightList: rightData
})
},})

  /**
   * 生命周期函数--监听页面加载
   */
 

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