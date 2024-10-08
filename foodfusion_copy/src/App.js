import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';

import AdminLoginForm from './AdminLoginForm';
import AdminNavbar from './AdminNavbar';
import { AdminDashboard } from './AdminDashboard';
import { AdminManageMenu } from './AdminManageMenu';
import { UserSignup } from './UserSignup';
import UserLogin from './UserLogin';
import { UserHome } from './UserHome';
import { UserViewDetails } from './UsersViewDetails';
import { UserViewMenu } from './UserViewMenu';
import UserNavbar from './UserNavbar';
import { Cart } from './Cart';
import UserOrder from './UserOrder';
import Thanku from './Thanku';
import AdminManageOrders from './AdminManageOrders';
import { UserLayout } from './UserLayout';
import UserViewOrders from './UserViewOrders';
import Banner from './Components/Banner';
import CreatePanel from './panel/CreatePanel';
import ViewPanel from './panel/ViewPanel';
import AdminPlan from './AdminPlan';




function App() {
    const [categories, setCategories] = useState([]);
    const useremail = sessionStorage.getItem("useremail");



    const fetchCartItems = async () => {
        const formData = new FormData();
        formData.append('useremail', useremail);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showcartitems`, { method: "POST", body: formData });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setCategories(data.ans);

        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };



    return (
        <>

            <BrowserRouter>
                {/* <UserNavbar length={categories.length} /> */}

                <Routes>

                    <Route path='/' element={<Home />} />
                    
                    
                    <Route path='/banner' element={<UserLayout length={categories.length}><Banner /> </UserLayout>} />
                    <Route path='/adminlogin' element={<AdminLoginForm />} />
                    <Route path='/adminnavbar' element={<AdminNavbar />} />
                    {/* <Route path='/usernavbar' element={<UserNavbar />} /> */}
                    {/* <Route path='/adminnavbar' element={<AdminNavbar />} /> */}
                    <Route path='/admindashboard' element={<AdminDashboard />} />
                    <Route path='/managemenu' element={<AdminManageMenu />} />
                    <Route path='/usersignup' element={<UserSignup />} />
                    <Route path='/userlogin' element={<UserLogin />} />
                    <Route path='/userhome' element={<UserLayout length={categories.length}> <UserHome fetchCartItems={fetchCartItems} /></UserLayout>} />
                    <Route path='/usersviewdetail' element={<UserViewDetails />} />
                    <Route path='/userviewmenu' element={<UserLayout length={categories.length}><UserViewMenu fetchCartItems={fetchCartItems} /></UserLayout>} />
                    <Route path='/userviewcart' element={<UserLayout length={categories.length}><Cart categories={categories} setCategories={setCategories} fetchCartItems={fetchCartItems} /></UserLayout>} />
                    <Route path='/userorder' element={<UserLayout length={categories.length}><UserOrder /></UserLayout>} />
                    <Route path='/success-page' element={<UserLayout length={categories.length}><Thanku /></UserLayout>} />
                    <Route path='/uservieworder' element={<UserLayout length={categories.length}><UserViewOrders /></UserLayout>} />
                    <Route path='/userManageOrders' element={<AdminManageOrders />} />
                    <Route path='/yourplan' element={<AdminPlan />} />


                </Routes>

            </BrowserRouter>
        </>
    )
}
export default App;
