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

    static async getpPopularComponents(limit = 8) {
        return this.aggregate([
            // { $match: { isActive: true } }, // Match active components
            {
                $project: {
                    _id: 1,
                    title: 1,
                    likesCount: { $size: "$likes" },
                    commentsCount: { $size: "$comments" },
                    savesCount: { $size: "$saves" },
                    viewsCount: { $toInt: "$views" }, // Assuming views are stored as integers
                    updated_time: 1, // Include updated_time field
                    upload_time: 1 // Include upload_time field
                }
            },
            {
                $addFields: {
                    // Normalize and weight scores
                    normalizedLikes: {
                        $cond: {
                            if: { $eq: [{ $max: "$likesCount" }, 0] },
                            then: 0,
                            else: { $divide: ["$likesCount", { $max: "$likesCount" }] }
                        }
                    },
                    normalizedComments: {
                        $cond: {
                            if: { $eq: [{ $max: "$commentsCount" }, 0] },
                            then: 0,
                            else: { $divide: ["$commentsCount", { $max: "$commentsCount" }] }
                        }
                    },
                    normalizedSaves: {
                        $cond: {
                            if: { $eq: [{ $max: "$savesCount" }, 0] },
                            then: 0,
                            else: { $divide: ["$savesCount", { $max: "$savesCount" }] }
                        }
                    },
                    normalizedViews: {
                        $cond: {
                            if: { $eq: [{ $max: "$viewsCount" }, 0] },
                            then: 0,
                            else: { $divide: ["$viewsCount", { $max: "$viewsCount" }] }
                        }
                    },
                    // Apply weights
                    weightedLikes: { $multiply: ["$normalizedLikes", 3] }, // Weight likes more
                    weightedComments: { $multiply: ["$normalizedComments", 2] }, // Weight comments less than likes
                    weightedSaves: "$normalizedSaves", // Weight saves equally with views
                    weightedViews: "$normalizedViews", // Weight views equally with saves

                    // Calculate total score
                    totalScore: {
                        $add: ["$weightedLikes", "$weightedComments", "$weightedSaves", "$weightedViews"]
                    }
                }
            },
            {
                $addFields: {
                    // If all engagement metrics are zero, prioritize by latest update_time or upload_time
                    latestTime: { $max: ["$updated_time", "$upload_time"] }
                }
            },
            {
                $sort: {
                    totalScore: -1,
                    latestTime: -1 // Sort by totalScore descending, and latestTime descending
                }
            },
            { $limit: limit } // Limit to 'limit' results
        ]);
    };

}

// Load class into schema
userComponentsSchema.loadClass(UserComponentsClass);

// Create model
const UserComponents = mongoose.model('UserComponents', userComponentsSchema);

export { UserComponents };
