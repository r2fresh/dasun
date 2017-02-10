/*
 * kt-membership-statistics-service 1.0.0
 * 방문자, 메뉴, 서비스 별로 다양한 통계 데이터와 차트
 * https://cms.membership.kt.com
 * Copyright ©2011 - 2017 KT corp. All rights reserved.
*/
var express = require('express');
var app = express();
var http = require('http');

var request = require('request');

app.get('/',function(req, res){
    res.sendFile(__dirname + '/src/index.html')
})

app.use(express.static('src'));


// phantom.create(function(ph) {
//     return ph.createPage(function(page) {
//         return page.open("http://daesun2017.appspot.com/apis/timeline", function(status) {
//             console.log()
//             // return page.evaluate(
//             //     (function() {
//             //         return document.getElementById('side_today_count').textContent;
//             //     }),
//             //     function(side_today_count) {
//             //             console.log("오늘의 방문자 수 : " + side_today_count);
//             //         return ph.exit();
//             //     });
//
//         });
//     });
// });

// request('http://daesun2017.appspot.com/apis/timeline',function(error, response, body){
//     if (!error) {
//         console.log(body)
//     } else {
//         console.log(error);
//     }
// })

var getFunc = function(req, res) {

    //var token = req.headers['x-auth-token'];

    // console.log(req._parsedUrl.path)
    //
    // var options = {
    //     host: 'daesun2017.appspot.com',
    //     port: 80,
    //     path: 'req._parsedUrl.path',
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json'
    //         //accept:'application/xhtml+xml'
    //     }
    // };
    // var x = http.request(options,function(ress){
    //     var body = '';
    //     ress.on('data',function(d){
    //         body += d;
    //     });
    //     ress.on('end', function() {
    //         console.log('======================================')
    //         console.log(body)
    //         // Data reception is done, do whatever with it!
    //         var parsed = JSON.parse(body);
    //         res.send(parsed)
    //     });
    // });
    //
    // x.end();

    request('http://daesun2017.appspot.com' + req._parsedUrl.path,function(error, response, body){
        if (!error) {
            //console.log(body)
            res.send(body)
        } else {
            console.log(error);
        }
    })

}

app.get('/apis/timeline', getFunc)

app.listen((process.env.PORT || 8080), function () {
    //console.log('Example app listening on port 8080!');
});
