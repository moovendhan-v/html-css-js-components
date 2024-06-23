import mongoose from 'mongoose';
const { Schema } = mongoose;

const githubUserSchema = new Schema({
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

class GitHubUserClass {

  static async findByUserByName(userName) {
    return this.find({ name: userName });
  }
  
  // Static method to find a user by ID
  static async findUserByCompanyName(companyName) {
    return this.find({ company: `@${companyName}` });
  }

}

// Load the class into the schema
githubUserSchema.loadClass(GitHubUserClass);

// Create the model
const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

export { GitHubUser };
