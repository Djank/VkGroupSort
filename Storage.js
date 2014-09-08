/**
 * Created by evgeny on 08.09.14.
 */

var pg = require('pg');

var storage = function (connectionString) {
    this.client = new pg.Client(connectionString);
    this.client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
    });
};

storage.prototype.insertPost = function (post) {
    var insertPost = {
        text: 'INSERT INTO posts(post_id, owner_id, from_id, ' +
            'create_time, likes, reposts, jsondata) ' +
            'VALUES ($1,$2,$3,to_timestamp($4),$5,$6,$7)',
        values: [ post.id, post.owner_id, post.from_id,
            post.date, post.likes, post.reposts,
                '' + JSON.stringify(post) + '']
    };
    this.client.query(insertPost, function (err, res) {
        if (err) {
            throw err;
            console.log(err);
            return;
        }
        console.log("insert new post in db.");
    });
};

storage.prototype.end = function () {
    this.client.end();
};

module.exports = storage;


