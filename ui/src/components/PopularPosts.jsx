import React from "react";
import PostContent from './Shadow_content';

const PopularPosts = () => {
    const pageUrls = [
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
                <div className="gallery_containers">
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
        </>
    )
}

export default PopularPosts;
