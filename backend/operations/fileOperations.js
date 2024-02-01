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

function createFiles(basePath, category, folderName, callback) {
  const directoryNameForComponents = folderName;
  const folderPath = path.join(basePath, category, directoryNameForComponents);
  // {html, css, js},
  fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
          return callback(err);
      }
      const filePaths = [
          path.join(folderPath, 'index.html'),
          path.join(folderPath, 'style.css'),
          path.join(folderPath, 'script.js')
      ];
      const fileContents = [
          '<!DOCTYPE html>\n<html>\n<head>\n<title>Index</title>\n</head>\n<body>\n</body>\n</html>',
          '/* Your CSS styles here */',
          '// Your JavaScript code here'
      ];
      // Write content to each file
      filePaths.forEach((filePath, index) => {
          fs.writeFile(filePath, fileContents[index], 'utf8', (err) => {
              if (err) {
                  return callback(err);
              }
              if (index === filePaths.length - 1) {
                  callback(null); 
              }
          });
      });
  });
}


module.exports = {
  readFileContent,
  createFiles,
};
