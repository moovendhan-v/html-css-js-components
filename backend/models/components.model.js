const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userComponentsDetails = new Schema({
    // #TODO Schema.Types.ObjectId find this 
    user_id: { type: Schema.Types.ObjectId, ref:"GitHubUser", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: {type: Array, required:true},
    upload_time: { type: Date, required: true },
    updated_time: { type: Date, required: true },
    folder_path: { type: String, required: true },
    folder_name: { type: String, required: true },
    categories: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GitHubUser' }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GitHubUser' }],
    comments: [{
        body: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'GitHubUser' },
        date: { type: Date, default: Date.now },
    }],
    // data html,css,js
});

const UserComponents = mongoose.model('UserComponents', userComponentsDetails);

module.exports = UserComponents