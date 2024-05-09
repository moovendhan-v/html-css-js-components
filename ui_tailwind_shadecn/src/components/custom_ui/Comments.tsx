import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define a type or interface for the comment object
import {Comment} from '@/types/ComponentData.type'
export const Comments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
    return (
        <>
            <div className="w-full rounded-lg border p-2 my-4 mx-6">
                <h3 className="font-bold text-primary">Comments</h3>
                {/* Map over comments array and render each comment */}
                {comments.map((comment: Comment, index: number) => (
                    <div key={index} className="border rounded-md p-3 m-3">
                        <div className="flex gap-3 items-center">
                        <Avatar>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                            <h3 className="font-bold">{comment.user}</h3>
                        </div>
                        <p className="mt-2">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comments;
