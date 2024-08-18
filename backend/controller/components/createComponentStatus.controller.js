import { ComponentStatus } from '../../models/componentsStatus.model.js';
import AppError from '../../utils/AppError.js';

const COMPONENT_STATUS = Object.freeze({
    REVIEW: 'IN_REVIEW',
    DRAFT: 'DRAFT',
    REJECTED: 'REJECTED',
    PUBLISHED: 'PUBLISHED'
});

// function sanitize(input) {
//     return input.replace(/[$<>;]/g, '');
// }

const contributeNewComponents = async (req, res) => {
    const { body, user } = req;
    console.log('user', user);

    const { title, description, tags, folder_name, categories, html, css, js } = body;

    try {
        // Create the new component entry using the create method
        const newComponent = await ComponentStatus.create({
            user_id: user.userId,
            title,
            description,
            tags,
            folder_name,
            html,
            css,
            js,
            component_status: COMPONENT_STATUS.REVIEW,
            categories,
            is_active: false,
        });

        // Customize the response object
        const responseComponent = {
            id: newComponent._id,
            title: newComponent.title,
            description: newComponent.description,
            folderName: newComponent.folder_name,
            componentStatus: newComponent.component_status,
            createdAt: newComponent.created_at,
            updatedAt: newComponent.updated_at,
        };

        // Send the customized response
        res.success({
            message: "Components have been updated. Please wait for approval. Thank you for your contributions.",
            response: responseComponent
        });

    } catch (error) {
        if (error.code === 11000) {  // Duplicate key error code
            console.error('Duplicate folder name:', error);
            res.error({ message: 'Duplicate folder name. Please choose a different folder name.' });
        } else {
            console.error('Error adding new components:', error);
            res.error({ message: `Data insert failed: ${error.message}` });
        }
    }
};

export { contributeNewComponents };
