import { useState } from "react";
import { Link } from "react-router-dom";


function AdminNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };


  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/adminlogin";
    localStorage.removeItem("un");
    localStorage.clear();
  };
  return (
    <>
      <div className="header-inner  fl-wrap">
        <div className="container">
          <div className="header-container fl-wrap">
            <a href="admindashboard" className="logo-holder">
            <img src="images/Food.jpg" alt="" style={{height:"40px" , width:"240px"}}/>
            </a>
            <div className="show-reserv_button show-rb" onClick={handleLogout}>
              <span>LogOut</span> <i className="fal fa-bookmark" />
            </div>

            {/* nav-button-wrap*/}
            <div className="nav-button-wrap" onClick={handleNavToggle}>
              <div className="nav-button">
                <span />
                <span />
                <span />
              </div>
            </div>
            {/* nav-button-wrap end*/}
            {/*  navigation */}
            <div className={`nav-holder main-menu ${isNavOpen ? 'open' : ''}`}>
              <nav>
                <ul>
                  <li>
                    <a href="/admindashboard" className="act-link">
                      Dashboard <i className="fas fa-caret-down" />
                    </a>
                    {/*second level end*/}
                  </li>
                  <li>
                    <Link to="/managemenu">
                      Menu
                      <i className="fas fa-caret-down" />
                    </Link>
                    {/*second level */}

                    {/*second level end*/}
                  </li>
                  <li>
                    <Link to="/userManageOrders">Orders</Link>
                  </li>

                  <li>
                    <Link to="/yourplan">Your Plan</Link>
                  </li>
                  {/* <li>
                    <a href="#">Reservations</a>
                  </li> */}
                  {/* <li>
                    <a href="#">FeedBacks</a>
                  </li> */}
                  <li>
                    <a href="#">
                      Users
                      <i className="fas fa-caret-down" />
                    </a>
                    {/*second level */}
                    <ul>
                      <li>
                        <a href="/usersviewdetail">View Users</a>
                      </li>
                      {/* <li>
                        <a href="product-single.html">Product Single</a>
                      </li>
                      <li>
                        <a href="cart.html">Cart</a>
                      </li> */}
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

              <div className="header-cart_wrap_container fl-wrap">
                <div className="box-widget-content">
                  <div className="widget-posts fl-wrap">

                  </div>
                </div>
              </div>
              <div className="header-cart_wrap_total fl-wrap">
                <div className="header-cart_wrap_total_item">
                  Subtotal : <span>$147</span>
                </div>
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
    </>
  )
}
export default AdminNavbar;