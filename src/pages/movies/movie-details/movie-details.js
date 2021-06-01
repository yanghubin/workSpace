// pages/movies/movie-details/movie-details.js
var app = getApp();
import http from '../../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExpand:false,//是否展开
    detail:{},//电影详情
    downArrow:'../../../images/down-arrow.png',
    upArrow:'../../../images/up-arrow.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id}=options;
    this.getMoviesDetail(id);
  },

  goToMovie:function(e){
    const {url}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/webview/index?url='+url,
    })
  },

  onExpand:function(){
    console.log(this.data);
    this.setData({
      isExpand:!this.data.isExpand
    })
  },

  getMoviesDetail: function (id){//获取电影详情
    var url = '/v2/movie/subject/'+ id + '?apikey=0b2bdeda43b5688921839c8ecb20399b';
    http(url).then(res=>{
      console.log(res,'获取电影详情')
      const {data}=res;
      let actor=[];
      let geners=[];
      (data.writers||[]).map(v=>{
        actor.push(v.name);
      })
      data._actor=actor.join('/');
      data._genres=data.genres.join('/');
      console.log(data,'6666')
      this.setData({
        detail:data
      })
    })

    // wx.request({
    //   url: allurl,
    //   data: {},
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/xml'
    //   },
    //   success: function (res) {
    //     console.log(res,'456789')
    //   },
    //   fail: function (res) {
    //     console.log("请求失败:" + res);
        
    //   }
    // })
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