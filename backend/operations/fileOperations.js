const fs = require('fs');
const path = require('path');

function readFileContent(folderPath, fileName, callback) {
  const filePath = path.join(folderPath, fileName);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, content);
  });
}
module.exports = {
  readFileContent,
};
