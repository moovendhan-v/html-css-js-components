import { UserComponents } from '../../models/components.model.js';
import { createFiles } from '../../operations/fileOperations.js';

// this base path must be referenced from app.js files
const basePath = '../project/project_datas/';

const addNewComponents = async (req, res) => {
    const { body, user } = req;
    console.log('user', user);
    
    const { title, description, tags, upload_time, updated_time, folder_path, folder_name, categories, html, css, js } = body;

    // Prepare the new component entry
    const newComponents = new UserComponents({
        user_id: user.userId,
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

    try {
        // Validate newComponents object before proceeding
        await newComponents.validate();

        // Call createFiles function to create files
        const createFilesPromise = new Promise((resolve, reject) => {
            createFiles(basePath, categories, folder_name, { html, css, js }, (err) => {
                if (err) {
                    console.error('Error creating files:', err);
                    reject(`Data not inserted. Please contact admin. Visit the contact us page: ${err}`);
                } else {
                    console.log('Files created successfully.');
                    resolve();
                }
            });
        });

        // Wait for files to be created
        await createFilesPromise;

        // Save the new components to the database
        await newComponents.save();
        res.success({ message: "Components have been updated. Please wait for approval. Thank you for your contributions." });

    } catch (error) {
        console.error('Error adding new components:', error);
        res.error({ message: `Data insert failed: ${error}` });
    }
};

export { addNewComponents };
