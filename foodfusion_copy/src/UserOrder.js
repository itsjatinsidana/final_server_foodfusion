

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function UserOrder() {
    const user_name = sessionStorage.getItem("username");
    const useremail = sessionStorage.getItem("useremail");
    const [address, setAddress] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [checkoutData, setCheckoutData] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    // const [showMap, setShowMap] = useState(false);
    const [mapAddress, setMapAddress] = useState('');
    const [flatAddress, setFlatAddress] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [stateAddress, setStateAddress] = useState('');
    const [cityAddress, setCityAddress] = useState('');
    const [countryAddress, setCountryAddress] = useState('');
    const [finalAddress, setFinalAddress] = useState([]);


    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    const openCageApiKey = '87a03aad642f463fa42ba2df4a0176e2';
    // const olaMapsApiKey = 'Yflg77KnGAO7EwDG55opTgmzhNEs5kh28Upv6xdM';


    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);


    const clearLocation = () => {
        setLocation({ latitude: null, longitude: null });
        setMapAddress('');
        setIsMapAddressFetched(false);
        setFlatAddress('');
        setCityAddress('');
        setStateAddress('');
        setStreetAddress('');
        setStateAddress('');
        setCountryAddress('');
    };

    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setError(null);
                    // setShowMap(true);
                    fetchAddress(position.coords.latitude, position.coords.longitude);
                    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
                },
                (error) => {
                    setError(error.message);
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };
    const [isMapAddressFetched, setIsMapAddressFetched] = useState(false);
    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`
            );
            // const response = await axios.get(
            //     `https://api.olamaps.com/geocode/v1/json?q=${latitude}+${longitude}&key=${olaMapsApiKey}`
            // );
            // const response = await axios.get(
            //     `https://api.olamaps.io/places/v1/reverse-geocode?latlng=12.923946516889448,77.5526110768168&api_key=E3PMVccZP1Lu30sp7Yhua`
            // );
            if (response.data.results && response.data.results[0]) {
                setMapAddress(response.data.results[0].formatted);
                setIsMapAddressFetched(true);
            } else {
                setError("Address not found.");
            }
        } catch (error) {
            setError("Error fetching address.");
        }
    };

    useEffect(() => {
        if (!uEmail) {
            navigate("/userlogin")
        }
    }, [uEmail, navigate])
    useEffect(() => {
        const data = localStorage.getItem('checkoutData');
        if (data) {
            setCheckoutData(JSON.parse(data));
            localStorage.removeItem('checkoutData');
        }
    }, []);

    useEffect(() => {
        if (checkoutData) {
            fetchOrderDetails();
        }
    }, [checkoutData]);

    const fetchOrderDetails = async () => {
        const itemIds = checkoutData.itemIds.join(',');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}fetchOrderDetails?itemIds=${itemIds}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            console.log("Fetched Order Details:", data);

            // Ensure data is an array before setting it

            setOrderDetails(data.ans);

        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };
    console.log(orderDetails, "ordrr details")

    const fetchUserData = async () => {
        const formData = new FormData();
        formData.append('useremail', useremail);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showuseraddress`, { method: "POST", body: formData });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setAddress(data.ans);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    console.log("user data", address)
    useEffect(() => {
        fetchUserData();
    }, []);

    const userid = address.map(user => user.id)


    const fetchUserAddress = async () => {

        console.log("user id", userid)
        const formData = new FormData();

        formData.append('userid', userid);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showuseraddressdata`, { method: "POST", body: formData });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            // setAddress(data.ans);
            setFinalAddress(data.ans);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    // console.log("user data", address)
    useEffect(() => {
        if (address.length > 0) {
            const userId = address[0].id; // Assuming there's only one user
            fetchUserAddress(userId);
        }
    }, [address]);

    const addAddress = async (event) => {
        event.preventDefault();
        const latitude = location.latitude;
        const longitude = location.longitude;
        const map_address = mapAddress;
        const user_id = address.map(user => user.id);



        const formdata = new FormData();
        // formdata.append('useremail', useremail);
        formdata.append("flataddress", flatAddress);
        formdata.append("streetaddress", streetAddress);
        formdata.append("stateaddress", stateAddress);
        formdata.append("countryaddress", countryAddress);
        formdata.append("cityaddress", cityAddress);
        formdata.append("mapaddress", map_address);
        formdata.append("latitude", latitude);
        formdata.append("longitude", longitude);
        formdata.append("userid", user_id);

        if (flatAddress === "" || streetAddress === "" || stateAddress === "" || countryAddress === ""
            || cityAddress === "" 
            // || isMapAddressFetched === false
        ) 
            
            {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Add Your Address !'
            });
        }
        else {

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}addaddress`, { method: "POST", body: formdata });
                const ans = await response.text();

                if (ans === "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'New Address Added Successfully',
                        text: 'You have successfully added a new address!',
                        showConfirmButton: true,
                    });
                    fetchUserData();
                    setMapAddress('');
                    setIsMapAddressFetched(false);
                    setFlatAddress('');
                    setCityAddress('');
                    setStateAddress('');
                    setStreetAddress('');
                    setStateAddress('');
                    setCountryAddress('');
                } else if (ans === "fail") {
                    Swal.fire({
                        icon: 'error',
                        title: 'New Address Addition Failed',
                    });
                } else if (ans === "exception") {
                    alert(ans);
                }
            } catch (error) {
                console.error('Error adding address:', error);
            }
        };
    }
    if (!checkoutData) {
        return <div>Loading...</div>;
    }

    const { itemIds, cartSubtotal, shippingTotal, totalAmount } = checkoutData;

    const handleAddressChange = (event) => {
        const selected = event.target.value;

        setSelectedAddress(selected);
    };
    const cart_id = orderDetails.map(item => item.cart_id);

    const handlePayment = async () => {
        if (!selectedAddress) {
            Swal.fire({
                icon: 'warning',
                title: 'Select Address',
                text: 'Please select an address before proceeding to payment.',
                showConfirmButton: true,
            });
            return;
        }
        const orderUrl = `${process.env.REACT_APP_API_URL}api/payment/create-order`;
        const amount = totalAmount * 100; // amount in the smallest currency unit (e.g., 50000 paise = 500 INR)

        try {
            const response = await fetch(orderUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const options = {
                key: 'rzp_test_hh7ClUsDJMuKsw',
                amount: data.amount,
                currency: data.currency,
                name: 'Food Fusion',
                description: 'Test Transaction',
                order_id: data.id,
                handler: async function (response) {


                    const formdata = new FormData();
                    formdata.append("amount", totalAmount);
                    formdata.append('cart_id', cart_id);
                    formdata.append('razorpaymentid', response.razorpay_payment_id);
                    formdata.append('razororderid', response.razorpay_order_id);
                    formdata.append('razorsignature', response.razorpay_signature);
                    formdata.append('address', selectedAddress);

                    try {
                        const res = await fetch(`${process.env.REACT_APP_API_URL}success`, {
                            method: 'POST',
                            body: formdata,
                        });

                        const result = await res.text(); // Note the use of await here

                        console.log('Response from /success:', result);

                        if (result === "success") {
                            setOrderDetails([]);
                            setCheckoutData('')
                            console.log("huibubecubuicbucicbcusycgsukcskcb7i", orderDetails, checkoutData)
                            localStorage.removeItem('checkoutData');
                            Swal.fire({
                                icon: 'success',
                                title: 'Order Placed',
                                text: 'You have successfully Placed an order!',
                                showConfirmButton: true,
                            }).then(() => {
                                window.location.href = "/success-page"; // Redirect to success page
                            });
                        }

                        else if (result === "fail") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Order Already Placed',
                            });
                        } else if (result === "exception") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Exception Occurred',
                                text: result.message, // Ensure message is correct
                            });
                        }
                    } catch (error) {
                        console.error('Error placing order:', error);
                    }
                },
                prefill: {
                    name: 'Test User',
                    email: 'test.user@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Corporate Office',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error('There was an error!', error);
        }
    }




    return (
        <>
            <section
                className="parallax-section hero-section hidden-section"
                data-scrollax-parent="true"
            >
                <img className="bg par-elem" src="images/bg/10.jpg" alt="img" data-scrollax="properties: { translateY: '30%' }" />
                <div className="overlay" />
                <div className="container">
                    <div className="section-title" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <h4>CheckOut.</h4>
                        <h2>User Confirmation</h2>
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
            <div className='container alert-light'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='text-center'>{user_name}, Please Select Your Address</h1>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <form>
                    <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#myModal"
                        style={{ marginBottom: "50px" }}>
                        Add Your Address
                    </button>

                    <select
                        className="form-select form-select-lg"
                        onChange={handleAddressChange}
                        value={selectedAddress}
                    >
                        <option value="">Select Address</option>

                        {finalAddress?.map((addr, index) => {

                            const fullAddress = `${addr.flat_no}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`;
                            // <option value="">{fullAddress}</option>

                            return (
                                <option key={index} value={fullAddress}>
                                    {fullAddress}
                                </option>
                            );
                        })}

                    </select>

                </form>
            </div>

            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Address</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearLocation} />
                        </div>
                        <div className="modal-body">
                            <div style={{ position: "relative", marginBottom: "20px", left: "10px", color: "#A02334", padding: "10px", cursor: "pointer" }}
                                onClick={fetchLocation}>
                                <FontAwesomeIcon icon={faLocationCrosshairs} /> <nbsp />
                                Detect my location
                            </div>
                            {/* {location.latitude && location.longitude && (
                                <div style={{ marginTop: '10px' }}>
                                    <p>Latitude: {location.latitude}</p>
                                    <p>Longitude: {location.longitude}</p>
                                </div>
                            )} */}
                            {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}

                            {mapAddress && (
                                <>
                                    <span className="label lebel-success "
                                        style={{
                                            color: "black", padding: "9px",backgroundColor:"beige"

                                        }}>Detected Address :</span>
                                    <div className="mb-4 mt-4" style={{ color: "white" }}>

                                        <input type="text" className="form-control form-control-lg" placeholder={mapAddress} readOnly
                                            style={{ backgroundColor: "#DDE6ED", color: "white", fontSize: "20px" }} />
                                    </div>
                                </>
                            )}
                            {error && <p style={{ color: 'red' }}>Error: {error}</p>}


                            {/* {isMapAddressFetched && ( */}
                                <>
                                 <span className="label label-success"
                                        style={{
                                            color: "black", padding: "9px",marginBottom:"90px",backgroundColor:"beige"

                                        }}>Fill Your Full Address :</span>
                                       
                                    <div className="row mt-4 mb-2">
                                        <div className='col'>
                                            <input type="text" className="form-control form-control-lg" placeholder="Flat No./House No."
                                                value={flatAddress}
                                                onChange={(e) => setFlatAddress(e.target.value)} />
                                        </div>

                                        <div class="col">
                                            <input type="text" className="form-control form-control-lg" placeholder="Street"
                                                value={streetAddress}
                                                onChange={(e) => setStreetAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className='col'>
                                            <input type="text" className="form-control form-control-lg" placeholder="city"
                                                value={cityAddress}
                                                onChange={(e) => setCityAddress(e.target.value)} />
                                        </div>

                                        <div class="col">
                                            <input type="text" className="form-control form-control-lg" placeholder="State"
                                                value={stateAddress}
                                                onChange={(e) => setStateAddress(e.target.value)} />
                                        </div>

                                        <div class="col">
                                            <input type="text" className="form-control form-control-lg" placeholder="Country"
                                                value={countryAddress}
                                                onChange={(e) => setCountryAddress(e.target.value)} />
                                        </div>
                                    </div>

                                </>


                            {/* )} */}

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={addAddress}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* show map */}


            {/* <Modal show={showMap} onHide={() => setShowMap(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="gmap_canvas">
                        {location.latitude && location.longitude && (
                            <iframe
                                width="100%"
                                height="400px"
                                id="gmap_canvas"
                                src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&ie=UTF8&iwloc=&output=embed`}
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            ></iframe>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowMap(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}


            {/* show map */}






            <div className="brush-dec2 brush-dec_bottom" />
            <div className="container mt-3">
                <h2>View Your Order Details</h2>
                <div class="table-responsive">
                    <table className="table table-hover">
                        <thead className='table-success'>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.length > 0 ? (
                                orderDetails.map((item) => (
                                    <tr key={item.cart_id} style={{ padding: "30px" }}>
                                        <td style={{ padding: "30px" }}>{item.item_name}</td>
                                        <td style={{ padding: "30px" }}>Rs.{item.price}</td>
                                        <td style={{ padding: "30px" }}>{item.quantity}</td>
                                        <td style={{ padding: "30px" }}>Rs.{item.total_amount}</td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="3">No order details found</td>
                                </tr>
                            )}
                            <tr>
                                <td style={{ padding: "30px" }} >Shipping Total</td>
                                <td></td>
                                <td></td>
                                <td >Rs.  {shippingTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "30px" }} > Total Amount</td>
                                <td></td>
                                <td></td>
                                <td >Rs.  {totalAmount}</td>
                            </tr>
                            {/* <tr>
                            <td style={{ padding: "30px" }} > Address </td>
                            <td></td>
                            <td></td>
                            <td>  {selectedAddress || 'No address selected'}</td>
                        </tr> */}
                        </tbody>

                    </table>
                    <table>
                        <tr >
                            <td style={{ padding: "30px"}} > Address: </td>
                            

                            <td style={{ padding: "30px"}}>  {selectedAddress || 'No address selected'}</td>
                        </tr>
                    </table>
                </div>
                <div className='d-grid ' style={{ paddingBottom: "20px" }}>
                    <button type="button" className="btn btn-outline-success" onClick={handlePayment}>
                        Pay Now
                    </button>
                </div>
            </div>
            <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "100px" }}>
                <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
                <div className="designedby">
                    <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
                </div>
            </div>
        </>
    );
}

export default UserOrder;

