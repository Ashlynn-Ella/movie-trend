// pages/comment/comment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentData:[],
    total:'',
    count:10,
    start:0,
    pageSize:0,
    movieId:'',
    hasWatch:true,
    watchType:true,
    movieData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId
    this.getCommentData(movieId)  
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
    var pageSize = this.data.pageSize + 1
    var start = pageSize*this.data.count + 1

    this.setData({
      start,
      pageSize
    })
    this.getCommentData(this.data.movieId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCommentData(movieId){
    var url = `${app.globalData.doubanBase}${app.globalData.resourceURL}${movieId}/comments?start=${this.data.start}&count=${this.data.count}`
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    wx.request({
      url,
      header: { 'content-type': 'json' },
      success: res => {
        var commentData = this.data.commentData.concat(res.data.comments)
        var movieData = res.data.subject
        this.setData({
          commentData,
          total:res.data.total,
          movieId,
          movieData
        })
        wx.setNavigationBarTitle({
          title: `《${res.data.subject.title}》的短评`
        })
      },
      fail: err => console.log(err),
      complete() {          
        wx.hideToast()
      }
    })
  },
  changeDer(){
    this.setData({
      hasWatch: !this.data.hasWatch
    })
  },
  changeWatchType(){
    this.setData({
      watchType: true
    })
  },
  changeType(){
    this.setData({
      watchType: false
    })
  }
})