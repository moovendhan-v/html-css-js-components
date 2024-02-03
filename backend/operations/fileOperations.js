const fs = require('fs');
const path = require('path');

function checkIfFolderExists(folderPath, callback) {
  fs.access(folderPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // Directory exists
      callback(true);
    } else {
      // Directory does not exist
      callback(false);
    }
  });
}


function readFileContent(folderPath, fileName, callback) {
  const filePath = path.join(folderPath, fileName);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, content);
  });
}

function createFiles(basePath, category, folderName, {html, css, js}, callback) {
  const directoryNameForComponents = folderName;
  const folderPath = path.join(basePath, category, directoryNameForComponents);

  checkIfFolderExists(folderPath, (isFolderExist) => {
    if (isFolderExist) {
      return callback("Folder already exists");
    }
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        return callback(err);
      }
      console.log('Directory created successfully:', folderPath);

      const filePaths = [
        path.join(folderPath, 'index.html'),
        path.join(folderPath, 'style.css'),
        path.join(folderPath, 'script.js')
      ];
      const fileContents = [
        `${html}`,
        `${css}`,
        `${js}`
      ];
      // Write content to each file
      filePaths.forEach((filePath, index) => {
        console.log(`Files creating ${filePath} ${index}`);
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
  });
}



module.exports = {
  readFileContent,
  createFiles,
};
