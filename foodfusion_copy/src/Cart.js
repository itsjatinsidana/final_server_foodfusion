
import UserNavbar from "./UserNavbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const Cart = ({ categories, setCategories, fetchCartItems }) => {
  const baseURL = `${process.env.REACT_APP_API_URL}`;
  const useremail = sessionStorage.getItem("useremail");
  useEffect(() => {
    fetchCartItems();
  }, []);

  const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!uEmail){
            navigate("/userlogin")
        }
    },[uEmail,navigate])
  // Handler for quantity change
  const handleQuantityChange = async (index, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) return; // Prevent invalid input

    const updatedItems = [...categories];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQuantity,
      totalAmount: newQuantity * parseFloat(updatedItems[index].price) // Ensure price is a number
    };
    setCategories(updatedItems);
    const updatedItem = updatedItems[index];
    console.log(updatedItem);

    const formData = new FormData();
    formData.append('cart_id', updatedItem.cart_id);
    formData.append('quantity', newQuantity);
    formData.append('totalAmount', updatedItem.totalAmount);

    try {
      // Make API request to update the quantity in the backend using fetch
      const response = await fetch(`${process.env.REACT_APP_API_URL}updatecartquantity`, {
        method: 'Post',
        body: formData
      });
      if (response === "fail") {
        throw new Error('Network response was not ok');
      }

      console.log('Quantity updated successfully');
    } catch (error) {
      console.error('Error updating quantity', error);
      // Optionally, revert the state change if the update fails
    }


  };

  const handleRemoveItem = (cart_id) => {

    var formdata = new FormData();
    formdata.append("cart_id", cart_id);
    var url = `${process.env.REACT_APP_API_URL}deletecartitem`;

    fetch(url, { method: "POST", body: formdata })
      .then(response => response.text())
      .then(ans => renderAsHtml2(ans));
  }
  function renderAsHtml2(ans) {
    if (ans === "success") {
      Swal.fire({
        icon: 'success',
        title: 'Item Removed Successful',
        text: 'You have successfully Removed Item!',
        timer: 3000,
        showConfirmButton: false,

      });
      fetchCartItems();

    } else if (ans === "fail") {
      Swal.fire({
        icon: 'fail',
        title: 'Item Dose Not Exist',
        timer: 3000,
        showConfirmButton: false
      });
    } else if (ans === "exception") {
      alert(ans);
    }

  }

  // Calculate cart totals
  const cartSubtotal = categories.reduce((sum, item) => sum + (item.totalAmount || (parseFloat(item.price) * (item.quantity || 1))), 0);
  const shippingTotal = 12.00; // Assuming fixed shipping cost
  const totalAmount = cartSubtotal + shippingTotal;

  const itemIds = categories.map(item => item.cart_id);

  const handleProceedToCheckout = () => {
    // Store data in localStorage or sessionStorage
    localStorage.setItem('checkoutData', JSON.stringify({
      itemIds,
      cartSubtotal,
      shippingTotal,
      totalAmount
    }));
  };


  return (
    <>
      {/* <UserNavbar cartItemCount={categories.length} /> */}
      {/* header end */}
      {/* wrapper */}
      <div id="wrapper">
        {/* content */}
        <div className="content">
          {/* section */}
          <section className="parallax-section hero-section hidden-section" data-scrollax-parent="true">
            <img className="bg par-elem" src="images/bg/17.jpg" alt="img" data-scrollax="properties: { translateY: '30%' }" />
            <div className="overlay" />
            <div className="container">
              <div className="section-title" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h4>Order food with home delivery</h4>
                <h2>Your Cart</h2>
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
          {/* section end */}
          {/* section */}
          <section className="hidden-section">
            <div className="container">
              {/* CHECKOUT TABLE */}
              <div className="row">
                <div className="col-md-8">
                  <h4 className="cart-title">
                    Your cart <span>{categories.length} items</span>
                  </h4>
                  <table className="table table-border checkout-table">
                    <tbody>
                      <tr>
                        <th className="hidden-xs">Item</th>
                        <th>Description</th>
                        <th className="hidden-xs">Price</th>
                        <th>Count</th>
                        <th>Total</th>
                        <th />
                      </tr>
                      {categories.map((category, index) => (
                        <tr key={index}>
                          <td className="hidden-xs">
                            <a href="#">
                              <img
                                src={`${baseURL}${category.photo}`}
                                alt=""
                                className="respimg"
                              />
                            </a>
                          </td>
                          <td>
                            <h5 className="product-name">{category.item_name}</h5>
                          </td>
                          <td className="hidden-xs">
                            <h5 className="order-money">RS {parseFloat(category.price).toFixed(2)}</h5>
                          </td>
                          <td>
                            <input
                              type="number"
                              name={`cartin${index}`}
                              value={category.quantity || 1}
                              max={50}
                              min={1}
                              className="order-count"
                              onChange={(event) => handleQuantityChange(index, event)}
                            />
                          </td>
                          <td>
                            <h5 className="order-money">RS {(category.totalAmount || parseFloat(category.price)).toFixed(2)}</h5>
                          </td>
                          <td className="pr-remove">
                            <a href="#" title="Remove" onClick={() => { handleRemoveItem(category.cart_id); }} >
                              <i className="fal fa-times" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* COUPON */}
                  <div className="coupon-holder">
                    <input
                      type="text"
                      name="cartcoupon"
                      placeholder="Coupon code"
                    />
                    <button type="submit" className="btn-a">
                      Apply
                    </button>
                    <button type="submit" className="pull-right btn-uc">
                      Update Cart
                    </button>
                  </div>
                  {/* /COUPON */}
                </div>
                <div className="col-md-4">
                  {/* CART TOTALS */}
                  <div className="cart-totals dark-bg fl-wrap">
                    <h3>Cart totals</h3>
                    <table className="total-table">
                      <tbody>
                        <tr>
                          <th>Cart Subtotal:</th>
                          <td>${cartSubtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Shipping Total:</th>
                          <td>${shippingTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Total:</th>
                          <td>${totalAmount.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="submit" className="cart-totals_btn color-bg" onClick={handleProceedToCheckout}  >
                      <Link to="/userorder" style={{ color: "black", textDecoration: "none" }} >  Proceed to Checkout </Link>
                    </button>

                  </div>
                  {/* /CART TOTALS */}
                </div>
              </div>
              {/* /CHECKOUT TABLE */}
            </div>
            <div className="section-bg">
              <div className="bg" data-bg="images/bg/dec/section-bg.png" />
            </div>
          </section>
          {/* section end */}
          <div className="brush-dec2 brush-dec_bottom" />
        </div>
        {/* content end */}
        {/* footer */}
        <div className="height-emulator fl-wrap" />
        <footer className="fl-wrap dark-bg fixed-footer">
          <div className="container">
            <div className="footer-top fl-wrap">
              <a href="index.html" className="footer-logo">
                <img src="images/logo2.png" alt="" />
              </a>
              <div className="lang-wrap">
                <a href="#" className="act-lang">
                  En
                </a>
                <span>/</span>
                <a href="#">Fr</a>
              </div>
              <div className="footer-social">
                <span className="footer-social-title">Follow us :</span>
                <ul>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-vk" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* footer-widget-wrap */}
          
            {/* /footer-widget-wrap */}
          </div>
        </footer>
        {/* footer end */}
      </div>
      {/* wrapper end */}

      



    </>
  );
};
