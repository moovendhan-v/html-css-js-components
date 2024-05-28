const UserComponents = require('../models/components.model');
const GitHubUser = require('../models/user.model');
const { sendStatus, sendJSONError, sendJSONSuccess } = require('../operations/errorhandlingOperations');
const { readFilesInformations, readContent } = require('../controller/components.controller');


const getUserProfileInformations = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        // Find user information using user_id
        const existingUser = await GitHubUser.findOne(
            { _id: user_id },
            {login:1, avatar_url:1, url:1, html_url:1, company:1, location:1, email:1, name: 1, blog: 1, bio:1, twitter_username:1});
        if (!existingUser) {
            return res.notFount({message: "user not found"})
        }
        // Get userComponents details using user_id 
        const userComponents = await UserComponents.find({ user_id: existingUser._id });

        // Map user components and append file information
        const updatedComponentsPromises = userComponents.map(async component => {
            const folderNames = component.folder_name;
            const categories = component.categories;
            const data = component;
            const user = existingUser;

            return new Promise((resolve, reject) => {
                readFilesInformations(categories, folderNames,{data, user}, (err, fileInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            // ...component.toObject(),
                             // Convert Mongoose document to object
                            component_details: fileInfo 
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
        res.send(sendJSONSuccess({ errorStatus: false, message: 'User data received successfully', response: userProfileWithComponents, count: userComponents.length }));

    } catch (error) {
        // Handle errors
        console.error('Error in getUserProfileInformations:', error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

const getUserInformationsByName = async (userName, callback) => {
    try {
        // Find user information using user_id
        const existingUser = await GitHubUser.findOne({ name: userName},
            {_id:1,login:1, avatar_url:1, url:1, html_url:1, company:1, location:1, email:1, name: 1, blog: 1, bio:1, twitter_username:1});
        if (!existingUser) {
            return callback('User not found', null);
        }
        // Get userComponents details using user_id 
        const userComponents = await UserComponents.find({ user_id: existingUser._id });

        // Map user components and append file information
        const updatedComponentsPromises = userComponents.map(async component => {
            const folderNames = component.folder_name;
            const categories = component.categories;
            const data = component;
            const user = existingUser;
            return new Promise((resolve, reject) => {
                readFilesInformations(categories, folderNames,{data, user}, (err, fileInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            // ...component.toObject(), 
                            component_details: fileInfo 
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
        callback(null, userProfileWithComponents);

    } catch (error) {
        // Handle errors
        console.error('Error in getUserProfileInformations:', error);
        callback(`Internal Server Error ${error}`, null);
    }
};

const getprofileinfoprotect = async (req, res) => {
    try {
        const user_id = req.user.tokenProperties.userId;
        // Find user information using user_id
        console.log(`usersresponse ${JSON.stringify(req.user)}`)

        console.log(`userid ${JSON.stringify(req.user.tokenProperties.userId)}`)
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
            const data = component;
            const user = existingUser;

            return new Promise((resolve, reject) => {
                readFilesInformations(categories, folderNames,{data, user}, (err, fileInfo) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            // ...component.toObject(), // Convert Mongoose document to object
                            component_details: fileInfo 
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
        res.send(sendJSONSuccess({ errorStatus: false, message: 'User data received successfully', response: userProfileWithComponents, count: userComponents.length }));

    } catch (error) {
        // Handle errors
        console.error('Error in getUserProfileInformations:', error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

const getUserInformationsByNameFromDb = async (req, res) => {
    const userName = req.body.user_name;
    console.log("---")
    try {
        getUserInformationsByName(userName, (error, userProfileWithComponents) => {
            if (error) {
                return res.status(500).send(`Internal Server Error ${error}`);
            } else {
                userProfileWithComponents.users = req?.user;
                res.send(sendJSONSuccess({ 
                    errorStatus: false,
                    message: 'User data received successfully',
                    response: userProfileWithComponents}));
            }
        });
    } catch (error) {
        console.error('Error in getUserInformationsByNameFromDb:', error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
};


module.exports = { getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb, getprofileinfoprotect };
