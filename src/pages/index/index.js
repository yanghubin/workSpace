
var post = require("../../posts/postList.js");//绝对路径找不到

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            {
                'url':'/images/1.jpg',
                "postId":0
            },
            {
                'url': '/images/2.jpg',
                "postId": 1
            },
            {
                'url': '/images/3.jpg',
                "postId": 2
            }       
        ],
        autoplay: true,
        interval: 5000
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.setData({
            post: post
        })
    },
    clickTo: function (event) {
        var post = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'index-detail/index-detail?id=' + post,
        })
    },
    // onswiperitemtap: function (event) {
    //     var post = event.currentTarget.dataset.postid;
    //     wx.navigateTo({
    //         url: 'index-detail/index-detail?id=' + post,
    //     })
    // },
    onswipertap:function(event){
        console.log(event)
        var post = event.target.dataset.postid;
        wx.navigateTo({
            url: 'index-detail/index-detail?id=' + post,
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
