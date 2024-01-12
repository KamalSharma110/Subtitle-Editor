const Subtitle = require("../models/subtitle");
const path = require("path");

exports.storeVideoUrl = (req, res, next) => {
  const title = req.body.title.substring(0, req.body.title.indexOf("."));

  Subtitle.storeVideoUrl(req.body.url, title)
    .then(({ insertedId: id }) => {
      res.status(201).json({ id, title });
    })
    .catch((err) => next(err));
};

exports.storeSubtitleFile = (req, res, next) => {

  const fullPath = "subs/" + Date.now() + ".vtt";

  require("fs").writeFileSync(fullPath, req.body.data);

  Subtitle.storeSubtitleFile(req.body.id, fullPath)
    .then(() => {
      res.status(201).json({ msg: "Stored subtitles successfully." });
    })
    .catch((err) => next(err));
};

exports.downloadSubtitleFile = (req, res, next) => {
  Subtitle.getSubtitleUrl(req.params.id)
    .then((result) => {
      const fs = require("fs");

      const readStream = fs.createReadStream(
        path.join(path.dirname(require.main.filename), result.subtitlePath)
      );

      const title = encodeURIComponent(result.title);

      res.set("Content-Type", "text/vtt");
      res.set(
        "Content-Disposition",
        'attachment; filename="' + title + '.vtt"'
      );
      readStream.pipe(res);
    })
    .catch((err) => next(err));
};

exports.loadPreviousProjects = (req, res, next) => {
  Subtitle.loadPreviousProjects()
    .then((result) => res.status(200).json({ result }))
    .catch((err) => next(err));
};
