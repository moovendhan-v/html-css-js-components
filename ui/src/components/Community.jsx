import { SvgIcons } from "./Button";


const Community = () => {
    return (
        <>
            <div>
                <div className="container community shadow_fade_theme text-light">
                    <div className="card text-center bg-theme">
                        <div className="card-body community_card_body p-4 p-sm-20">
                            <h5 className="card-title font-bolder community_heading fs-sm-5 text-light">Join Our Community</h5>
                            <p className="card-text community_para">Get In Touch</p>
                            <div className="d-flex justify-content-center ">
                                <a href="https://t.me/addlist/KRvYxzeeT9MyNzFl" className="mx-2 text-light">
                                    <div className="btn btn-telegram">
                                        <span><SvgIcons icon={"telegram"} /></span>
                                        Telegram
                                    </div>
                                </a>
                                <a href="https://discord.gg/aNzRzK8M6Y" className="mx-2 text-light">
                                    <div className="btn btn-telegram">
                                        <span><SvgIcons icon={"discord"} /></span>  Discord
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community;