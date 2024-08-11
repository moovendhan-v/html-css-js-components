import mongoose from 'mongoose';

const { Schema } = mongoose;

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
