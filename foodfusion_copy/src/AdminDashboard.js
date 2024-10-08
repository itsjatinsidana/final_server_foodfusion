import AdminNavbar from "./AdminNavbar"
import React, { useEffect,useState } from 'react';
import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
    // const username = sessionStorage.getItem("un");
    const [planOrder,setPlanOrder] = useState([]);
    const [currentPlanOrder,setcurrentPlanOrder] = useState([]);
    const username = localStorage.getItem("un");
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/adminlogin');
        }
    }, [username, navigate]);


    useEffect(() => {
        const a = $(".bg");
        console.log('Elements with class bg:', a);
        a.each(function () {
            if ($(this).attr("data-bg")) {
                $(this).css("background-image", "url(" + $(this).data("bg") + ")");
            }
        });
        if ($(".header-cart_wrap_container").length > 0) {
            new PerfectScrollbar('.header-cart_wrap_container', {
                swipeEasing: true,
                minScrollbarLength: 20
            });
        }

    }, []);

    const countOrderPlan = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showorderlimit`, { method: "POST" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            // setMenuItems(data.ans);
            setPlanOrder(data.ans);
          
        } catch (error) {
            console.error('Error fetching Plan Order:', error);
        }
    };
    useEffect(() => {
        countOrderPlan();
    }, []);

    const currentOrderPlan = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showcurrentlimit`, { method: "POST" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
          console.log(data.ans[0].plan_order)
          setcurrentPlanOrder(data.ans[0].plan_order);
           
           console.log(currentPlanOrder,"curent plan data")
          
        } catch (error) {
            console.error('Error fetching Plan Order:', error);
        }
    };
    useEffect(() => {
        currentOrderPlan();
    }, []);

    const planorder = planOrder.map(orderplan => orderplan["COUNT(*)"]);

   
 
    const difference = currentPlanOrder - planorder ;
    console.log(difference);

    const Alert = ({ type, message }) => {
        const [isVisible, setIsVisible] = useState(true);
      
        const closeAlert = () => {
          setIsVisible(false);
        };
      
        if (!isVisible) return null;
      
        return (
          <div className={`alert ${type}`}>
            <span className="alert-message">{message}</span>
            <button className="close-alert" onClick={closeAlert}>
              ×
            </button>
          </div>
        );
      };
    return (
        <>
            <AdminNavbar />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
 <div>
  
      <Alert type="warning" message={`user order left: ${difference}`}/>
   
    </div>
            <section data-scrollax-parent="true">
                <div className="container">
                    <div className="section-title">
                        <h2>Welcome {username} ;</h2>
                        <div className="dots-separator fl-wrap">
                            <span />
                        </div>
                    </div>
                    <div className="cards-wrap fl-wrap">
                        <div className="row">
                            {/*card item */}

                            <div className="col-md-4">

                                <div className="content-inner fl-wrap">
                                    <div className="content-front">

                                        <div className="cf-inner">

                                            <div className="bg " data-bg="images/services/1.jpg" />

                                            <div className="overlay" />
                                            <div className="inner">
                                                <h2>MENU</h2>
                                                <h4>EDIT MENU</h4>
                                            </div>

                                        </div>

                                    </div>
                                    <a href="managemenu" className="content-back" style={{ textDecoration: 'none' }}>
                                        <div className="cf-inner">
                                        <div className="bg " data-bg="images/services/1.jpg" />
                                            <div className="inner">

                                                <div className="dec-icon">
                                                    <i className="fal fa-fish" />
                                                </div>
                                                {/* <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit. Maecenas in pulvinar neque. Nulla finibus
                                                    lobortis pulvinar.
                                                </p> */}
                                            </div>

                                        </div>

                                    </a>

                                </div>
                            </div>
                            {/*card item end */}
                            {/*card item */}
                            <div className="col-md-4">
                                <div className="content-inner fl-wrap">
                                    <div className="content-front">
                                        <div className="cf-inner">
                                            <div className="bg " data-bg="images/services/2.jpg" />
                                            <div className="overlay" />
                                            <div className="inner">
                                                <h2>Orders</h2>
                                                <h4>Manage Orders</h4>
                                            </div>
                                            {/* <div className="serv-num">02.</div> */}
                                        </div>
                                    </div>

                                    <div className="content-back">
                                        <Link to="/userManageOrders" style={{ textDecoration: "none" }}>
                                        
                                            <div className="cf-inner">
                                            {/* <div className="bg " data-bg="images/services/2.jpg" style={{width:"100%"}}/> */}
                                           
                                                <div className="inner">
                                                <img src="images/services/2.jpg"   alt="img" style={{width:"500px", height:"480px"}}/>
                                                    {/* <div className="dec-icon">
                                                        <i className="fal fa-carrot" />
                                                    </div> */}
                                                    {/* <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit. Maecenas in pulvinar neque. Nulla finibus
                                                        lobortis pulvinar.
                                                    </p> */}
                                                </div>
                                            </div>

                                        </Link>
                                    </div>


                                </div>

                            </div>
                            {/*card item end */}
                            {/*card item */}
                            <div className="col-md-4">
                                <div className="content-inner fl-wrap">
                                    <div className="content-front">
                                        <div className="cf-inner">
                                            <div className="bg " data-bg="images/services/3.jpg" />
                                            <div className="overlay" />
                                            <div className="inner">
                                                <h2>FeedBacks</h2>
                                                <h4>Manage FeedBacks</h4>
                                            </div>
                                          
                                        </div>
                                    </div>
                                    <div className="content-back">
                                        <div className="cf-inner">
                                        <div className="bg " data-bg="images/services/3.jpg" />
                                            <div className="inner">
                                                <div className="dec-icon">
                                                    <i className="fal fa-utensils-alt" />
                                                </div>
                                                {/* <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit. Maecenas in pulvinar neque. Nulla finibus
                                                    lobortis pulvinar.
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*card item end */}
                        </div>
                        <div className="section-dec sec-dec_top" />
                        <div className="section-dec sec-dec_bottom" />
                    </div>

                    <div
                        className="images-collage-item col_par"
                        style={{ width: 120 }}
                        data-position-left={83}
                        data-position-top={87}
                        data-zindex={1}
                        data-scrollax="properties: { translateY: '150px' }"
                    >
                        <img src="images/cube.png" alt="" />
                    </div>
                </div>
                <div className="section-bg">
                    <div className="bg" data-bg="images/bg/dec/section-bg.png" />
                </div>
            </section >
        </>
    )
}