import { useState, useEffect } from "react";
import { UserViewMenu } from "./UserViewMenu";
import UserNavbar from "./UserNavbar";
import { useDispatch } from "react-redux";
import { setMenuItems } from "./Store";
import { selectMenuItems } from "./Store/Slices/menuItem";
import { useSelector } from "react-redux";
import Banner from "./Components/Banner";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";

export const UserHome = ({ fetchCartItems }) => {
    const dispatch = useDispatch();
    const menuItems = useSelector(selectMenuItems)

    const [username, setUsername] = useState('');
    // const [items, setItems] = useState([]);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showusermenuitems`, { method: "POST" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            dispatch(setMenuItems({ menuItems: data.ans }));
            // setItems(data.ans);
            console.log(data.ans)

            // if (data.length > 0) {
            //     setSelectedCategory(data[0].category_name);
            // }

        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };
    useEffect(() => {
        fetchMenuItems();
    }, []);



    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    useEffect(() => {
        const adjustMargin = () => {
            const bannerWrapper1 = document.querySelector('.banner-wrapper1');
            const contentBanner = document.getElementById('content-banner');
            const menuWrapper = document.querySelector('.menu-wrapper');
       

            if (bannerWrapper1 && contentBanner && menuWrapper ) {
                const height1 = bannerWrapper1.offsetHeight;
                const height2 = contentBanner.offsetHeight;
                menuWrapper.style.marginTop = `${height1 + height2 + 80}px`;
            }
        };

        adjustMargin();
        window.addEventListener('resize', adjustMargin);

        return () => {
            window.removeEventListener('resize', adjustMargin);
        };
    }, [menuItems]);


    console.log("menuItems in UserHome:", menuItems);

    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!uEmail) {
            navigate("/userlogin")
        }
    }, [uEmail, navigate])

    return (
        <>


            <Banner />

            {menuItems && menuItems.length > 0 ? (
                <div >
                    <UserViewMenu fetchCartItems={fetchCartItems} />
                </div>

            ) : (
                <div>Loading menu items...</div>
            )}

            <Footer />

            <style jsx>
                {
                    `
    .menu-wrapper{
    marginTop: 2000px
    }
    `
                }
            </style>
        </>
    )
}