import { UserComponents } from '../../models/components.model.js';
import { GitHubUser } from '../../models/user.model.js';
import { sendJSONError, sendJSONSuccess } from '../../operations/errorhandlingOperations.js';
import { readFilesInformations, readContent } from '../components/components.controller.js';
import { ComponentStatus } from '../../models/componentsStatus.model.js';
import mongoose from 'mongoose';

const getUserProfileInformations = async ({ body }, res) => {
    try {
        const user_id = body.user_id;
        // Find user information using user_id
        const existingUser = await GitHubUser.findOne(
            { _id: user_id },
            { login: 1, avatar_url: 1, url: 1, html_url: 1, company: 1, location: 1, email: 1, name: 1, blog: 1, bio: 1, twitter_username: 1 });
        if (!existingUser) {
            return res.notFount({ message: "user not found" })
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
                readFilesInformations(categories, folderNames, { data, user }, (err, fileInfo) => {
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
        const existingUser = await GitHubUser.findOne({ name: userName },
            { _id: 1, login: 1, avatar_url: 1, url: 1, html_url: 1, company: 1, location: 1, email: 1, name: 1, blog: 1, bio: 1, twitter_username: 1 });
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
                readFilesInformations(categories, folderNames, { data, user }, (err, fileInfo) => {
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
        // TODO: Optimise this pipeline to get only required one
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
                $group: {
                    _id: '$component_details._id',  // Group by unique identifier
                    component_details: { $first: '$component_details' }  // Take the first occurrence
                }
            },
            {
                $addFields: {
                    'component_details.post_details': {
                        html: '$component_details.html',
                        css: '$component_details.css',
                        js: '$component_details.js',
                        type: 'components',
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
                $unset: 'component_details.comments'  // Explicitly remove the comments field
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


const getUserInformationsByNameFromDb = async ({ body, user }, res) => {
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
                    response: userProfileWithComponents
                }));
            }
        });
    } catch (error) {
        console.error('Error in getUserInformationsByNameFromDb:', error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
};

const getLikedComponents = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                message: 'User ID is required'
            });
        }

        // Ensure userId is in valid ObjectId format
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the user details
        const existingUser = await GitHubUser.findById(userObjectId, {
            _id: 1, login: 1, avatar_url: 1, url: 1, html_url: 1, company: 1, location: 1, email: 1, name: 1, blog: 1, bio: 1, twitter_username: 1
        });

        if (!existingUser) {
            return res.status(404).json({
                error: true,
                statusCode: 404,
                message: 'User Not Found'
            });
        }

        // Retrieve all components liked by the user
        const likedComponents = await ComponentStatus.aggregate([
            {
                $match: {
                    likes: userObjectId
                }
            },
            {
                $addFields: {
                    post_details: {
                        html: "$html",
                        css: "$css",
                        js: "$js",
                        type: "components",
                        like: {
                            isLiked: true,
                            likeCount: { $size: "$likes" }
                        },
                        saved: {
                            isSaved: { $in: [userObjectId, "$saves"] },
                            savedCount: { $size: "$saves" }
                        },
                        comments: {
                            count: { $size: "$comments" },
                            commentsList: "$comments"
                        },
                        tags: "$tags",
                        folder_path: "$folder_path",
                        folder_name: "$folder_name",
                        categories: "$categories",
                        isActive: "$is_active",
                        title: "$title",
                        description: "$description",
                        compId: "$_id",
                        isAdmin: {
                            $cond: { if: { $eq: [userObjectId, "$user_id"] }, then: true, else: false }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    post_details: 1
                }
            }
        ]);

        console.log('likedComponents', likedComponents);

        // Construct the response object
        const userProfileWithComponents = {
            user: existingUser,
            components: likedComponents
        };

        // Send the success response
        return res.status(200).json({
            error: false,
            statusCode: 200,
            message: 'Liked components retrieved',
            response: userProfileWithComponents,
            count: likedComponents.length
        });

    } catch (error) {
        // Handle errors
        console.error('Error in getLikedComponents:', error);
        return res.status(500).json({
            error: true,
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
};


export { getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb, getprofileinfoprotect, getLikedComponents };
