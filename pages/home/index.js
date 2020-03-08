// pages/home/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    commingSoon: [],
    top250: [],
    count:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURL = `${app.globalData.doubanBase}${app.globalData.inTheatersURL}?start=0&&${this.data.count}`;
    var commingSoonURL = `${app.globalData.doubanBase}${app.globalData.commingSoonURL}?start=0&&${this.data.count}`;
    var top250URL = `${app.globalData.doubanBase}${app.globalData.top250URL}?start=0&&${this.data.count}`;
    this.getMovieListData(inTheatersURL, 'inTheaters')
    this.getMovieListData(commingSoonURL, 'commingSoon')
    this.getMovieListData(top250URL,'top250')
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
    wx.stopPullDownRefresh()
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
  movetoSearch () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getMovieListData (url, _type) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url,
      header: {'content-type': 'json'},
      success: res => {
        this.setData({[_type]: res.data.subjects})
        // console.log(res.data)
      },
      fail: err => console.log(err),
      complete () {
        wx.hideToast()
      }
    })
  },
  movetoMore (e) {
    var typeId = e.currentTarget.dataset.typeId
    wx.navigateTo({
      url: '../more/more?typeId=' + typeId,
    })
  },
  movetoDetail (e) {
    var movieId = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '../detail/detail?movieId=' + movieId,
    })
  }
})