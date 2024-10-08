import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Thanku = () => {
    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!uEmail){
            navigate("/userlogin")
        }
    },[uEmail,navigate])
    return (
        <>
            <div id="wrapper">
                {/* content  */}
                <div className="content full-height">
                    <div className="body-bg">

                        <img src="images/bg/1.jpg" alt="img" style={{ height: "100%", width: "100%" }} />
                        <div className="overlay" />
                    </div>
                    {/*error-wrap*/}
                    <div className="error-wrap fl-wrap">
                        <div className="container">
                            <h2 style={{ display: "flex", alignItems: "center" }}>Thank You For Your Order</h2>

                            <div className="clearfix" />
                            <div className="dots-separator fl-wrap">
                                <span />
                            </div>
                            <a href="/userhome" className="btn" style={{backgroundColor:"#C19D60"}}>
                                Back to Home Page <i className="fal fa-long-arrow-right" />
                            </a>
                            <div className="section-dec sec-dec_top" />
                            <div className="section-dec sec-dec_bottom" />
                        </div>
                    </div>
                    {/*error-wrap end*/}
                </div>
                {/* content end  */}
            </div>
            {/* wrapper end */}
        </>

    )
}
export default Thanku