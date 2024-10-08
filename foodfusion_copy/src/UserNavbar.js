import { Link } from "react-router-dom";
import { fontAwesome } from "fontawesome";
import { useState } from "react";


function UserNavbar({ length }) {


  console.log("length is ", length)
  const user_name = localStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/userlogin";
    localStorage.removeItem("useremail");
    localStorage.removeItem("username");
    localStorage.clear();

  }

  const myFunction = () => {

    var x = document.getElementById("myTopnav");

    if (x.className != "topnav") {
      x.classList = "";
      x.classList.add("topnav")
      x.style.visibility = "visible"
    }
    else {
      x.classList.remove("topnav")
      x.style.visibility = "hidden";
    }


  }



  return (

    <>

      <header className="main-header">

        <div className="header-inner  fl-wrap">
          <div className="container">
            <div className="header-container fl-wrap">
              <a href="/userhome" className="logo-holder">
                <img src="images/Food.jpg" className="logo-img" alt="" style={{ height: "40px", width: "180px" }} />

              </a>
              <div className="show-reserv_button show-rb" onClick={handleLogout}>
                <span>LogOut</span> <i className="fal fa-bookmark" />
              </div>
              <div className="show-reserv_button show-rb">
                <span>{user_name}</span> <i className="fal fa-bookmark" />
              </div>

              <div className="show-cart sc_btn htact">
                <i className="fal fa-shopping-bag" />
                <span className="show-cart_count">{length}</span>
                <Link to="/userviewcart" style={{ textDecoration: "none", color: "black", position: "absolute", top: "70px" }}><span className="header-tooltip">Your Cart</span></Link>

              </div>
              <div className="bars">
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>
                  <i class="fa fa-bars"></i>
                </a>
              </div>
              {/* nav-button-wrap*/}
              <div className="nav-button-wrap " >
                {/* <div className="icon" onClick={myFunction}> */}
                {/* <span />
                  <span />
                  <span /> */}
                {/* <i class="fa fa-bars"></i>
                </div> */}
              </div>
              {/* nav-button-wrap end*/}
              {/*  navigation */}
              <div className="nav-holder main-menu topnav" id="myTopnav">
                <nav>
                  <ul>
                    <li>
                      <Link to="/userhome" className="act-link">
                        Home
                      </Link>
                      {/*second level */}

                      {/*second level end*/}
                    </li>
                    <li>
                      <Link to="/userviewmenu">
                        Menu

                      </Link>

                    </li>
                    <li>
                      <Link to="#">About</Link>
                    </li>
                    <li>
                      <Link to="#">Contact</Link>
                    </li>
                    <li>
                      <Link to="/userviewOrder">View Orders</Link>
                    </li>
                    <li>
                      <Link to="#">
                        Pages
                        <i className="fas fa-caret-down" />
                      </Link>
                      {/*second level */}
                      <ul>
                        <li>
                          <Link to="/usersignup">User Signup</Link>
                        </li>
                        <li>
                          <Link to="/userlogin">User Login</Link>
                        </li>

                        {/* <li>
                          <a href="gallery.html">Gallery</a>
                        </li>
                        <li>
                          <a href="blog-single.html">Blog single</a>
                        </li>
                        <li>
                          <a href="404.html">404</a>
                        </li>
                        <li>
                          <a href="coming-soon.html">Coming Soon</a>
                        </li> */}
                      </ul>
                      {/*second level end*/}

                    </li>
                  </ul>

                </nav>
              </div>
              {/* navigation  end */}
              {/* header-cart_wrap  */}
              <div className="header-cart_wrap novis_cart">
                <div className="header-cart_title">
                  Your Cart <span>4 items</span>
                </div>
                <div className="header-cart_wrap_container fl-wrap">
                  <div className="box-widget-content">
                    <div className="widget-posts fl-wrap">
                      <ol>
                        <li className="clearfix">
                          <a href="#" className="widget-posts-img">
                            <img src="images/menu/1.jpg" className="respimg" alt="" />
                          </a>
                          <div className="widget-posts-descr">
                            <a href="#" title="">
                              Grilled Steaks
                            </a>
                            <div className="widget-posts-descr_calc clearfix">
                              1 <span>x</span> $45
                            </div>
                          </div>
                          <div className="clear-cart_button">
                            <i className="fal fa-times" />
                          </div>
                        </li>
                        <li className="clearfix">
                          <a href="#" className="widget-posts-img">
                            <img src="images/menu/2.jpg" className="respimg" alt="" />
                          </a>
                          <div className="widget-posts-descr">
                            <a href="#" title="">
                              Cripsy Lobster &amp; Shrimp Bites
                            </a>
                            <div className="widget-posts-descr_calc clearfix">
                              2 <span>x</span> $22
                            </div>
                          </div>
                          <div className="clear-cart_button">
                            <i className="fal fa-times" />
                          </div>
                        </li>
                        <li className="clearfix">
                          <a href="#" className="widget-posts-img">
                            <img src="images/menu/3.jpg" className="respimg" alt="" />
                          </a>
                          <div className="widget-posts-descr">
                            <a href="#" title="">
                              Chicken tortilla soup
                            </a>
                            <div className="widget-posts-descr_calc clearfix">
                              1 <span>x</span> $37
                            </div>
                          </div>
                          <div className="clear-cart_button">
                            <i className="fal fa-times" />
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="header-cart_wrap_total fl-wrap">
                  <div className="header-cart_wrap_total_item">
                    Subtotal : <span>$147</span>
                  </div>
                </div>
                <div className="header-cart_wrap_footer fl-wrap">
                  <a href="cart.html"> View Cart</a>
                  <a href="checkout.html"> Checkout</a>
                </div>
              </div>
              {/* header-cart_wrap end  */}
              {/* share-wrapper */}
              <div className="share-wrapper isShare">
                <div className="share-container fl-wrap" />
              </div>
              {/* share-wrapper-end */}
            </div>
          </div>
        </div>
        {/* header-inner end  */}
      </header>

    </>
  )

}
export default UserNavbar;