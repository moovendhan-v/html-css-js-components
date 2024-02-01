const UserComponents = require('../models/components.model');
const { jsonStatus, jsonStatusError, jsonStatusSuccess } = require('../operations/errorhandlingOperations');
const { createFiles } = require('../operations/fileOperations');

// this base path is must be refer from app.js files
const basePath = '../project/project_datas/';

const addNewComponents = async (req, res) => {
    try {
        const { user_id, title, upload_time, updated_time, folder_path, folder_name, categories, html, css, js } = req.body;
        const newComponents = new UserComponents({
            user_id,
            title,
            upload_time,
            updated_time,
            folder_path,
            folder_name,
            categories,
        });
        await newComponents.save();
       
        // Call createFiles function to create files
        createFiles(basePath, categories, folder_name, { html:html, css:css, js:js }, (err) => {
            if (err) {
                console.error('Error creating files:', err);
                res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Not inserted Please contact admin plase visit contact us page : ${error}` }));
                return;
            } else {
                console.log('Files created successfully.');
            }
        });        
        // Send response
        res.send(jsonStatusSuccess({ errorStatus: false, statusCode: "201", message: 'success' }));
    } catch (error) {
        console.error('Error adding new components:', error);
        res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Insert fails : ${error}` }));
    }
}

module.exports = { addNewComponents };
