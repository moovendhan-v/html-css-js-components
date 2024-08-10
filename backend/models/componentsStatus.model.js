import mongoose from 'mongoose';

const { Schema } = mongoose;

// Component schema
const componentStatusSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    upload_time: { type: Date, default: Date.now },
    updated_time: { type: Date, default: Date.now },
    html: { type: String, required: true },
    css: { type: String, required: true },
    js: { type: String, required: true },
    status: {
        type: String,
        enum: ['IN_REVIEW, IN_DRAFT, REJECTED, PUBLISHED'],
        default: 'draft'
    },
    categories: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

// ES6 Class for Component model
class ComponentStatusClass {
    getComponentByStatus(status) {
        return this.findOne({ status });
    }
}

// Load class into schema
componentStatusSchema.loadClass(ComponentStatusClass);

// Create model
const ComponentStatus = mongoose.model('ComponentStatus', componentStatusSchema);

export { ComponentStatus };
