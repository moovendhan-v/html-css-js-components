const UserComponents = require('../models/components.model');
const GitHubUser = require('../models/user.model');
const { jsonStatus, jsonStatusError, jsonStatusSuccess } = require('../operations/errorhandlingOperations');
const { readFilesInformations, readContent } = require('../controller/components.controller');

const getUserProfileInformations = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        // Find user information using user_id
        const existingUser = await GitHubUser.findOne({ _id: user_id });
        if (!existingUser) {
            return res.status(404).send('User not found');
        }
        // Get userComponents details using user_id 
        const userComponents = await UserComponents.find({ user_id: existingUser._id });

        const folderNames = userComponents.map(component => component.folder_name).join(','); // Join array elements into a single string
        const categories = userComponents.map(component => component.categories).join(',');

        // Define a promise to get file information
        const gettingFileInfoFromProjectFiles = new Promise((resolve, reject) => {
            readFilesInformations(categories, folderNames, (err, fileInfo) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(fileInfo);
                }
            });
        });

        // Wait for the file information promise to resolve
        const fileInfo = await gettingFileInfoFromProjectFiles;

        // Map user components and append file information
        const updatedComponents = userComponents.map(component => {
            return {
                ...component.toObject(), // Convert Mongoose document to object
                component_details: fileInfo // Add "component_details" array
            };
        });

        // Construct the response object
        const userProfileWithComponents = {
            user: existingUser,
            components: updatedComponents
        };

        // Send the success response
        res.send(jsonStatusSuccess({ errorStatus: false, message: 'User data received successfully', response: userProfileWithComponents, count: userComponents.length }));

    } catch (error) {
        // Handle errors
        console.error('Error in getUserProfileInformations:', error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

module.exports = { getUserProfileInformations };
