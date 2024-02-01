const UserComponents = require('../models/components.model');
const { jsonStatus, jsonStatusError, jsonStatusSuccess } = require('../operations/errorhandlingOperations');
const { createFiles } = require('../operations/fileOperations');

const basePath = '../project/project_datas/';
const category = 'tooltip';
const folderName = "testing_folder_names";

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
        // Define basePath, category, and folderName
       
        // Call createFiles function to create files
        createFiles(basePath, category, folderName, { html:"test html", css:"test css", js:"test js" }, (err) => {
            if (err) {
                console.error('Error creating files:', err);
                // Handle error if necessary
            } else {
                console.log('Files created successfully.');
                // Handle success if necessary
            }
        });        
        // Send response
        res.send(jsonStatusSuccess({ errorStatus: false, statusCode: "201", message: 'success' }));
    } catch (error) {
        console.error('Error adding new components:', error);
        res.send(jsonStatusError({ errorStatus: true, statusCode: "400", message: `Data Insert fails : ${error}` }));
    }
}


// createFiles(basePath, category, folderName, { html:"test html", css:"test css", js:"test js" }, (err) => {
//     if (err) {
//         console.error('Error creating files:', err);
//         // Handle error if necessary
//     } else {
//         console.log('Files created successfully.');
//         // Handle success if necessary
//     }
// });

module.exports = { addNewComponents };
