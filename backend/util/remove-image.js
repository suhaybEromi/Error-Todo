const fs = require("fs");
const path = require("path");

const clearImage = filePath => {
  const oldImage = path.join(__dirname, "..", filePath);
  fs.unlink(oldImage, err => {
    if (err) throw err;
  });
};

module.exports = clearImage;
