const mongodb = require('mongodb');

let _db;

const mongoConnect = (cb) => {
    mongodb.MongoClient.connect('mongodb+srv://kamal2507s:Kamalsharma1$@cluster0.t4bgmfd.mongodb.net/?retryWrites=true&w=majority').then(client => {
        _db = client.db('SubtitleEditor');
        console.log('connected to database');
        cb();
    }).catch(err => next(err));
};

const getDb = () => {
    if(_db) return _db;
    else throw new Error('db is not yet initialised');
};

module.exports = {mongoConnect, getDb};