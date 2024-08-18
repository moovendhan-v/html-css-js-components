import mongoose from 'mongoose';

const { Schema } = mongoose;

// comments schema
const commentSchema = new Schema({
    comment: String,
    user: { type: Schema.Types.ObjectId, ref: 'GitHubUser' },
    date: { type: Date, default: Date.now }
});

// Component schema
const componentStatusSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    html: { type: String },
    css: { type: String },
    js: { type: String },
    folder_name: { type: String, unique: true, required: true },
    component_status: {
        type: String,
        enum: ['IN_REVIEW', 'IN_DRAFT', 'REJECTED', 'PUBLISHED'],
        default: 'IN_DRAFT'
    }, 
    categories: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'GitHubUser' }],
    saves: [{ type: Schema.Types.ObjectId, ref: 'GitHubUser' }],
    comments: [commentSchema],
});

// Create the index explicitly in the schema, to check unique 
// componentStatusSchema.index({ folder_name: 1 }, { unique: true });

// ES6 Class for Component model
class ComponentStatusClass {

    getComponentByStatus(status) {
        return this.findOne({ status });
    }

    getComponentDetailsByTitle(title) {
        return this.findOne({ title });
    }

    static async getpPopularComponents(limit = 9) {
        return this.aggregate([
            // { $match: { isActive: true } }, // Match active components
            {
                $project: {
                    _id: 1,
                    title: 1,
                    html: 1,
                    css:1,
                    type: 1,
                    tags: 1,
                    folder_path:1,
                    folder_name:1,
                    categories:1,
                    isActive:1,
                    description:1,
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
                            "post_details": {
                                "html": "$html",
                                "css": "$css",
                                "js": "$js",
                                "type": "components",
                                "tags": "$tags",
                                "folder_path": "$folder_path", 
                                "folder_name": "$folder_name",
                                "categories": "$categories",
                                "isActive": "$is_active",
                                "title": "$title",
                                "description": "$description",
                                "compId": "$_id"
                            },
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
                $project: {
                    post_details: 1 // Project only post_details field
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

    static async getComponentDetailsByFolderName(folderName) {
        return this.findOne({ folder_name: folderName });
    }

}

// Load class into schema
componentStatusSchema.loadClass(ComponentStatusClass);

// Create model
const ComponentStatus = mongoose.model('ComponentStatus', componentStatusSchema);

// Ensure indexes are created
ComponentStatus.createIndexes();

export { ComponentStatus };
