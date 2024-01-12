const Subtitle = require("../models/subtitle");

exports.storeVideoUrl = (req, res, next) => {
  Subtitle.storeVideoUrl(req.body.url, req.body.title)
    .then(({ insertedId: id }) => {
      res.status(201).json({ id });
    })
    .catch((err) => next(err));
};

exports.storeSubtitleFile = (req, res, next) => {
  const path = require("path");

  const fullPath = path.join(
    path.dirname(require.main.filename),
    "subs",
    Date.now() + ".vtt"
  );

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

      const readStream = fs.createReadStream(result.subtitlePath);

      res.set('Content-Type', 'text/vtt');
      res.set('Content-Disposition', 'attachment');
      readStream.pipe(res);
    })
    .catch((err) => next(err));
};
