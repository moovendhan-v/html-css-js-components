import { SvgIcons } from "./Button";


const Community = () => {
    return (
        <>
            <div>
                <div className="container community shadow_fade_theme">
                    <div class="card text-center bg-theme">
                        <div class="card-body community_card_body p-4 p-sm-20">
                            <h5 class="card-title font-bolder community_heading fs-sm-5">Join Our Community</h5>
                            <p class="card-text community_para">Get In Touch</p>

                          <div className="d-flex justify-content-center ">
                            <div className="btn btn-telegram">
                                <span><SvgIcons icon={"telegram"} /></span>  <a href="#" class="mx-2">Telegram</a>
                            </div>
                                <div  className="btn btn-telegram">
                                <span><SvgIcons icon={"discord"} /></span>  <a href="#" class="mx-2">Discord</a>
                                </div>
                          </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community;