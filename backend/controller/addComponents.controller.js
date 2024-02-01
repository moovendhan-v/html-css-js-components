const UserComponents = require('../models/components.model');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');


const addNewComponents = async (req, res) => {
    try {
        const newComponents = new UserComponents({
            user_id: req.body.user_id,
            title: req.body.title,
            upload_time: req.body.upload_time,
            updated_time: req.body.updated_time,
            folder_path: req.body.folder_path,
            categories: req.body.categories,
        });
        await newComponents.save();
        res.send(jsonStatusSuccess({ errorStatus : false, statusCode : "201", message : 'success',}));
    } catch (error) {
        res.send(jsonStatusError({ errorStatus : true, statusCode : "400", message : `Data Insert fails : ${error}`}));
    }
}

module.exports = {addNewComponents};
