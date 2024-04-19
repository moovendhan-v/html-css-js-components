import fs from 'fs';
import path from 'path';

type Callback = (error: Error | null, result?: any) => void;

function checkIfFolderExists(folderPath: string, callback: Callback): void {
  fs.access(folderPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // Directory exists
      callback(null, true);
    } else {
      // Directory does not exist
      callback(null, false);
    }
  });
}

function readFileContent(folderPath: string, fileName: string, callback: Callback): void {
  const filePath = path.join(folderPath, fileName);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return callback(err);
    }
    callback(null, content);
  });
}

interface FileContent {
  html: string;
  css: string;
  js: string;
}

function createFiles(
  basePath: string,
  category: string,
  folderName: string,
  fileContent: FileContent,
  callback: Callback
): void {
  const directoryNameForComponents = folderName;
  const folderPath = path.join(basePath, category, directoryNameForComponents);

  checkIfFolderExists(folderPath, (err, isFolderExist) => {
    if (err) {
      return callback(err);
    }
    if (isFolderExist) {
      return callback(new Error("Name already exists please choose some other files"));
    }
    const categoryFolderPath = path.join(basePath, category);
    // checking categories is available or not
    checkIfFolderExists(categoryFolderPath, (err, checkIfFolderAvailable) => {
      if (err) {
        return callback(err);
      }
      if (!checkIfFolderAvailable) {
        return callback(new Error("Categories not available"));
      }
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
          fileContent.html,
          fileContent.css,
          fileContent.js
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
  });
}

export {
  readFileContent,
  createFiles,
};