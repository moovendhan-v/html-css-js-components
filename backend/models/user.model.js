import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const githubUserSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    login: { type: String, required: true },
    avatar_url: { type: String, required: true },
    url : { type: String, required: true },
    html_url : { type: String, required: true },
    company : { type: String},
    location : { type: String},
    discord_webhooks : { type: String},
    hire_me : { type: String},
    email : { type: String},
    name : { type: String, required: true },
    blog : { type: String},
    bio : { type: String},
    facebook : { type: String},
    instagram : { type: String},
    twitter_username : { type: String},
    telegram : { type: String},
});



const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

export {GitHubUser};