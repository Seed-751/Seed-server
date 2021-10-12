const jsmediatags = require("jsmediatags");

function getMetaData(file) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const { title, artist, album, track, genre } = tag.tags;
        resolve({ title, artist, album, track, genre, url: file });
      },
      onError: function (err) {
        reject(err);
      },
    });
  });
}

module.exports = getMetaData;
