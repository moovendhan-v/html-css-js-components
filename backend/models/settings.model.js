import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the user settings schema
const userSettingsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'GitHubUser', required: true },
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: 'en' },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true }
  }]
});

// Define class methods
class UserSettingsSchemaClass {
  static async getComponentDetailsByTitle(title) {
    return this.findOne({ title });
  }

  // Add more methods as needed
  // For example:
  static async getUserSettingsByUserId(userId) {
    return this.findOne({ user_id: userId });
  }

  static async addSocialLink(userId, platform, url) {
    return this.findOneAndUpdate(
      { user_id: userId },
      { $push: { socialLinks: { platform, url } } },
      { new: true }
    );
  }

  static async removeSocialLink(userId, platform) {
    return this.findOneAndUpdate(
      { user_id: userId },
      { $pull: { socialLinks: { platform } } },
      { new: true }
    );
  }
}

// Load class methods into schema
userSettingsSchema.loadClass(UserSettingsSchemaClass);

// Create and export the model
const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

export default UserSettings;
