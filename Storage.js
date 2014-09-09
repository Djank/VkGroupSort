/**
 * Created by evgeny on 08.09.14.
 */

var pg = require('pg');

var Storage = function (connectionString) {
    this.client = new pg.Client(connectionString);
    this.client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
    });
};

Storage.prototype.countOfPosts = function (owner_id, callback) {
};

Storage.prototype.savePosts = function (posts, callback) {
    var self = this;
    posts.forEach(function (post, index) {
        var sql = {
            text: 'INSERT INTO posts(post_id, owner_id, from_id, ' +
                'create_time, likes, reposts, jsondata) ' +
                'VALUES ($1,$2,$3,to_timestamp($4),$5,$6,$7)',
            values: [ post.id, post.owner_id, post.from_id,
                post.date, post.likes.count, post.reposts.count,
                    '' + JSON.stringify(post) + '']
        };
        self.client.query(sql, function (err, res) {
            if (err) {
                console.error(err);
            }
            if (index === posts.length - 1)
                callback();
        });
    });
};

Storage.prototype.end = function () {
    this.client.end();
};

module.exports = Storage;


