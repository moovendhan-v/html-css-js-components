// components/SuccessToast.tsx
import React from 'react';
import { toast } from 'sonner';

interface SuccessToastProps {
    message: string;
    description?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // Include position here
}

interface CustomToastOptions {
    description?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    classNames?: {
        success?: string;
    };
    action?: {
        label: string;
        onClick: () => void;
    };
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, description, position = 'bottom-right' }) => {
    const options: CustomToastOptions = {
        description,
        position,
        classNames: {
            success: 'bg-success',
        },
        action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
        },
    };

    toast.success(message, options as never); // Use `as any` if necessary

    return null;
};

export { SuccessToast };
