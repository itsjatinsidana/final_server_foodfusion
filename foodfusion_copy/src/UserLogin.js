import { useState, useEffect } from "react"
import Swal from "sweetalert2";


const UserLogin = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [username, setUsername] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
   

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    function checkLogin(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('useremail', userEmail);
        formData.append('userpassword', userPassword);

        if (userEmail === "" || userPassword === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter The Form Properly !'
            });
        } else {

            // var url = "http://localhost:8080/checkuserlogin";
            // var url = "http://165.22.211.208:8080/checkuserlogin";
            var url = `${process.env.REACT_APP_API_URL}checkuserlogin`;

            fetch(url, { method: "POST", body: formData })
                .then(response => response.json())
                .then(ans => renderAsHtml(ans));
        }

        function renderAsHtml(ans) {



            if (ans.status === "success") {

                const userName = ans.user_name;
                localStorage.setItem("username", userName);
                sessionStorage.setItem("username", userName);
                Swal.fire({
                    icon: 'success',
                    title: 'login Successful',
                    text: 'You have successfully Logged up!',
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/userhome";
                    }
                });
                sessionStorage.setItem("useremail", userEmail);
                updateUserActiveStatus(userEmail);
                localStorage.setItem("useremail", userEmail);



            } else if (ans.status === "fail") {

                Swal.fire({
                    icon: 'error',
                    title: 'login Failed',
                    text: 'Invalid Email/Password!',
                });

            } else if (ans.status === "exception") {
                alert(ans);
            }
        }

    }


    const updateUserActiveStatus = async (useremail) => {
        var url = `${process.env.REACT_APP_API_URL}updateuserstatus`;
        const formData = new FormData();
        formData.append('useremail', useremail);


        fetch(url, { method: "POST", body: formData })
            .then(response => response.text())
            .then(ans => renderAsHtml(ans));
    };
    function renderAsHtml(ans) {
        if (ans === "success") {

            console.log("isactive");

        } else if (ans === "fail") {

            console.log("isActive fails")

        } else if (ans === "exception") {
            alert(ans);
        }

    }
    return (
        <>
            {/* <div className="container-fluid">

                <div className="mt-1 p-4 text-white rounded">
                    <img src='images/bg/4.jpg' alt='' id='login-bg' />
                    <h2 className='text-light' id='text'>User Login</h2>
                </div>
            </div> */}
            <section
                className="hidden-section big-padding con-sec"
                data-scrollax-parent="true"
                id="sec3"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="section-title text-align_left">
                                <h2>Login Form</h2>
                                <div className="dots-separator fl-wrap">
                                    <span />
                                </div>
                            </div>
                            <div className="text-block ">
                                <h4 >
                                    Attention {username}! You must enter your login credentials.
                                </h4>
                            </div>

                            <div className="contactform-wrap">
                                <div id="message" />
                                <form
                                    className="custom-form"

                                    name="contactform"
                                    id="contactform"
                                >
                                    <fieldset>
                                        <div id="message2" />
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input
                                                    type="email"
                                                    name="useremail"
                                                    id="name2"
                                                    placeholder="UserEmail *"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}

                                                />
                                            </div>

                                            <div className="col-sm-12">
                                                <input
                                                    type="Password"
                                                    name="userpassword"
                                                    id="phone2"
                                                    placeholder="Password*"
                                                    value={userPassword}
                                                    onChange={(e) => setUserPassword(e.target.value)}

                                                />
                                            </div>

                                        </div>
                                        <button
                                            className="btn float-btn flat-btn color-bg"
                                            id="submit_cnt" onClick={checkLogin}>

                                            Login <i className="fal fa-long-arrow-right" />
                                        </button>
                                    </fieldset>
                                    <div className="login-section">
                                        <h4>Don't have an account? </h4>
                                        <h4>
                                            {" "}
                                            Signup here:{" "}
                                            <a style={{ textDecoration: "underline", color: " #C19D60;" }} href="/usersignup">
                                                signup
                                            </a>
                                        </h4>
                                    </div>
                                </form>
                            </div>
                            <div className="section-dec sec-dec_top" />
                        </div>
                        <div className="col-md-5">
                            <div className="column-text_inside fl-wrap dark-bg">

                                <img src='images/menu/8.jpg' alt='' id='login-side-img' />

                                <div className="illustration_bg">
                                    <div className="bg" data-bg="images/bg/dec/6.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-bg">
                    <div className="bg" data-bg="images/bg/dec/section-bg.png" />
                </div>
            </section>

            <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "10px" }}>
                <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
                <div className="designedby">
                    <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
                </div>
            </div>



        </>
    )
}
export default UserLogin;