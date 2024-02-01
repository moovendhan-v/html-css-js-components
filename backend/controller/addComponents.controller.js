const UserComponents = require('../models/components.model');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
const { createFiles } = require('../operations/fileOperations');


const addNewComponents = async (req, res) => {
    try {
        const newComponents = new UserComponents({
            user_id: req.body.user_id,
            title: req.body.title,
            upload_time: req.body.upload_time,
            updated_time: req.body.updated_time,
            folder_path: req.body.folder_path,
            folder_name: req.body.folder_name,
            categories: req.body.categories,
            html: req.body.html,
            css:req.body.css,
            js: req.body.js,
        });
        await newComponents.save();
        res.send(jsonStatusSuccess({ errorStatus : false, statusCode : "201", message : 'success',}));
    } catch (error) {
        res.send(jsonStatusError({ errorStatus : true, statusCode : "400", message : `Data Insert fails : ${error}`}));
    }
}

const basePath = '../../project/project_datas/';
const category = 'buttons';
const folderName = "testing_folder_name";

createFiles(basePath, category, folderName, (err)=>{
    if(err == null){
        return jsonStatusSuccess({ errorStatus : false, message : 'New Components added soon it will be added into github repository'})
    }else{
        return jsonStatusError({ errorStatus : true, message : `Something might wrong (${err}) please contact admin, so please visit contact us page for more details`, response : null, count : 0 });
    }
});


module.exports = {addNewComponents};
