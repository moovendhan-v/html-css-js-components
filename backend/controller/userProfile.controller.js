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

        // Map user components and append file information
        const updatedComponentsPromises = userComponents.map(async component => {
            const folderNames = component.folder_name;
            const categories = component.categories;

            return new Promise((resolve, reject) => {
                readFilesInformations(categories, folderNames, (err, fileInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            ...component.toObject(), // Convert Mongoose document to object
                            component_details: fileInfo // Add "component_details" array
                        });
                    }
                });
            });
        });

        // Wait for all promises to resolve
        const updatedComponents = await Promise.all(updatedComponentsPromises);

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
