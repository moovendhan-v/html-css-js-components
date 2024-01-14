import React from "react";
import PostContent from './Shadow_content';
import Button from './Button';

const PopularPosts = () => {
    const pageUrls = [
        'http://127.0.0.1:5500/test.html',
        'http://127.0.0.1:5500/test.html',
        'http://127.0.0.1:5500/test.html',
        'http://127.0.0.1:5500/test.html',
        'http://127.0.0.1:5500/test.html',
        'http://127.0.0.1:5500/test.html',
        // Add more URLs as needed
    ];

    return (
        <>
            <div className="container-fluid">
                <div className="gallery_containers shadow_fade">
                    {pageUrls.map((url, index) => (
                        <>
                            <div className="box myBoxContainer" key={index}>
                                <PostContent pageUrls={url} />
                                <div className="d-flex justify-content-between mt-4">
                                    <div >
                                        <span>Moovendhan</span>
                                    </div>
                                    <div>
                                        <span>100Views</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
<div className="align_button">
<Button icon={"code"} text={"See All Posts"} />

</div>
        </>
    )
}

export default PopularPosts;
