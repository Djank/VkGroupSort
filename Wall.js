/**
 * Created by evgeny on 01.09.14.
 */
var request = require('request');
var Storage = require('./Storage.js');
var Vk = require('./Vk.js');

var owner = {
    id: -34049481
};
var conString = "postgres://postgres:3611umn@localhost/vkontakte";
//var storage = new Storage(conString);
var vk = new Vk();

// get count of records from VK
/*vk.countOfPosts(owner.id, function (err, count) {
 if (err) {
 console.log('Error: ' + err);
        return;
    }
    console.log('Count of posts in vk: ' + count);
 });*/

vk.getPosts(owner.id, 346, function (errors, posts) {
    console.log('Errors count: ' + errors.length);
    console.log('posts count: ' + posts.length)
    var sumOfLikes = posts.reduce(function (prev, p) {
        return prev + p.likes.count;
    }, 0);
    console.log('sum of likes: ' + sumOfLikes);
});

/*var countInStorage = storage.countOfPosts(owner.id);

 var numberToDownloads = countInVK - countInStorage + 1;

// Вычисляем кол-во записей для скачивания
if (numberToDownloads < 0) // кол-во записей меньше 0, это странно, сделаем 3.
    numberToDownloads = 3;

// Загружаем последнии записи
var lastRecords = vk.getPosts(numberToDownloads);
var lastRecordInStorage = storage.getLastPost(owner.id);
 *//* TODO: Надо проверить, что lastRecordInStorage попал в lastRecords, и если нет
 то надо загружать ещё со стены, пока не найем *//*
 if (lastRecords !== []) {
    storage.savePosts(lastRecords);
    storage.end();
 }*/


