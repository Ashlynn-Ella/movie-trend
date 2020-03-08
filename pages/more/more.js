// pages/more/more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInTheaters: false,
    showCommingsoon: false,
    showTop250: false,
    intheaters: {},
    commingsoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId
    if (typeId == 'intheaters') {
      this.setData({ showInTheaters: true, showCommingSoon: false, showTop250: false })
    } else if (typeId == 'commingsoon') {
      this.setData({ showInTheaters: false, showCommingSoon: true, showTop250: false })
    } else {
      this.setData({ showInTheaters: false, showCommingSoon: false, showTop250: true })
    }
    this.getMovieListData(typeId)
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
  getMovieListData(typeId) {
    let url
    if (typeId == 'intheaters') {
      url = app.globalData.doubanBase + app.globalData.inTheatersURL
    } else if (typeId == 'commingsoon') {
      url = app.globalData.doubanBase + app.globalData.commingSoonURL
    } else {
      url = app.globalData.doubanBase + app.globalData.top250URL
    }
    var offset = this.data[typeId].offset || 0
    var total = this.data[typeId].total || 999
    if (offset >= total) {
      return
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      header: { 'content-type': 'json' },
      data: {
        start: offset,
        count: 5
      },
      success: res => {
        var subjects = res.data.subjects
        var movies = this.data[typeId].movies || []
        var total = res.data.total
        var offset = this.data[typeId].offset || 0
        offset += subjects.length
        subjects.forEach(item => {
          let allCasts = item.casts.map(i => i.name).join(' / ')
          let allDirs = item.directors.map(i => i.name).join(' / ')
          let allGenres = item.genres.join(' / ')
          let movie = {
            ...item,
            allCasts,
            allDirs,
            allGenres,
            typeId
          }
          movies.push(movie)
        })
        this.setData({ [typeId]: { offset, total, movies } })
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },
  selectTab(e) {
    var tabId = e.currentTarget.dataset.tabId
    if (tabId == 'intheaters') {
      this.setData({ showInTheaters: true, showCommingSoon: false, showTop250:false})
    } else if (tabId == 'commingsoon') {
      this.setData({ showInTheaters: false, showCommingSoon: true ,showTop250:false})
    } else {
      this.setData({ showInTheaters: false, showCommingSoon: false, showTop250: true })
    }
    if (!this.data[tabId].movies) {
      this.getMovieListData(tabId)
    }
  },
  loadMore() {
    var typeId
    if (this.data.showInTheaters) {
      typeId = 'intheaters'
    } else if (this.data.showCommingSoon) {
      typeId = 'commingsoon'
    } else {
      typeId = 'top250'
    }
    this.getMovieListData(typeId)
  },
  movetoDetail(e) {
    var movieId = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '../detail/detail?movieId=' + movieId,
    })
  },
  buy() {
    wx.showModal({
      title: '现在就购票去看吧'
    })
  },
  want() {
    wx.showModal({
      title: '约上朋友一起去看吧'
    })
  }
})