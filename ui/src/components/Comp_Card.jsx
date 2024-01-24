import react from "react";

const ComponentsCard = () => {
    return (
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
    )
}

export default ComponentsCard;