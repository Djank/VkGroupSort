/**
 * Created by evgeny on 01.09.14.
 */
var request = require('request');
var Storage = require('./Storage.js');
var Vk = require('./Vk.js');

var owner = {
    id: -1
};
var conString = "postgres://postgres:3611umn@localhost/vkontakte";
var storage = new Storage(conString);
var vk = new Vk();

var countInVK = vk.countOfPosts(owner.id); // get count of records from VK
var countInStorage = storage.countOfPosts(dbConnetion, owner.id);

var numberToDownloads = countInVK - countInStorage + 1;
/*вычисляем кол-во записей для скачивания*/
if (numberToDownloads < 0) // кол-во записей меньше 0, это странно, сделаем 3.
    numberToDownloads = 3;
var lastRecords = getLastRecords(numberToDownloads); // Загружаем последнии записи
var lastRecordInStorage = getLastWallRecord(dbConnection, owner.id);
/* TODO: Надо проверить, что lastRecordInStorage попал в lastRecords, и если нет
 то надо загружать ещё со стены, пока не найем */
if (lastRecords !== []) {
    saveRecordsInStorage(dbConnection, lastRecords);
    updateCountOfRecordsInStorage(dbConnection)
}


/*var params = {
 v: '5.24',
 owner_id: '-34049481',
    count: 10
};

callVk('wall.get', params, function (err, body) {
    if (!err) {
        console.log(body.response.items);
    }
 });*/


