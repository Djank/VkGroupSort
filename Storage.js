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

Storage.prototype.countOfPosts = function (owner_id) {

};

Storage.prototype.savePosts = function (posts) {
    for (var post in posts) {
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
            }
        });
    }
};

Storage.prototype.end = function () {
    this.client.end();
};

module.exports = Storage;


