// pages/actor/actor.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actorData: {},
    showAll: false,
    actionText: '展开'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var actorId = options.actorId
    // var actorId = 1054534
    var url = app.globalData.doubanBase + app.globalData.actorURL + actorId
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      header: { 'content-type': 'json' },
      success: res => {
        // console.log(res)
        this.setData({
          actorData: res.data
        })
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
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

  },

  /**
   * 自定义方法
   */
  previewImage(e) {
    wx.previewImage({
      urls: [e.target.dataset.src],
    })
  },
  foldContent() {
    if (this.data.showAll == false) {
      this.setData({
        actionText: '收起',
        showAll: true
      })
    } else {
      this.setData({
        actionText: '展开',
        showAll: false
      })
    }
  },
  movetoDetail(e) {
    var id = e.currentTarget.dataset.movieId
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?movieId=' + id,
    })
  }
})