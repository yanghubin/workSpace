
var postsData = require("../../../posts/postList.js");//绝对路径找不到
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */


    /**
     * 生命周期函数--监听页面加载
     */
    data: {
        isPlaying: false
    },
    onLoad: function (options) {
        var postId = options.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postDataOne: postData
        })
        // var collectedList={
        //     1:true,
        //     2:false,
        //     3:true
        // };
        var postscollected = wx.getStorageSync("collectedList");
        if (postscollected) {
            var postcollected = postscollected[postId];
            this.setData({
                collected: postcollected
            })
        } else {
            postscollected = {};
            postscollected[postId] = false;
            wx.setStorageSync("collectedList", postscollected);
        };
        if (app.musicData.isPlaying_g && app.musicData.currentPostId_g===postId){
            this.setData({
                isPlaying:true
            })
        }
        this.onmusicPlayPause(postId);


    },
    onmusicPlayPause: function (postId) {
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlaying: true
            })
            app.musicData.isPlaying_g=true;
            app.musicData.currentPostId_g=postId;
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlaying: false
            })
            app.musicData.isPlaying_g = false;
            app.musicData.currentPostId_g = null;
        });
    },
    oncollectedtap: function (event) {
        // var postscollected=wx.getStorageSync("collectedList");
        // var collected=postscollected[this.data.currentPostId];
        // collected=!collected;
        // postscollected[this.data.currentPostId]=collected;
        // wx.setStorageSync("collectedList", postscollected);
        // this.setData({
        //     collected:collected
        // })

        var postscollected = wx.getStorageSync("collectedList");
        var postcollected = postscollected[this.data.currentPostId];
        postcollected = !postcollected;
        postscollected[this.data.currentPostId] = postcollected;
        // this.showModal(postscollected, postcollected);
        this.showToast(postscollected, postcollected);

    },
    showModal: function (postscollected, postcollected) {
        var that = this;
        wx.showModal({
            title: '收藏',
            content: postcollected ? "是否收藏?" : "是否取消收藏?",
            showCancel: "true",
            confirmColor: "green",
            success: function (res) {
                if (res.confirm) {
                    wx.setStorageSync("collectedList", postscollected);
                    that.setData({
                        collected: postcollected
                    })
                }
            }
        })
    },

    showToast: function (postscollected, postcollected) {
        wx.setStorageSync("collectedList", postscollected);
        this.setData({
            collected: postcollected
        })
        wx.showToast({
            title: postcollected ? "收藏成功" : "取消成功",
            duration: 1000
        })
    },
    onsharetap: function () {
        var itemList = [
            "分享到朋友圈",
            "分享给朋友",
            "分享给QQ好友",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "gray",
            success: function (res) {

                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: "用户是否点击了取消按钮?" + res.cancle
                })
            }
        })
    },
    onmusictap: function () {
        var currentPostId = this.data.currentPostId;
        var postDataMusic = postsData.postList[currentPostId];
        var isPlaying = this.data.isPlaying;
        if (isPlaying) {
            wx.pauseBackgroundAudio();
            // this.data.isPlaying=false;
            this.setData({
                isPlaying: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postDataMusic.music.url,
                title: postDataMusic.music.title,
                coverImgUrl: postDataMusic.music.coverImg
            })
            // this.data.isPlaying=true;
            this.setData({
                isPlaying: true
            })
        }

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