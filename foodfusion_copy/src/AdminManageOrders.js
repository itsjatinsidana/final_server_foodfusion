
import { useEffect, useState } from "react"
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminManageOrders = () => {
    const [userOrder, setUserOrder] = useState([]);
    const fetchUserOrder = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showuserorders`, { method: "POST" });
            console.log(process.env.REACT_APP_API_URL);
           
            // const response = await fetch(`  /showuserorders`, { method: "POST" });
           
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setUserOrder(data.ans);
            console.log(userOrder)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() => {
        fetchUserOrder();
    }, [])


    const username = localStorage.getItem("un");
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/adminlogin');
        }
    }, [username, navigate]);

    const handleConfirm = (id) => {
        var formdata = new FormData();
        formdata.append("id", id);

        var url = `${process.env.REACT_APP_API_URL}handleconfirm`;

        fetch(url, { method: "POST", body: formdata })
            .then(response => response.text())
            .then(ans => renderAsHtml2(ans));
    }
    function renderAsHtml2(ans) {
        if (ans === "success") {
            console.log("confirm")



            fetchUserOrder();

        } else if (ans === "fail") {
            console.log("fail confirm")
        } else if (ans === "exception") {
            alert(ans);
        }

    }


    const handleReject = (id) => {
        var formdata = new FormData();
        formdata.append("id", id);

        var url = `${process.env.REACT_APP_API_URL}handlereject`;

        fetch(url, { method: "POST", body: formdata })
            .then(response => response.text())
            .then(ans => renderAsReject(ans));
    }
    function renderAsReject(ans) {
        if (ans === "success") {
            console.log("REJECTED")

            fetchUserOrder();

        } else if (ans === "fail") {
            console.log("fail REJECTED")
        } else if (ans === "exception") {
            alert(ans);
        }

    }

    return (
        <>
            <AdminNavbar />




            <br />
            <br />
            <br />
            <br />

            <div className="container mt-3" >
                <h2>User Orders</h2>
                <div className="table-responsive">
                    <table className="table table-hover ">
                        <thead className="table-success"  >
                            <tr>
                                <th>Category Name</th>
                                <th>Item Name</th>
                                <th>User Email</th>
                                <th>User Address</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Total Amount</th>
                                <th>Order At</th>
                                <th>Status</th>
                                <th>Decline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrder.map((order, index) => (


                                <tr key={index}>
                                    <td>{order.category_name}</td>
                                    <td>{order.item_name}</td>
                                    <td>{order.useremail}</td>
                                    <td>{order.address}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.total_amount}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.created_at}</td>
                                    <td>

                                        <button type="button" class="btn btn-success" onClick={() => { handleConfirm(order.id) }}>{order.status}</button>

                                    </td>
                                    <td><button type="button" class="btn btn-warning" onClick={() => { handleReject(order.id) }}>Reject</button></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}
export default AdminManageOrders