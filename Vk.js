/**
 * Created by evgeny on 08.09.14.
 */
var request = require('request');

var requestVk = function (method, params, callback) {
    params.v = '5.24';
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

var Vk = function () {
};

Vk.prototype.countOfPosts = function (ownerId) {
    var params = {
        owner_id: ownerId,
        count: 0
    };
    requestVk('wall.get', params, function (err, posts) {
        if (err)
            throw err;
        return posts.count;
    });
};

Vk.prototype.getPosts = function (count) {
    var currentOffset = 0;
    var records = [];
    // TODO: Цикл загрузки записей со стены
    records += getRecords(currentOffset, Math.min(100, numberToDownloads));
};

module.export = Vk;