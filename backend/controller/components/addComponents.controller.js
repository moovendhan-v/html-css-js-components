import {UserComponents} from '../../models/components.model.js';
import { sendJSONError, sendJSONSuccess} from '../../operations/errorhandlingOperations.js';
import {createFiles} from '../../operations/fileOperations.js';

// this base path is must be refer from app.js files
const basePath = '../project/project_datas/';

const addNewComponents = async ({body}, res) => {
    try {
        const { user_id, title,description, tags, upload_time, updated_time, folder_path, folder_name, categories, html, css, js } = body;
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
        createFiles(basePath, categories, folder_name, { html, css, js }, async (err) => {
            if (err) {
                console.error('Error creating files:', err);
                res.error({message: `Data Not inserted Please contact admin plase visit contact us page : ${err}`})
                return;
            } else {
                console.log('Files created successfully.'); 
                try {
                    await newComponents.save();
                    res.success({message: "Components has been updated Please wait for approval thank you for your contributons"})
                } catch (error) {
                    console.error('Error saving new components:', error);
                    res.error({message: `Data Insert fails Please contact admin please visit contact us page : ${error}`})
                }   
            } 
        });        


    } catch (error) {
        console.error('Error adding new components:', error);
        res.error({message: `Data Insert fails : ${error}`})
    }
}

export { addNewComponents };

 