// pages/zixun/zixun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodata:false,
    allyiyuan:'全部医院',
    allkeshi:'全部科室',
    sort:'距离排序',
    content: [],
    nv: ['衣服', '裤子', '内衣', '服饰', '衣服', '裤子', '内衣', '服饰', '衣服', '裤子', '内衣', '服饰'],
    px: ['离我最近', '好评优先'],
    qyopen: false,
    qyshow: true,
    nzopen: false,
    pxopen: false,
    nzshow: false,
    pxshow: false,
    isfull: false,
    cityleft: {},
    citycenter: {},
    cityright: {},
    select1: '',
    select2: '',
    shownavindex: ''
  },
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.px,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  selectleft: function (e) {
    this.setData({
      cityright: {},
      citycenter: this.data.cityleft[e.currentTarget.dataset.city].members,
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  selectcenter: function (e) {
    console.log(e);
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      allyiyuan: e.target.dataset.name,
      yyid: e.target.dataset.city,
      shownavindex: 0
    })
    var that = this;
    var yyid = e.target.dataset.city;
    var ksid = this.data.ksid;
    var user = { "head": { "versioncode": "19", "devicenum": "354782061676420", "fromtype": "4", "target": "noTokenPrefectureControl", "method": "teamsChoice" }, "body": { "hospitalid": yyid,"departmentid":ksid} };
    wx.request({
      url: 'https://api.zhiyi365.cn/qd/api/client/services', //仅为示例，并非真实的接口地址
      data: JSON.stringify(user),
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log(res.data.data.teams.length);
        if (res.data.data.teams.length == 0) {
          that.setData({
            nodata: true,
            teamArr: res.data.data.teams
          })
        }
        else {
          that.setData({
            nodata: false,
            teamArr: res.data.data.teams
          })
        }
      }
    })
  },
  selectks: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      allkeshi: e.target.dataset.name,
      ksid: e.target.dataset.id,
      shownavindex: 0
    })
    var that = this;
    var ksid = e.target.dataset.id;
    var yyid = this.data.yyid;
    var user = { "head": { "versioncode": "19", "devicenum": "354782061676420", "fromtype": "4", "target": "noTokenPrefectureControl", "method": "teamsChoice" }, "body": { "hospitalid": yyid, "departmentid": ksid } };
    wx.request({
      url: 'https://api.zhiyi365.cn/qd/api/client/services', //仅为示例，并非真实的接口地址
      data: JSON.stringify(user),
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log(res.data.data.teams.length);
        if (res.data.data.teams.length==0){
          that.setData({
            nodata: true,
            teamArr: res.data.data.teams
          })
        }
        else{
          that.setData({
            nodata: false,
            teamArr: res.data.data.teams
          })
        }
      }
    })
  },
  sort: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      sort: e.target.dataset.name,
      shownavindex: 0
    })
  },
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    })
  },
  teamDetial: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../team/team?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = { "head": { "versioncode": "19", "devicenum": "354782061676420", "fromtype": "4", "target": "noTokenPrefectureControl", "method": "teamsChoice" }, "body": {} };
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
          teamArr: res.data.data.teams
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    var user2 = { "head": { "versioncode": "19", "devicenum": "354782061676420", "fromtype": "4", "target": "noTokenPrefectureControl", "method": "findCondition" }, "body": {} };
    wx.request({
      url: 'https://api.zhiyi365.cn/qd/api/client/services', //仅为示例，并非真实的接口地址
      data: JSON.stringify(user2),
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log('筛选条件接口');
        console.log(res.data);
        that.setData({
          cityleft:res.data.data.citys,
          nv: res.data.data.departments
        })
      }
    })
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