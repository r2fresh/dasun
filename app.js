/*
 * kt-membership-statistics-service 1.0.0
 * 방문자, 메뉴, 서비스 별로 다양한 통계 데이터와 차트
 * https://cms.membership.kt.com
 * Copyright ©2011 - 2017 KT corp. All rights reserved.
*/
var express = require('express')
,app = express()
,http = require('http');

app.get('/',function(req, res){
    res.sendFile(__dirname + '/src/index.html')
})

app.use(express.static('src'));

var getFunc = function(req, res) {

    //var token = req.headers['x-auth-token'];

    var options = {
        host: 'daesun2017.appspot.com',
        port: 80,
        path: 'req._parsedUrl.path',
        method: 'GET',
        headers: {
            //accept: 'application/json',
            accept:'application/xhtml+xml'
        }
    };
    var x = http.request(options,function(ress){
        var body = '';
        ress.on('data',function(d){
            body += d;
        });
        ress.on('end', function() {
            console.log(body)
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            res.send(parsed)
        });
    });

    x.end();

}

app.get('/apis/cp/group', getFunc)

app.listen((process.env.PORT || 8080), function () {
    console.log('Example app listening on port 8080!');
});
