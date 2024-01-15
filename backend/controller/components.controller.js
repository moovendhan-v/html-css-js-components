const fs = require('fs');
const path = require('path');
const { readFileContent } = require('../operations/fileOperations');
const baseFolderPath = '../';


//TODO readContent('index.html', "buttons" , "moovendhan", (change this directory name into dynamically)
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

const readContent = (filename, catogries, catogriesFile, callback) => {
const folderPath = path.join(baseFolderPath, 'project', 'project_datas', catogries,catogriesFile );

    readFileContent(folderPath, filename, (err, content) => {
        if (err) {
            console.error(err);
            return callback(`${err} Internal Server Error`);
        }
        callback(null, content);
    });
};

module.exports = {
    getComponentsDetails,
};
