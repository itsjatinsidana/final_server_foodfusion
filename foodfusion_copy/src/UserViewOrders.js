
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const UserViewOrders = () => {
    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();


    useEffect(()=>{
        if(!uEmail){
            navigate("/userlogin")
        }
    },[uEmail,navigate])
    const Email = sessionStorage.getItem("useremail");

    const [order, setOrder] = useState([]);
    const fetchUserOrder = async () => {
        var formdata = new FormData();
        formdata.append("email", Email)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}userorders`, { method: "POST", body: formdata });
            // const response = await fetch("http://localhost:8080/userorders", { method: "POST", body: formdata });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setOrder(data.ans);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() => {
        fetchUserOrder();
    }, [])

    return (
        <>
            <div className="content">
                {/* section */}
                <section className="parallax-section hero-section hidden-section" data-scrollax-parent="true">
                    <img className="bg par-elem" src="images/bg/17.jpg" alt="img" data-scrollax="properties: { translateY: '30%' }" />
                    <div className="overlay" />
                    <div className="container">
                        <div className="section-title" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <h4>View your Orders</h4>
                            <h2>Your Orders</h2>
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
                <br />
                <br />
                <div className="container mt-3">
                <br />
                    <h2>View Your Orders</h2>
                    <br />
                    <br />
                    <div className="table-responsive">
                    <table className="table table-dark table-hover" s>
                        <thead className="table-success"style={{height:"70px"}}>
                            <tr>
                                <th>Category Name</th>
                                <th>Item Name</th>
                                <th>Address</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Total Amount</th>
                                <th>Created At</th>

                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((order, index) => (


                                <tr key={index}>
                                    <td>{order.category_name}</td>
                                    <td>{order.item_name}</td>

                                    <td>{order.address}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.total_amount}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.created_at}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                <div className="brush-dec2 brush-dec_bottom" />
            </div>
            <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "200px" }}>
                            <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
                            <div className="designedby">
                                <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
                            </div>
                        </div>
        </>
    )
}

export default UserViewOrders