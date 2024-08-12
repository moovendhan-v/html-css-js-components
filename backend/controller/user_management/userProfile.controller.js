import {UserComponents} from '../../models/components.model.js';
import {GitHubUser} from '../../models/user.model.js';
import {sendJSONError, sendJSONSuccess} from '../../operations/errorhandlingOperations.js';
import {readFilesInformations, readContent} from '../components/components.controller.js';
import { ComponentStatus } from '../../models/componentsStatus.model.js';

const getUserProfileInformations = async ({body}, res) => {
    try {
        const user_id = body.user_id;
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
        const { user } = req;
        const user_id = user.userId;
        console.log('user_id', user_id)

        // Find the GitHub user information using user_id
        const existingUser = await GitHubUser.findById(user_id);
        if (!existingUser) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Fetch user components and include their details
        const userComponents = await ComponentStatus.aggregate([
            { $match: { user_id: existingUser._id } },
            {
                $lookup: {
                    from: 'componentstatuses',
                    localField: 'component_id',
                    foreignField: 'uuid',
                    as: 'component_details'
                }
            },
            {
                $unwind: '$component_details'
            },
            {
                $addFields: {
                    'component_details.post_details': {
                        html: '$component_details.html',
                        css: '$component_details.css',
                        js: '$component_details.js',
                        type: 'components',
                        like: {
                            isLiked: { $in: [existingUser._id, '$component_details.likes'] },
                            likeCount: { $size: '$component_details.likes' }
                        },
                        saved: {
                            isSaved: { $in: [existingUser._id, '$component_details.saves'] },
                            savedCount: { $size: '$component_details.saves' }
                        },
                        comments: {
                            count: { $size: '$component_details.comments' },
                            commentsList: '$component_details.comments'
                        },
                        tags: '$component_details.tags',
                        folder_path: '$component_details.folder_path',
                        folder_name: '$component_details.folder_name',
                        categories: '$component_details.categories',
                        isActive: '$component_details.isActive',
                        title: '$component_details.title',
                        description: '$component_details.description',
                        compId: '$component_details._id',
                        admin: {
                            _id: existingUser._id,
                            id: existingUser.id,
                            login: existingUser.login,
                            avatar_url: existingUser.avatar_url,
                            url: existingUser.url,
                            html_url: existingUser.html_url,
                            company: existingUser.company,
                            location: existingUser.location,
                            email: existingUser.email,
                            name: existingUser.name,
                            blog: existingUser.blog,
                            bio: existingUser.bio,
                            twitter_username: existingUser.twitter_username,
                        }
                    }
                }
            },
            {
                $project: {
                    component_details: 1
                }
            }
        ]);

        // Construct the response object
        const userProfileWithComponents = {
            user: existingUser,
            components: userComponents
        };

        // Send the success response
        return res.status(200).json({
            error: false,
            statusCode: 200,
            message: 'User data received successfully',
            response: userProfileWithComponents,
            count: userComponents.length
        });

    } catch (error) {
        // Handle errors
        console.error('Error in getprofileinfoprotect:', error);
        return res.status(500).json({ error: true, message: `Internal Server Error: ${error.message}` });
    }
};


const getUserInformationsByNameFromDb = async ({body, user}, res) => {
    const userName = body.user_name;
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


export { getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb, getprofileinfoprotect };
