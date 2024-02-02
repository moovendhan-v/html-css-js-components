const fs = require('fs');
const path = require('path');
const { readFileContent } = require('../operations/fileOperations');
const baseFolderPath = '../';

//TODO readContent('index.html', "buttons" , "moovendhan", (change this directory name into dynamically)

//read file content
const readContent = (filename, catogries, catogriesFile, callback) => {
    const folderPath = path.join(baseFolderPath, 'project', 'project_datas', catogries, catogriesFile);
    console.log(`Folder paths ${folderPath}`);
    readFileContent(folderPath, filename, (err, content) => {
        if (err) {
            console.error(err);
            return callback(`${err} Internal Server Errors`);
        }
        callback(null, content);
    });
};

// reading file informations 
function readFilesInformations(catogriesName, folderName, callback) {
    console.log(`Catogreis ${catogriesName} Folder Name ${folderName}`);
    readContent('index.html', catogriesName, folderName, (htmlErr, htmlContent) => {
        if (htmlErr) {
            console.log(`html error ${htmlErr}`);
            return callback(htmlErr);
        }
        readContent('style.css', catogriesName, folderName, (cssErr, cssContent) => {
            if (cssErr) {
                console.log(`css error ${cssErr}`);
                return callback(cssErr);
            }
            readContent('script.js', catogriesName, folderName, (jsErr, jsContent) => {
                if (jsErr) {
                    console.log(`js error ${jsErr}`);
                    return callback(jsErr);
                }
                const dataObject = {
                    "post_details": {
                        "html": htmlContent,
                        "css": cssContent,
                        "js": jsContent
                    }
                };
                callback(null, dataObject);
            });
        });
    });
}

// this is asyncronus taks so that we need to handle this in a asyncronus promise way
function getLatestFiles(catogries, callback) {
    const folderPaths = path.join("../", 'project', 'project_datas', catogries);
    fs.readdir(folderPaths, (err, files) => {
      if (err) {
        return callback(`Error reading directory: ${err}`);
      }
      const promises = files.slice(0, 9).map(file => {
        return new Promise((resolve, reject) => {
          readFilesInformations(catogries, file, (err, fileInfo) => {
            if (err) {
              reject(err);
            } else {
              console.log(`Fileinfos ${fileInfo}`);
              resolve(fileInfo);
            }
          });
        });
      });
      Promise.all(promises)
        .then(result => {
          callback(null, result);
        })
        .catch(error => {
          callback(error);
        });
    });}

const getComponentsDetails = (req, res) => {
    readContent('index.html', "buttons" , "moovendhan", (htmlErr, htmlContent) => {
        if (htmlErr) {
            return res.status(500).json({ error: `${htmlErr} Error reading HTML content` });
        }
        readContent('style.css', "buttons" , "moovendhan", (cssErr, cssContent) => {
            if (cssErr) {
                return res.status(500).json({ error: `${cssErr} Error reading CSS content` });
            }
            readContent('script.js', "buttons" , "moovendhan", (jsErr, jsContent) => {
                if (jsErr) {
                    return res.status(500).json({ error: `${jsErr} Error reading JavaScript content` });
                }
                const dataObject = {
                    "post_details": {
                        "html": htmlContent,
                        "css": cssContent,
                        "js": jsContent
                    }
                };
                res.json(dataObject);
            });
        });
    });
};

module.exports = {
    getComponentsDetails,
    getLatestFiles,
    readFilesInformations,
    readContent,
};
