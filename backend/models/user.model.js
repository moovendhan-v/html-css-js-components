const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const githubUserSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    login: { type: String, required: true },
    avatar_url: { type: String, required: true },
    url : { type: String, required: true },
    organisation : { type: String},
    name : { type: String, required: true },
    blog : { type: String},
    bio : { type: String},
});

const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);
// {
//     "githubId": 96030910,
//     "login": "agricreation",
//     "avatar_url" : "htts://github.com",
//     "url" : "htts://github.com",
//     "organisation" : "github",
//     "name": "Moovendhan",
//     "blog": "testingblogs",
//     "bio" : "Bio"
// }
module.exports = GitHubUser