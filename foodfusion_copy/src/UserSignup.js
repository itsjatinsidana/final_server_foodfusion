import { useState,useEffect } from "react"
import Swal from "sweetalert2";

export const UserSignup = () => {

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userconfirmPassword, setUserConfirmPassword] = useState('');
    const [userNumber, setUserNumber] = useState('');
    // const [userAddress, setUserAddress] = useState('');
    const phoneNumberRegex = /^\d{10}$/;

    function UserSignupForm(event) {
        event.preventDefault();

        var formdata = new FormData();
        formdata.append("useremail", userEmail);
        formdata.append("username", userName);
        formdata.append("userpassword", userPassword);
        formdata.append("usernumber", userNumber);
        // formdata.append("useraddress", userAddress);

        if (userName === "" || userEmail === "" || userPassword === "" || userNumber === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'oops...',
                text: 'Enter The Form Properly !'
            });
        }
        else if (!userEmail.includes('@')) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Email must include @ symbol!'
            });
        }
        else if (userPassword !== userconfirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwrd Not Matches',
                text: 'Password and confirm Password not same'
            });
        }

        else if (!phoneNumberRegex.test(userNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number must be exactly 10 digits and include only numbers!'
            });

        }
        else {
            var url = `${process.env.REACT_APP_API_URL}usersignup`;


            fetch(url, { method: "POST", body: formdata })
                .then(response => response.text())
                .then(ans => renderAsHtml(ans));
        }

        function renderAsHtml(ans) {



            if (ans === "success") {

                Swal.fire({
                    icon: 'success',
                    title: 'signup Successful',
                    text: 'You have successfully Logged up!',
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/userlogin";
                    }
                });
                sessionStorage.setItem("username", userName);
              


            } else if (ans === "fail") {

                Swal.fire({
                    icon: 'error',
                    title: 'signup Failed',
                    text: 'You ARE ALREADY REGISTER, LOGIN NOW',
                });

            } else if (ans === "exception") {
                alert(ans);
            }
        }


    }
   

    return (
        <>
            <div className="container-fluid">

                <div className="mt-1 p-4 text-white rounded">
                    <img src='images/bg/4.jpg' alt='' id='login-bg' />
                    <h2 className='text-light' id='text'>User UserSignup</h2>
                </div>
            </div>
            <section
                className="hidden-section big-padding con-sec"
                data-scrollax-parent="true"
                id="sec3"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="section-title text-align_left">
                                <h2>User Signup Form</h2>
                                <div className="dots-separator fl-wrap">
                                    <span />
                                </div>
                            </div>
                            <div className="text-block ">
                                <h4 >
                                    Attention! You must enter your Signup credentials.
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

                                            <div className="col-sm-6">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="phone2"
                                                    placeholder="User Email*"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}

                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="name2"
                                                    placeholder="UserName *"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}

                                                />
                                            </div>



                                            <div className="col-sm-6">
                                                <input
                                                    type="Password"
                                                    name="password"
                                                    id="phone2"
                                                    placeholder="Password*"
                                                    value={userPassword}
                                                    onChange={(e) => setUserPassword(e.target.value)}


                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <input
                                                    type="Password"
                                                    name="confirmpassword"
                                                    id="conformpassword"
                                                    placeholder="Confirm Password*"
                                                    value={userconfirmPassword}
                                                    onChange={(e) => setUserConfirmPassword(e.target.value)}

                                                />
                                            </div>

                                            <div className="col-sm-12">
                                                <input
                                                    type="text"
                                                    name="number"
                                                    id="name2"
                                                    placeholder="Mobile Number *"
                                                    value={userNumber}
                                                    onChange={(e) => setUserNumber(e.target.value)}

                                                />
                                            </div>
                                            {/* <div className="col-sm-12">
                                                <input
                                                    type="text"
                                                    name="Address"
                                                    id="phone2"
                                                    placeholder="User Address*"
                                                    value={userAddress}
                                                    onChange={(e) => setUserAddress(e.target.value)}

                                                />
                                            </div> */}

                                        </div>
                                        <button
                                            className="btn float-btn flat-btn color-bg"
                                            id="submit_cnt" onClick={UserSignupForm} >

                                            Signup <i className="fal fa-long-arrow-right" />
                                        </button>


                                    </fieldset>

                                    <div className="login-section">
                                        <h4>Already have an account? </h4>
                                        <h4>
                                            {" "}
                                            Log in here:{" "}
                                            <a style={{ textDecoration: "underline", color: " #C19D60;" }} href="/userlogin">
                                                Login
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