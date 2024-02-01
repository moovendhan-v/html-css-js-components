const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userComponentsDetails = new Schema({
    // #TODO Schema.Types.ObjectId find this 

    user_id: { type: Schema.Types.ObjectId, ref:"GitHubUser", required: true },
    title: { type: String, required: true },
    upload_time: { type: Date, required: true },
    updated_time: { type: Date, required: true },
    folder_path: { type: String, required: true },
    categories: { type: String, required: true },

});

const UserComponents = mongoose.model('UserComponents', userComponentsDetails);

module.exports = UserComponents