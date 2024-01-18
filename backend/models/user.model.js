const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const githubUserSchema = new Schema({
    githubId: { type: Number, unique: true, required: true },
    login: { type: String, required: true },
});

const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

// const userData = {
//     githubId: 96030910,
//     login: 'agricreation',
// };


module.exports = GitHubUser