/**
 * Created by evgeny on 08.09.14.
 */

var pg = require('pg');
var conString = "postgres://postgres:3611umn@localhost/vkontakte";

var client = new pg.Client(conString);
client.on('drain', client.end.bind(client));
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
});
pst = {
    id: 1234,
    owner_id: -35246,
    from_id: -64275,
    date: 1195374767,
    likes: 5,
    reposts: 0
};
console.log(JSON.stringify(pst));
var insertPost = {
    text: 'INSERT INTO posts(post_id, owner_id, from_id, create_time, likes, reposts, jsondata) VALUES ($1,$2,$3,to_timestamp($4),$5,$6,$7)',
    values: [ pst.id, pst.owner_id, pst.from_id, pst.date, pst.likes, pst.reposts, '' + JSON.stringify(pst) + '']
};
client.query(insertPost, function (err, res) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("INSERRT!!!!");
});
