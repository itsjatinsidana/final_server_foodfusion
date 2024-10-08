import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { selectMenuItems } from './Store/Slices/menuItem';
import { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Banner from './Components/Banner';
import { useNavigate } from 'react-router-dom';

export const UserViewMenu = ({ fetchCartItems }) => {

    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!uEmail) {
            navigate("/userlogin")
        }
    }, [uEmail, navigate])

    const menu = useSelector(selectMenuItems)


    console.log("menu by redux :", menu)
    useEffect(() => {
        // jQuery code to set background images
        var a = $(".bg");
        a.each(function () {
            if ($(this).attr("data-bg")) {
                $(this).css("background-image", "url(" + $(this).data("bg") + ")");
            }
        });

        // Initialize PerfectScrollbar
        if ($(".header-cart_wrap_container").length > 0) {
            var aps = new PerfectScrollbar('.header-cart_wrap_container', {
                swipeEasing: true,
                minScrollbarLength: 20
            });
        }
    }, []);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Items');
    console.log("menuitem :", menuItems)
    const items = [...new Set(menuItems?.map(item => item.category_name))];
    console.log("items :", items)
    const baseURL = `${process.env.REACT_APP_API_URL}`;

    // const addToCart = async (items_id, name, price, category_name, photo) => {
    //     const useremail = sessionStorage.getItem("useremail");

    //     // console.log("useremail :", useremail, "name:", name, "price: ", price, "category name :", category_name, "PHOTO : ", photo)
    //     let clickedItem = menuItems.filter((item) => item.items_id == items_id)
    //     // console.log(items);
    //     console.log('matched :', clickedItem)

    //     const formData = new FormData();
    //     formData.append('items_id', items_id);
    //     formData.append('useremail', useremail);
    //     formData.append('name', name);
    //     formData.append('price', price);
    //     formData.append('category_name', category_name);
    //     formData.append('photo', photo);

    //     console.log("formdata ", formData)

    //     const url = `${process.env.REACT_APP_API_URL}addtocart`;


    //     try {
    //         const response = await fetch(url, { method: "POST", body: formData });
    //         const ans = await response.text();
    //         if (ans.status === "success") {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Item Added Successful',
    //                 text: 'CheckOut Tour Cart!',
    //                 timer: 3000,
    //                 showConfirmButton: false
    //             });
    //             fetchCartItems();
    //         } else if (ans === "fail") {

    //             Swal.fire({
    //                 icon: 'fail',
    //                 title: 'Item Not Added Successful',
    //                 text: 'Try Again',
    //                 timer: 3000,
    //                 showConfirmButton: false
    //             });
    //         } else if (ans === "exception") {
    //             alert(ans);
    //         }
    //     } catch (error) {
    //         console.error('Error adding category:', error);
    //     }

    // }
    const addToCart = async (items_id, name, price, category_name, photo) => {
        const useremail = sessionStorage.getItem("useremail");
    
        let clickedItem = menuItems.filter((item) => item.items_id == items_id);
        console.log('matched :', clickedItem);
    
        const formData = new FormData();
        formData.append('items_id', items_id);
        formData.append('useremail', useremail);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category_name', category_name);
        formData.append('photo', photo);
    
        console.log("formdata ", formData);
    
        const url = `${process.env.REACT_APP_API_URL}addtocart`;
    
        try {
            const response = await fetch(url, { method: "POST", body: formData });
            
            // Parse the response as JSON
            const ans = await response.json(); 
    
            // Check the response status
            if (ans.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Item Added Successfully',
                    text: 'Check out your cart!',
                    timer: 3000,
                    showConfirmButton: false
                });
                fetchCartItems(); // Refresh cart items after adding
            } else if (ans.status === "limit_exceeded") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Limit Exceeded',
                    text: ans.message, // Show the limit exceeded message from backend
                    timer: 6000,
                    showConfirmButton: false
                });
            } else if (ans.status === "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: ans.message || 'An unexpected error occurred.',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    
    useEffect(() => {
        if (menu.length !== 0) {
            setSelectedCategory("All Items");
            setMenuItems(menu);
        }
    }, [menu])

    return (
        <>
            {/* <UserNavbar /> */}

            {/* lodaer  */}
            {/* <div className="loader-wrap">
                <div className="loader-item">
                    <div className="cd-loader-layer" data-frame={25}>
                        <div className="loader-layer" />
                    </div>
                    <span className="loader" />
                </div>
            </div> */}
            {/* loader end  */}
            {/* main start  */}
            <div id="main" >
                {/* header  */}

                {/*header end */}
                {/* wrapper  */}
                <div id="wrapper" className='menu-wrapper'>
                    {/* content  */}
                    <div className="content">
                        {/*  section  */}
                        <section
                            className="parallax-section hero-section hidden-section"
                            data-scrollax-parent="true"
                        >
                            <div
                                className="bg par-elem "
                                data-bg="images/bg/10.jpg"
                                data-scrollax="properties: { translateY: '30%' }"
                            />
                            <div className="overlay" />
                            <div className="container">
                                <div className="section-title">
                                    <h4>Special menu offers.</h4>
                                    <h2>Discover Our menu</h2>
                                    <div className="dots-separator fl-wrap">
                                        <span />
                                    </div>
                                </div>
                            </div>
                            <div className="hero-section-scroll">
                                <div className="mousey">
                                    <div className="scroller" />
                                </div>
                            </div>
                            <div className="brush-dec" />
                        </section>
                        {/*  section  end*/}
                        {/*  section  */}


                        <section className="hidden-section" data-scrollax-parent="true" id="sec2">
                            <div className="container">

                                {/* gallery-filters */}

                                <div className="gallery-filters gth " id='food-category' >
                                    <a

                                        className={`gallery-filter ${selectedCategory === 'All Items' ? 'gallery-filter-active' : ''}`}
                                        data-filter="*"
                                        onClick={() => setSelectedCategory('All Items')}>
                                        <span></span> All Items
                                    </a>

                                    {items?.map((category, index) => (
                                        <a
                                            key={index}

                                            className={`gallery-filter ${selectedCategory === category ? 'gallery-filter-active' : ''}`}

                                            data-filter="*"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            <span></span> {category}
                                        </a>
                                    ))}


                                </div>

                                {/* gallery-filters end*/}
                                {/* gallery start */}

                                <div
                                    className="gallery-items grid-big-pad  lightgallery three-column fl-wrap"
                                    style={{ marginBottom: 50 }}
                                >
                                    {/* gallery-item*/}
                                    {console.log({ menuItems })}
                                    {menuItems
                                        ?.filter(menuItem => selectedCategory === 'All Items' || menuItem.category_name === selectedCategory)
                                        ?.map((menuItem, index) => (

                                            <div className="gallery-item desserts" key={index}>

                                                <div className="grid-item-holder hov_zoom">
                                                    {/* <a
                                                            href="images/menu/1.jpg"
                                                            className="box-media-zoom   popup-image"
                                                        >
                                                            <i className="fal fa-search" />
                                                        </a> */}
                                                    <img src={`${baseURL}${menuItem.photo}`} id='' alt="" />
                                                </div>
                                                <div className="grid-item-details">
                                                    <h3>
                                                        {menuItem.name} <span>Sale -30%</span>
                                                    </h3>
                                                    <p>{menuItem.description}
                                                        Seasoned with an herb crust, served with au jus and handcarved to
                                                        order.{" "}
                                                    </p>
                                                    <div className="grid-item_price">
                                                        <span>RS. {menuItem.price}</span>

                                                        <div className="add_cart" onClick={() => addToCart(menuItem.items_id, menuItem.name, menuItem.price, menuItem.category_name, menuItem.photo)}>Add To Cart</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {/* gallery-item end*/}

                                </div>
                                {/* gallery end */}

                                <a href="#" className="btn  " id='download-menu'>
                                    Download menu in PDF
                                    <i className="fal fa-long-arrow-right" />
                                </a>
                            </div>


                            <div className="section-bg">
                                <div className="bg" data-bg="images/bg/dec/section-bg.png" />
                            </div>
                        </section>

                        <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "200px" }}>
                            <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
                            <div className="designedby">
                                <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}