// pages/zhongliujiuyi/zljy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  Detial: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../zhongliujiuyixiangqing/zljyxq?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = { "head": { "versioncode": "19", "devicenum": "354782061676420", "fromtype": "4", "target": "noTokenOrderControl", "method": "getGoodsFirst" }, "body": {} };
    wx.request({
      url: 'https://api.zhiyi365.cn/qd/api/client/services', //仅为示例，并非真实的接口地址
      data: JSON.stringify(user),
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log(res.data);
        that.setData({
          teamArr: res.data.data.goods
        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})