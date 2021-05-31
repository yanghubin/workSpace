var doubanBase='https://api.douban.com';
function http(apiurl,{method='GET',data={}}={}){
  return new Promise((resolve,reject)=>
    wx.request({
      url: doubanBase+apiurl,
      data,
      method,
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        console.log("请求失败:" + err);
        reject(err)
      }
    })
  )
}

module.exports=http;