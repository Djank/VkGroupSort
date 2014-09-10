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
                callback(null, body.response);
            }
            else {
                callback(error, response);
            }
        }
    );
};

var Vk = function () {
};

Vk.prototype.countOfPosts = function (ownerId, callback) {
    var params = {
        owner_id: ownerId,
        count: 1
    };
    requestVk('wall.get', params, function (err, posts) {
        callback(err, err ? posts : posts.count);
    });
};

Vk.prototype.getPosts = function (ownerid, postCount, callback) {
    var countOfRequest = 0;
    function posts(offset, count, isLast) {
        var params = {
            owner_id: ownerid,
            count: count,
            offset: offset
        };
        requestVk('wall.get', params, function (err, posts) {
            countOfRequest += count;
            if (err) {
                callback({
                    error: err,
                    response: posts,
                    offset: offset,
                    count: count,
                    isLastChunk: countOfRequest >= postCount
                });
            }
            else {
                callback({
                    posts: posts.items,
                    offset: offset,
                    count: count,
                    isLastChunk: countOfRequest >= postCount
                });
            }
        });
    };

    var offset = 0;
    var getNextChunkOfPosts = function () {
        // Определим, какое кол-во будем получать
        // максимум - 100
        var count = Math.min(postCount - offset, 100);
        // вызовем рабочию функцию
        // последний параметр определяет, последний ли это вызов
        posts(offset, count, offset + count >= postCount);
        offset += count;
        // если больше нечего скачивать, останавливаем интервал.
        if (offset >= postCount)
            clearInterval(timer);
    };
    var delay = 400;
    // Запустим интервал на выполнение.
    var timer = setInterval(getNextChunkOfPosts, delay);
};

module.exports = Vk;