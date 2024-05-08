const fs = require('fs').promises;
const path = require('path');
const { readFileContent } = require('../operations/fileOperations');
const UserComponents = require('../models/components.model');
const GitHubUser = require('../models/user.model');
const baseFolderPath = '../';

//TODO readContent('index.html', "buttons" , "moovendhan", (change this directory name into dynamically)

//read file content 
const readContent = (filename, catogries, catogriesFile, callback) => {
    const folderPath = path.join(baseFolderPath, 'project', 'project_datas', catogries, catogriesFile);
    readFileContent(folderPath, filename, (err, content) => {
        if (err) {
            return callback(`${err} Internal Server Errors`);
        }
        callback(null, content);
    });
};

// reading file informations 
function readFilesInformations(catogriesName, folderName,{data, user}, callback) {
    readContent('index.html', catogriesName, folderName, (htmlErr, htmlContent) => {
        if (htmlErr) {
            return callback(htmlErr);
        }
        readContent('style.css', catogriesName, folderName, (cssErr, cssContent) => {
            if (cssErr) {
                return callback(cssErr);
            }
            readContent('script.js', catogriesName, folderName, (jsErr, jsContent) => {
                if (jsErr) {
                    return callback(jsErr);
                }
                // #TODO handle this likes and saved with the real data 
                const dataObject = {
                    "post_details": {
                        "html": htmlContent,
                        "css": cssContent,
                        "js": jsContent,
                        "type" : "components",
                        "like": {
                            "isLiked": true,
                            "likeCount": data.likes.length
                          },
                        "saved":{
                            "isSaved": true,
                            "savedCount": "100"
                          },
                        "comments":{
                            "count": "10",
                            "commentsList": [
                                {
                                    "comment":"testing comments",
                                    "user": "Moovendhan",
                                    "avatar": "testing",
                                    "date": "testing"
                                },
                                {
                                    "comment":"testing comments two",
                                    "user": "Agricreations",
                                    "avatar": "testing",
                                    "date": "testing"
                                }
                            ]
                        },
                        "folder_path": data.folder_path,
                        "folder_name": data.folder_name,
                        "catogries": data.categories,
                        "isActive": data.isActive,
                        "title": data.title,
                        "description": data.description,
                        "compId": data.id,
                        "admin": user
                    }
                };
                callback(null, dataObject);
            });
        });
    });
}

// this is asyncronus taks so that we need to handle this in a asyncronus promise way (get a latest files using a ctogries that available in database)
async function getLatestFiles (catogries,page, callback) {
    const catComponentsDetails = [];
        page = page ?? 1;
        const skip = (page-1)*10;
    // const folderPaths = path.join("../", 'project', 'project_datas', catogries);

         userComponents = await UserComponents.aggregate([
            {
                $match: {
                    $or: [
                        { 'categories': { $regex: catogries, $options: 'i' } }
                    ]
                }
            },
            {$skip: skip},
            {$limit: 12}
        ]);
        await Promise.all(userComponents.map(async (data) => {
            try {
                const user = await GitHubUser.findOne({ user_id: data.user_id.$oid }, {_id: 0, login: 1});
                const datas = await new Promise((resolve, reject) => {
                    readFilesInformations(data.categories, data.folder_name,{data, user}, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                catComponentsDetails.push(datas);
            } catch (err) {
                throw err;
            }
        }));
        callback(null, catComponentsDetails);
}

//get all components and search funcitons
const getAllCompDetailsFromDatabases = async ({ categories, search: searchQuery , page: pageNo}, callback) => {
    const allComponentsDetails = [];
    pageNo = pageNo ?? 1;
    const skip = (pageNo-1)*10;
    try {
        let userComponents;
        if (categories === "all") {
            userComponents = await UserComponents.find().skip(skip).limit(12);
        } else if (categories === "search") {
            userComponents = await UserComponents.aggregate([
                {
                    $match: {
                        $or: [
                            { 'title': { $regex: searchQuery, $options: 'i' } },
                            { 'folder_name': { $regex: searchQuery, $options: 'i' } },
                            { 'categories': { $regex: searchQuery, $options: 'i' } },
                            { 'description': { $regex: searchQuery, $options: 'i' } },
                            { 'tags': { $regex: searchQuery, $options: 'i' } }
                        ]
                    }
                },
                {$skip: skip},
                {$limit: 12}
            ]);
        } else {
            return callback("Invalid category", null);
        }

        await Promise.all(userComponents.map(async (data) => {
            try {
                const user = await GitHubUser.findOne({ user_id: data.user_id.$oid },
                    {_id:1,login:1, avatar_url:1, url:1, html_url:1, company:1, location:1, name: 1, blog: 1, bio:1, twitter_username:1}
                    );
                const datas = await new Promise((resolve, reject) => {
                    readFilesInformations(data.categories, data.folder_name,{data, user}, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                allComponentsDetails.push(datas);
            } catch (err) {
                throw err;
            }
        }));
        callback(null, allComponentsDetails);
    } catch (error) {
        console.error("Error retrieving user components:", error);
        callback("Internal server error", null);
    }
};

//filter components by seach
const getComponentsBySearch = (req,res)=>{
    const { categories = "search", search } = req.query;
    if(!search){
        return res.error({message: "Please add search query"})
    }
    getAllCompDetailsFromDatabases({ categories: categories, search: search }, (err, files) => {
        // Handle the data
        if (err) {
            return res.error({message: err});
        }
        return res.success({message:`${categories} latest components`, response:files, count: files.length})
    });
}

//Bring a particular components
const getParticularComponent = async (req,res)=>{
  const {category, title} = req.params;
  try {
    const data = await UserComponents.findOne({ folder_name: title, categories: category });
    if(!data){
        return res.error({message: 'Components not avaialble'})
    }
    const user = await GitHubUser.findOne({ user_id: data.user_id.$oid },
        {_id:1,login:1, avatar_url:1, url:1, html_url:1, company:1, location:1, name: 1, blog: 1, bio:1, twitter_username:1}
        );
    if(!user){
        return res.error({message: 'Fails in fetching components details Please contact admin Please visit contactus page for more details'})
    }
    const response = await readFilesInformations(data.categories, data.folder_name,{data, user}, (err, result) => {
        err ? res.send(err):res.success({response:result})
    });
  } catch (error) {
    res.send(error)
  }
}

//components like 
const addLikesToComponents = async (req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.body.userId; 
        const post = await UserComponents.findById(postId);
        console.log(post)
        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.badreq({message: "user already liked"});
        }
    
        post.likes.push(userId);
        await post.save();
        return res.success({message : 'Post liked', response : post});
      } catch (error) {
        return res.internalerr({message:error.message})
      }

}

//components dislike
const removeLikeToComponents = async (req, res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.body.userId; 
        const post = await UserComponents.findById(postId);
        // Check if the user has already liked the post
        const index = post.likes.indexOf(userId);
        if (index === -1) {
            // return res.status(400);
            return res.badreq({message: "user not liked"});
        }
     
        post.likes.splice(index, 1); // Remove user ID from likes array
        await post.save();
        return res.json(post);
      } catch (error) {
        return res.internalerr({message:error.message})
      }
}

//components saves
const saveComponents = async (req,res)=>{
    try {
        console.log("running")
        const postId = req.params.postId;
        const userId = req.body.userId; 
        const post = await UserComponents.findById(postId);
        console.log(post)
        if (post.saves.includes(userId)) {
            return res.badreq({message: "components already saved"});
        }
    
        post.saves.push(userId);
        await post.save();
        return res.success({message : 'components saved', response : post});
      } catch (error) {
        return res.internalerr({message:error.message})
      }

}

//components unsave
const unSavedComponents = async (req, res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.body.userId; 
        const post = await UserComponents.findById(postId);
        // Check if the user has already liked the post
        const index = post.saves.indexOf(userId);
        if (index === -1) {
            // return res.status(400);
            return res.badreq({message: "components not saved"});
        }
     
        post.saves.splice(index, 1); // Remove user ID from likes array
        await post.save();
        return res.json(post);
      } catch (error) {
        return res.internalerr({message:error.message})
      }
}


const isDirectoryCheck = async (filePath) => {
    try {
        const stats = await fs.stat(filePath);
        return stats.isDirectory();
    } catch (error) {
        console.error('Error checking if directory:', error);
        return false;
    }
};

const getCategoriesList = async (req, res) => {
    const baseFolderPath = '../'; 
    const folderPath = path.join(baseFolderPath, 'project', 'project_datas');
    console.log(folderPath);
    try {
        const files = await fs.readdir(folderPath);
        const directories = [];

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const isDirectory = await isDirectoryCheck(filePath);
            if (isDirectory) {
                directories.push(file);
            }
        }
        console.log(directories);
        res.json({ directories });
    } catch (error) {
        console.error('Error while reading directory:', error);
        res.status(500).json({ error: 'Error reading directory' , message : error});
    }
};

module.exports = { getCategoriesList };


module.exports = {
    getLatestFiles,
    readFilesInformations,
    readContent,
    getAllCompDetailsFromDatabases,
    getComponentsBySearch,
    getParticularComponent,
    getCategoriesList,
    addLikesToComponents,
    removeLikeToComponents,
    saveComponents,
    unSavedComponents
};
