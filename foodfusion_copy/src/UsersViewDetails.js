import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

export const UserViewDetails = () => {
    const[userDetails,setUserDetails] = useState([]);

    const getUserDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}getuserdetails`, { method: "GET" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setUserDetails(data.ans);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(()=>{
    getUserDetails();
    },[])

    return (
        <>
        <AdminNavbar/>
        <br/>
        <br/>
        <br/>
        <br/>
            <div className="container mt-3">
                <h2>User details</h2><br/>
             <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead className="table-success">
                        <tr>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>User Number</th>
                            <th>User Address</th>
                            <th>User Active</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userDetails.map((details,index) =>(

                  
                        <tr key={index}>
                            
                            <td> {details.user_email} </td>
                            <td>{details.user_name}</td>
                            <td>{details.user_number}</td>
                            <td>{details.user_address}</td>
                            <td>{details.user_active}</td>
                        </tr>
                       
                    ))}      
                    </tbody>
                </table>
                </div>
            </div>;

        </>
    )
}