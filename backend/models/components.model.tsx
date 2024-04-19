import mongoose, { Schema, Document } from 'mongoose';

interface UserComponentsDetails extends Document {
    user_id: Schema.Types.ObjectId;
    title: string;
    description: string;
    tags: string[];
    upload_time: Date;
    updated_time: Date;
    folder_path: string;
    folder_name: string;
    categories: string;
    isActive: boolean;
}

const userComponentsDetailsSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "GitHubUser", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    upload_time: { type: Date, required: true },
    updated_time: { type: Date, required: true },
    folder_path: { type: String, required: true },
    folder_name: { type: String, required: true },
    categories: { type: String, required: true },
    isActive: { type: Boolean, required: true },
});

const UserComponents = mongoose.model<UserComponentsDetails>('UserComponents', userComponentsDetailsSchema);

export default UserComponents;