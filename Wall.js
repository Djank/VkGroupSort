/**
 * Created by evgeny on 01.09.14.
 */
var request = require('request');

var callVk = function (method, params, callback) {
    var options = {
        url: 'http://api.vk.com/method/' + method,
        json: true,
        qs: params
    };

    request(options,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            }
            else {
                callback(error, response);
            }
        }
    );
};

var params = {
    v: '5.24',
    owner_id: '-34049481',
    count: 10
};

callVk('wall.get', params, function (err, body) {
    if (!err) {
        console.log(body.response.items);
    }
});
