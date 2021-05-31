function averageScorce(scorce){
    var num=scorce.toString().substring(0,1);
    var result=[];
   for(var i=0;i<5;i++){
       if(i<=num){
           result.push(1)
       }else{
           result.push(0)
       }
   }
    return result;
}
// function averageScorce(scorce) {
//     var result = [];
//     var num01 = scorce.toString().substring(0, 1);
//     for (var i = 0; i < 5; i++) {
//         if (i <num01) {
//             result.push(1);
//         }
//     }
//     var num = scorce.toString().substring(1);
//     if (num == 5) {
//         result.push(2);
//     }
//     for (var i = 0; i < 5; i++) {
//         if (i >num01) {
//             result.push(0);
//         }
//     }
//     return result;
// }

function http(url,callback) {
    wx.request({
        url: url,
        data: {},
        method: "GET",
        header: {
            'content-type': 'application/xml'
        },
        success: function (res) {
            callback(res.data);
        },
        fail: function (res) {
            console.log("请求失败:" + res);
        }
    })
}


module.exports = {
    averageScorce: averageScorce,
    http:http
}