
import AdminNavbar from "./AdminNavbar";
import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminManageMenu = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [categoryname, setCategoryName] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const username = localStorage.getItem("un");
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/adminlogin');
        }
    }, [username, navigate]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showcategory`, { method: "POST" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setCategories(data.ans);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const a = $(".bg");
        console.log('Elements with class bg:', a);
        a.each(function () {
            if ($(this).attr("data-bg")) {
                $(this).css("background-image", "url(" + $(this).data("bg") + ")");
            }
        });
        if ($(".header-cart_wrap_container").length > 0) {
            new PerfectScrollbar('.header-cart_wrap_container', {
                swipeEasing: true,
                minScrollbarLength: 20
            });
        }
    }, []);


    const fetchMenuItems = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}showmenuitems`, { method: "POST" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            setMenuItems(data.ans);
            if (data.length > 0) {
                setSelectedCategory(data[0].category_name); // Set the first category as default selected
            }
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };
    useEffect(() => {
        fetchMenuItems();
    }, []);

    const addCategory = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('category', category);
        formData.append('username', username);


        const url = `${process.env.REACT_APP_API_URL}addmenucategory`;

        try {
            const response = await fetch(url, { method: "POST", body: formData });
            const ans = await response.text();
            if (ans === "success") {
                alert("Category added successfully");
                setCategory(''); // Reset the input field after successful addition
                // Refresh categories
                fetchCategories();
            }
             else if (ans === "fail") {
                alert("Category already exists");
            } 

            else if (ans === "limit_exceeded") {
                alert("limit_exceeded! upgrade your plan");
            } 
            
            else if (ans === "exception") {
                alert(ans);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    const addItem = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('photo', photo);
        formData.append('categoryname', categoryname);
        formData.append('username', username);  // Assuming username is the identifier for the admin
    
        const url = `${process.env.REACT_APP_API_URL}addmenuitem`;
    
        try {
            const response = await fetch(url, { method: "POST", body: formData });
            const ans = await response.json();  // Parse the response as JSON
    
            if (ans.status === "success") {
                alert("Item added successfully");
                // Reset form fields after successful addition
                setName(''); 
                setPrice('');
                setDescription('');
                setPhoto(null);
                setCategoryName('');
                // Refresh menu items
                fetchMenuItems();
            } else if (ans.status === "fail") {
                alert("Item already exists");
            } else if (ans.status === "limit_exceeded") {
                alert(`You have reached the maximum limit of ${ans.plan_menuitems} items. Please upgrade your plan to add more.`);
                setName(''); 
                setPrice('');
                setDescription('');
                setPhoto(null);
                setCategoryName('');
            } else if (ans.status === "admin_not_found") {
                alert("Admin not found");
            } else if (ans.status === "exception") {
                alert("An error occurred: " + ans.message);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    
    // const addItem = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('description', description);
    //     formData.append('price', price);
    //     formData.append('photo', photo);
    //     formData.append('categoryname', categoryname);
    //     formData.append('username', username);

    //     const url = `${process.env.REACT_APP_API_URL}addmenuitem`;
    //     // const url = "http://localhost:8080/addmenuitem";

    //     try {
    //         const response = await fetch(url, { method: "POST", body: formData });
    //         const ans = await response.text();
          
    //         if (ans === "success") {
    //             alert("Item added successfully");
    //             setName(''); // Reset fields after successful addition
    //             setPrice('');
    //             setDescription('');
    //             setPhoto(null);
    //             setCategoryName('');
    //             // Refresh menu items
    //             fetchMenuItems();
    //         } else if (ans === "fail") {
    //             alert("Item already exists");
    //         } 
           
    //         else if (ans.status === "limit_exceeded") {
               
                
    //             alert(`You have reached the maximum limit of ${ans.status.plan_menuitems} items. Please upgrade your plan.`);
    //         } 
    //         else if (ans === "exception") {
    //             alert(ans);
    //         }
    //     } catch (error) {
    //         console.error('Error adding item:', error);
    //     }
    // };

    const items = [...new Set(menuItems.map(item => item.category_name))];


    function deleteMenuItem(items_id) {

        var formdata = new FormData(); 
        formdata.append("items_id", items_id);
        var url = `${process.env.REACT_APP_API_URL}deletemenuitem`;

        fetch(url, { method: "POST", body: formdata })
            .then(response => response.text())
            .then(ans => renderAsHtml2(ans));
    }

    function renderAsHtml2(ans) {

        if (ans === "success") {
            alert("item deleted succsessfully ")
            fetchMenuItems();

        } else if (ans === "fail") {
            alert("item dose not exist")
        } else if (ans === "exception") {
            alert(ans);
        }

    }
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemphoto, setItemPhoto] = useState(null);
    const [itemCategoryName, setItemCategoryName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemsId, setItemsId] = useState(''); // State for items_id

    useEffect(() => {
        getMenuItemDetail();
      
    }, [itemsId]);

    function getMenuItemDetail() {
     
        var url = `${process.env.REACT_APP_API_URL}getmenueditdetail`;
        fetch(url, { method: "post" })
            .then(response => response.text())
            .then(ans => renderAsHtml(ans));
    }

    function renderAsHtml(ans) {
        const parts = ans.split(";");
        setItemName(parts[0] || '');
        setItemPrice(parts[1] || '');
        setItemPhoto(parts[2] || '');
        setItemCategoryName(parts[3] || '');
        setItemDescription(parts[4] || '');
        setItemsId(parts[5] || ''); // Assuming the items_id is included in the response
    }

    function editMenuItems(event) {
        event.preventDefault();

        var formdata = new FormData();
        formdata.append("itemname", itemName);
        formdata.append("itemprice", itemPrice);
        formdata.append("itemcategoryname", itemCategoryName);
        formdata.append("itemdescription", itemDescription);
        formdata.append("itemphoto", itemphoto);
        formdata.append("items_id", itemsId); // Append items_id to form data

        var url = `${process.env.REACT_APP_API_URL}editmenuitem`;

        fetch(url, { method: "POST", body: formdata })
            .then(response => response.text())
            .then(ans => renderAsEdit(ans));
    }

    function renderAsEdit(ans) {
        if (ans === "success") {
            alert("Menu edited successfully");
            fetchMenuItems();
        } else if (ans === "fail") {
            alert("Menu record not found");
        } else if (ans === "exception") {
            alert("An exception occurred");
        }
    }



    return (
        <>
            <AdminNavbar />
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Categories</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Category Name"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={addCategory}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="myNewModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Menu Items</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 mt-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Price"
                                        name="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="Image"
                                        name="photo"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label style={{ color: 'black' }}>Select Category</label>
                                    <select
                                        className="user-box-input text-black"
                                        style={{ width: '100%' }}
                                        value={categoryname}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    >
                                        <option></option>
                                        {categories.map((category, index) => (
                                            <option key={index} style={{ color: 'black' }} value={category.category_name}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={addItem}
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* edit modal */}
            <div className="modal" id="myNewModaledit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Menu Items</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 mt-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="itemname"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Price"
                                        name="itemprice"
                                        value={itemPrice}
                                        onChange={(e) => setItemPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="Image"
                                        name="itemphoto"
                                        onChange={(e) => setItemPhoto(e.target.files[0])}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label style={{ color: 'black' }}>Select Category</label>
                                    <select
                                        className="user-box-input text-black"
                                        style={{ width: '100%' }}
                                        value={itemCategoryName}
                                        onChange={(e) => setItemCategoryName(e.target.value)}
                                    >
                                        <option></option>
                                        {categories.map((category, index) => (
                                            <option key={index} style={{ color: 'black' }} value={category.category_name}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        name="itemdescription"
                                        value={itemDescription}
                                        onChange={(e) => setItemDescription(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={editMenuItems}
                            >
                                Edit Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section data-scrollax-parent="true">
                <div className="container">
                    <div className="section-title">
                        <h2>Manage Menu</h2>
                        <div className="dots-separator fl-wrap">
                            <span />
                        </div>
                    </div>
                    <div className="cards-wrap fl-wrap">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="content-inner fl-wrap">
                                    <div className="cf-inner">
                                        <div className="bg" data-bg="images/services/1.jpg" />
                                        <div className="overlay" />
                                        <div className="inner">
                                            <h2>Add Categories</h2>
                                            <button
                                                type="button"
                                                className="btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#myModal"
                                                id="manage-menu-btn"
                                            >
                                                Add Here
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="content-inner fl-wrap">
                                    <div className="cf-inner">
                                        <div className="bg" data-bg="images/services/2.jpg" />
                                        <div className="overlay" />
                                        <div className="inner">
                                            <h2>Add Menu Items</h2>
                                            <button
                                                type="button"
                                                className="btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#myNewModal"
                                                id="manage-menu-btn"
                                            >
                                                Add Here
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-dec sec-dec_top" />
                        <div className="section-dec sec-dec_bottom" />
                    </div>
                    <div
                        className="images-collage-item col_par"
                        style={{ width: 120 }}
                        data-position-left={83}
                        data-position-top={87}
                        data-zindex={1}
                        data-scrollax="properties: { translateY: '150px' }"
                    >
                        <img src="images/cube.png" alt="" />
                    </div>
                </div>
                <div className="section-bg">
                    <div className="bg" data-bg="images/bg/dec/section-bg.png" />
                </div>
            </section>

            {/* displaying menu items */}
            <section className="parallax-section dark-bg hidden-section" data-scrollax-parent="true">
                <div className="brush-dec2" />
                <div className="brush-dec" />
                <div
                    className="bg par-elem bg_tabs"
                    data-bg="images/bg/4.jpg"
                    data-scrollax="properties: { translateY: '30%' }"
                />
                <div className="cd-tabs-layer" data-frame={10}>
                    <div className="tabs-layer" />
                </div>
                <div className="overlay op7" />
                <div className="container">
                    <div className="section-title">
                        <h4>view menu</h4>
                        <h2>Enjoy Restaurants Specialties</h2>
                        <div className="dots-separator fl-wrap">
                            <span />
                        </div>
                    </div>
                    {/*  hero-menu_header  end*/}
                    <div className="hero-menu tabs-act fl-wrap">
                        <div className="row">
                            {/*  hero-menu_header*/}
                            <div className="col-md-3">
                                <div className="hero-menu_header fl-wrap">
                                    <ul className="tabs-menu no-list-style change_bg">
                                        {items.map((category, index) => (
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    data-bgtab="images/bg/4.jpg"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedCategory(category);
                                                    }}
                                                >
                                                    <span>{index + 1}.</span> {category}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/*  hero-menu_header  end*/}
                            {/*  hero-menu_content   */}
                            <div className="col-md-8">
                                <div className="hero-menu_content fl-wrap">
                                    <div className="tabs-container">
                                        <div className="tab">

                                            {/*tab */}
                                            {menuItems
                                                .filter(menuItem => menuItem.category_name === selectedCategory)
                                                .map((menuItem, index) => (
                                                    <div key={index} id="tab-1" className="tab-content first-tab">

                                                        {/* header-menu-item */}
                                                        <div className="hero-menu-item">
                                                            <div className="hero-menu-item-title fl-wrap">
                                                                <h6>
                                                                    <span>{index + 1}.</span> {menuItem.name} {/* Dynamic menu item name */}
                                                                </h6>
                                                                <div className="hmi-dec" />
                                                                <span className="hero-menu-item-price">RS.{menuItem.price}
                                                                    <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '80px' }} onClick={() => deleteMenuItem(menuItem.items_id)}>Delete</button>
                                                                    {/* <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal"
                                                                        data-bs-target="#myNewModaledit" style={{ marginLeft: '80px' }}>Edit</button> */}
                                                                </span> {/* Dynamic price */}


                                                            </div>

                                                            <div className="hero-menu-item-details">
                                                                <p>{menuItem.description}</p> {/* Dynamic description */}
                                                            </div>


                                                        </div>

                                                    </div>

                                                ))}
                                            {/* header-menu-item end */}

                                        </div>
                                        {/*tab end */}
                                    </div>
                                </div>
                            </div>
                            {/*  hero-menu_content end  */}
                        </div>
                    </div>
                    {/*  hero-menu  end*/}
                </div>
            </section>
        </>
    )
};

