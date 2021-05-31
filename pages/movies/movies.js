// movies.js
var averageScorce01 = require('../../utils/scorce.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingsoon: {},
        top250: {},
        movieGrid:false,
        containerShow:true,
        clearButton:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.initPage();  
    },
    initPage:function(){
      // let promise= new Promise();
      var inTheatersUrl = app.musicData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3&apikey=0b2bdeda43b5688921839c8ecb20399b';
      var comingsoonUrl = app.musicData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3&apikey=0b2bdeda43b5688921839c8ecb20399b';
      var top250 = app.musicData.doubanBase + '/v2/movie/top250' + '?start=0&count=3&apikey=0b2bdeda43b5688921839c8ecb20399b';
      // this.requestTap(top250, "top250", "豆瓣top250");
      // this.requestTap(comingsoonUrl, "comingsoon", "即将上映");
      // this.requestTap(inTheatersUrl, "inTheaters", "正在热映");
      Promise.
        all([this.requestTap(top250, "top250", "豆瓣top250"), this.requestTap(comingsoonUrl, "comingsoon", "即将上映"), this.requestTap(inTheatersUrl, "inTheaters", "正在热映")])
        .then(res => {
          wx.stopPullDownRefresh();
        }).catch(err=>{
          wx.stopPullDownRefresh();
        })
    },
    onMoreTap:function(event){
        var category=event.currentTarget.dataset.category;
        wx.navigateTo({
            url: '/pages/index/movie-details/movie-detail?category='+category,
        })
    },
    onMoviesItemTap: function (event) {
      const id = event.currentTarget.dataset.id;
      console.log(id,'id123');
      wx.navigateTo({
        url:'/pages/movies/movie-details/movie-details?id='+id,
      })
    },
    requestTap: function (url, setKey, categoryTitle) {
        return new Promise((resolve,reject)=>{
          var that = this;
          wx.request({
            url: url,
            data: {},
            method: "GET",
            header: {
              'content-type': 'application/xml'
            },
            success: function (res) {
              that.dataListObj(res.data, setKey, categoryTitle);
              resolve();
            },
            fail: function (res) {
              console.log("请求失败:" + res);
              reject();
            }
          })
        })
        
    },
    
    onBindFocus:function(event){
        console.log("获取焦点...");
        this.setData({
            movieGrid: true,
            containerShow: false,
            clearButton: true
        })
    },
    onCancelTap:function(event){
        this.setData({
            movieGrid: false,
            containerShow: true,
            clearButton: false
        })
    },
    onBindConfirm:function(event){
        console.log("您点击了完成按钮...");
    },
    dataListObj: function (movies, setKey, categoryTitle) {
        var movie = [];
        for (var idx in movies.subjects) {
            var title = movies.subjects[idx].title;
            if (title.length >= 6) {

                title = title.substring(0, 6) + "...";
            }

            var coverImgUrl = movies.subjects[idx].images.small;
            var average = movies.subjects[idx].rating.average;
            var movieId = movies.subjects[idx].id;
            var scorce = movies.subjects[idx].rating.stars;
            var starts=averageScorce01.averageScorce(scorce);
           
            var temp = {
                title: title,
                coverImgUrl: coverImgUrl,
                average: average,
                movieId: movieId,
                scorce:scorce,
                starts:starts
            };
            movie.push(temp);
            var readyData = {};
            readyData[setKey] = {
                categoryTitle: categoryTitle,
                movie: movie
            };
        }
       
        this.setData(readyData);
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
    onPullDownRefresh: function(){
      this.initPage();
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