const { getDb } = require("../utils/database");
const mongodb = require("mongodb");

module.exports = class Subtitle {
  static storeVideoUrl(url, title) {
    const db = getDb();
    return db.collection("Subtitles").insertOne({ videoDownloadUrl: url, title: title });
  }

  static storeSubtitleFile(id, path) {
    const db = getDb();
    return db
      .collection("Subtitles")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { subtitlePath: path } }
      );
  }

  static getSubtitleUrl(id){
    const db = getDb();

    return db.collection('Subtitles').findOne({_id: new mongodb.ObjectId(id)});
  }
};
