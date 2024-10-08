import { Outlet } from "react-router-dom"
import UserNavbar from "./UserNavbar"
import { useEffect, useState } from "react";


export const UserLayout = ({ children,length }) => {

    const [categories, setCategories] = useState([]);
    const useremail = sessionStorage.getItem("useremail");

    useEffect(() => {
        if (useremail) {
            fetchCartItems();
        }
    }, [useremail]);
 

    const fetchCartItems = async () => {
        const formData = new FormData();
        formData.append('useremail', useremail);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showcartitems`, { method: "POST", body: formData });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setCategories(data.ans);
            console.log(categories.length)

        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    return (
        <>
            <UserNavbar length={length} />

            {children}
        </>
    )
}