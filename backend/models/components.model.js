import mongoose from 'mongoose';

const { Schema } = mongoose;

// Comment schema
const commentSchema = new Schema({
    comment: String,
    user: { type: Schema.Types.ObjectId, ref: 'GitHubUser' },
    date: { type: Date, default: Date.now }
});

// UserComponents schema
const userComponentsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'GitHubUser', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    upload_time: { type: Date, required: true },
    updated_time: { type: Date, required: true },
    folder_path: { type: String, required: true },
    folder_name: { type: String, required: true, unique: true },
    categories: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'GitHubUser' }],
    saves: [{ type: Schema.Types.ObjectId, ref: 'GitHubUser' }],
    comments: [commentSchema],
});

// ES6 Class for UserComponents model
class UserComponentsClass {
    // Instance method example (if needed)
    getComponentDetailsByTitle(title) {
        return this.findOne({ title: title });
    }

    // Static method example (if needed)
    static async getComponentDetailsByFolderName(folderName) {
        return this.findOne({ folder_name: folderName });
    }
}

// Load class into schema
userComponentsSchema.loadClass(UserComponentsClass);

// Create model
const UserComponents = mongoose.model('UserComponents', userComponentsSchema);

export { UserComponents };
