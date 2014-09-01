/**
 * Created by evgeny on 01.09.14.
 */
var http = require('http');

var params = 'wall.get?'
    + 'v=5.24'
    + '&owner_id=-34049481'
    + '&count=1';

var options = {
    host: 'api.vk.com',
    port: 80,
    path: '/method/' + params
};
http.get(options, function(res){
    var data = String();
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var o = JSON.parse(data);
        console.dir(o);
        console.log(JSON.stringify(o, undefined, ' '));
    });
}).on('error', function(res){
    console.log('EGGOOGGGG!!!' + res);
});