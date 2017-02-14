/*
 * kt-membership-statistics-service 1.0.0
 * 방문자, 메뉴, 서비스 별로 다양한 통계 데이터와 차트
 * https://cms.membership.kt.com
 * Copyright ©2011 - 2017 KT corp. All rights reserved.
*/
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var _ = require('underscore');

//var request = require('request');

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
    //     host: 'http://daesun2017.appspot.com' + req._parsedUrl.path,
    //     port: 80,
    //     //path: 'req._parsedUrl.path',
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/x-www-form-urlencoded'
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
    //         //var parsed = JSON.parse(body);
    //         //res.send(parsed)
    //     });
    // });
    //
    // x.end();

    // http.request('http://daesun2017.appspot.com' + req._parsedUrl.path,function(error, response, body){
    //     if (!error) {
    //         console.log(body)
    //         res.send(body)
    //     } else {
    //         console.log(error);
    //     }
    // })

        var options = {
          host: 'daesun2017.appspot.com',
          path: req._parsedUrl.path
        };

        var reqq = http.get(options, function(ress) {
          //console.log('STATUS: ' + res.statusCode);
          //console.log('HEADERS: ' + JSON.stringify(res.headers));

          // Buffer the body entirely for processing as a whole.
          var bodyChunks = [];
          ress.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
          }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
            // ...and/or process the entire body here.
            res.send(body)
          })
        });

        reqq.on('error', function(e) {
          console.log('ERROR: ' + e.message);
        });

}

var queryStringToJSON = function (queryString) {
  if(queryString.indexOf('?') > -1){
    queryString = queryString.split('?')[1];
  }
  var pairs = queryString.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return result;
}

var serialize = function(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

var getBooks = function(req, res) {

    console.log('/v1/search/book.json?' + req._parsedUrl.query)

    //console.log( JSON.parse(decodeURI(req._parsedUrl.query)) )

    //((req._parsedUrl.query).split('&')

    var queryJson = queryStringToJSON(req._parsedUrl.query)

    console.log(queryJson)

    //queryJson.query = encodeURIComponent(queryJson.query);


    var options = {
        host: 'openapi.naver.com',
        //port: 8080,
        //path: '/v1/search/book.json?query=' + encodeURIComponent('문재인')  +'&dispay=100&start=1',//req._parsedUrl.path,
        path: '/v1/search/book.json?' + serialize(queryJson),
        method: 'GET',
        //query : req._parsedUrl.query,
        headers: {
            accept: 'application/json',
            'X-Naver-Client-Id' : 'cC0cf4zyUuLFmj_kKUum',
            'X-Naver-Client-Secret' : 'EYop6SBs44'
        }
    };
    var x = https.request(options,function(ress){
        var body = '';
        ress.on('data',function(d){
            body += d;
        });
        ress.on('end', function() {
            console.log('======================================')
            console.log(body)
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            res.send(parsed)
        });
    });

    x.end();

    // var options = {
    //   host: 'openapi.naver.com',
    //   path: '/v1/search/book.json?query=문재인&dispay=100&start=1',//req._parsedUrl.path,
    //   headers: {
    //       accept: 'application/json',
    //       'X-Naver-Client-Id' : 'cC0cf4zyUuLFmj_kKUum',
    //       'X-Naver-Client-Secret' : 'EYop6SBs44'
    //   }
    // };
    //
    // var reqq = https.get(options, function(ress) {
    //   //console.log('STATUS: ' + res.statusCode);
    //   //console.log('HEADERS: ' + JSON.stringify(res.headers));
    //
    //   // Buffer the body entirely for processing as a whole.
    //   var bodyChunks = [];
    //   ress.on('data', function(chunk) {
    //     // You can process streamed parts here...
    //     bodyChunks.push(chunk);
    //   }).on('end', function() {
    //     var body = Buffer.concat(bodyChunks);
    //     console.log('BODY: ' + body);
    //     // ...and/or process the entire body here.
    //     res.send(body)
    //   })
    // });
    //
    // reqq.on('error', function(e) {
    //   console.log('ERROR: ' + e.message);
    // });
}

//getBooks()

app.get('/apis/timeline', getFunc)

app.get('/apis/books', getBooks)

app.get('/apis/cp/group' ,getFunc)

app.get('/apis/cp/daily', getFunc)

app.listen((process.env.PORT || 8080), function () {
    //console.log('Example app listening on port 8080!');
});
