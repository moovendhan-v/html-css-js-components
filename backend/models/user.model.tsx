import mongoose, { Document, Model, Schema } from 'mongoose';

interface IGitHubUser extends Document {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
    company?: string;
    location?: string;
    discord_webhooks?: string;
    hire_me?: string;
    email?: string;
    name: string;
    blog?: string;
    bio?: string;
    facebook?: string;
    instagram?: string;
    twitter_username?: string;
    telegram?: string;
}

const githubUserSchema: Schema<IGitHubUser> = new Schema({
    id: { type: Number, unique: true, required: true },
    login: { type: String, required: true },
    avatar_url: { type: String, required: true },
    url: { type: String, required: true },
    html_url: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    discord_webhooks: { type: String },
    hire_me: { type: String },
    email: { type: String },
    name: { type: String, required: true },
    blog: { type: String },
    bio: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter_username: { type: String },
    telegram: { type: String },
});

const GitHubUser: Model<IGitHubUser> = mongoose.model('GitHubUser', githubUserSchema);

export default GitHubUser;