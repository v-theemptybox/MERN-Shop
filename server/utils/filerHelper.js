const fs = require("fs");
const path = require("path");

exports.deleteFile = (filePath) => {
  // delete file on relative path
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
