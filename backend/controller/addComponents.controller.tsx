const UserComponents = require('../models/components.model');
const { jsonStatus, jsonStatusError, jsonStatusSuccess } = require('../operations/errorhandlingOperations');
const { createFiles } = require('../operations/fileOperations');

// this base path is must be refer from app.js files
const basePath = '../project/project_datas/';

const addNewComponents = async (req, res) => {
    try {
        const { user_id, title,description, tags, upload_time, updated_time, folder_path, folder_name, categories, html, css, js } = req.body;
        const newComponents = new UserComponents({
            user_id,
            title,
            description,
            tags,
            upload_time,
            updated_time,
            folder_path,
            folder_name,
            categories,
            isActive: false,
        });
       
        // Call createFiles function to create files
        createFiles(basePath, categories, folder_name, { html:html, css:css, js:js }, async (err) => {
            if (err) {
                console.error('Error creating files:', err);
                res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Not inserted Please contact admin plase visit contact us page : ${err}` }));
                return;
            } else {
                console.log('Files created successfully.'); 
                try {
                    await newComponents.save();
                    res.send(jsonStatusSuccess({ errorStatus: false, statusCode: "201", message: 'Components has been updated Please wait for approval thank you for your contributons' }));
                } catch (error) {
                    console.error('Error saving new components:', error);
                    res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Insert fails Please contact admin please visit contact us page : ${error}` }));
                }   
            } 
        });        

        // await newComponents.save();
        // Send response

    } catch (error) {
        console.error('Error adding new components:', error);
        res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Insert fails : ${error}` }));
    }
}

module.exports = { addNewComponents };
