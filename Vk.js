/**
 * Created by evgeny on 08.09.14.
 */
var request = require('request');

var vk = function(){
};

var getLastRecords = function (numberToDownloads) {
    var currentOffset = 0;
    var records = [];
    // TODO: Цикл загрузки записей со стены
    records += getRecords(currentOffset, Math.min(100, numberToDownloads));
};

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

module.export = vk;