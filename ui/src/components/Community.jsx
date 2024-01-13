import { SvgIcons } from "./Button";


const Community = () => {
    return (
        <>
            <div>
                <div className="container community">
                    <div class="card text-center bg-theme">
                        <div class="card-body community_card_body">
                            <h5 class="card-title font-bolder community_heading">Join Our Community</h5>
                            <p class="card-text community_para">Get In Touch</p>

                          <div className="d-flex justify-content-center ">
                            <div classNam="btn btn-primary">
                                <span><SvgIcons icon={"telegram"} /></span>  <a href="#" class="mx-2">Telegram</a>
                            </div>
                                <div  classNam="btn btn-primary">
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