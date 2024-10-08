import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const CreatePanel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [domainName, setDomainName] = useState('');
    const [databaseName, setDatabaseName] = useState('');
    const [panelData, setPanelData] = useState([]);
    const [register, setRegister] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);


    const storePanelInfo = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("companyname", companyName);
        formData.append("domainname", domainName);
        formData.append("databasename", databaseName);

        var url = `${process.env.REACT_APP_API_URL}createpanel`;


        fetch(url, { method: "POST", body: formData })
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
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/viewpanel";
                    }
                });




        } else if (ans === "fail") {

            Swal.fire({
                icon: 'error',
                title: 'signup Failed',
                text: 'You ARE ALREADY REGISTER, LOGIN NOW',
            });

        } else if (ans === "exception") {
        alert(ans)
        }
    }

    const fetchPanelData = async () => {

        try {
            const response = await fetch(  `${process.env.REACT_APP_API_URL}fetchpannel`, { method: "GET" });
            const text = await response.text();
            const data = JSON.parse(text.trim());
            console.log(data.ans)
            setPanelData(data.ans)

        } catch (error) {
            console.error('Error fetching user data:', error);
        }


    }

    useEffect(() => {
        fetchPanelData()
    }, [])
    const domain = panelData.map(domain => domain.domain_name)
    const mail = panelData.map(email => email.email);
    console.log(mail)


    const isDomainTaken = domain.includes(domainName);
    const isemailTaken = mail.includes(email);
    console.log(isemailTaken)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    useEffect(() => {
        if (domainName === '' ||
            isDomainTaken ||
            email === '' ||
            !emailRegex.test(email) ||
            password === '' ||
            !passwordRegex.test(password) ||
            companyName === '' ||
            databaseName === '') {
            setRegister(false);
        } else {
            // if (!isDomainTaken && !domainName.endsWith('.com')) {
            //     setDomainName(domainName + '.com');
            // }
            setRegister(true);
        }
    }, [domainName,
        isDomainTaken,
        email,
        password,
        companyName,
        databaseName]);


    return (
        <>
            <section
                className="hidden-section big-padding con-sec"
                data-scrollax-parent="true"
                id="pannelsignup"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="section-title text-align_left">
                                <h2>Food Fusion Panel</h2>
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
                                                    placeholder="User Email*"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setEmailTouched(true);
                                                    }}
                                                    style={{ borderColor: emailTouched && (isemailTaken || !emailRegex.test(email)) ? 'red' : '' }}
                                                />
                                                {emailTouched && (isemailTaken || !emailRegex.test(email)) && (
                                                    <small style={{ color: 'red', position: "relative", top: "-15px" }}>
                                                        {isemailTaken ? 'Email already registered' : 'Invalid email format'}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="col-sm-6">
                                                <input
                                                    type="Password"
                                                    name="password"
                                                    placeholder="Password*"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setPasswordTouched(true);
                                                    }}
                                                    style={{ borderColor: passwordTouched && !passwordRegex.test(password) ? 'red' : '' }}
                                                />
                                                {passwordTouched && !passwordRegex.test(password) && (
                                                    <small style={{ color: 'red', position: "relative", top: "-15px" }}>
                                                        Password must contain at least 6 characters, including uppercase, lowercase, number, and special character.
                                                    </small>
                                                )}
                                            </div>

                                            <div className="col-sm-6">
                                                <input
                                                    type="text"
                                                    name="companyname"
                                                    id="companyname"
                                                    placeholder="Company Name"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}

                                                />
                                            </div>


                                            <div className="col-sm-6 ">
                                                <input
                                                    type="text"
                                                    name="domainname"
                                                    id="domainname"
                                                    placeholder="Domain Name"
                                                    value={domainName}
                                                    onChange={(e) => setDomainName(e.target.value)}
                                                    style={{ borderColor: isDomainTaken ? 'red' : '' }}
                                                />
                                                <span id="addcom">.example.com</span>
                                                {isDomainTaken && (
                                                    <small style={{
                                                        color: 'red',
                                                        position: "relative",
                                                        top: "-15px"

                                                    }}>Domain already taken</small>
                                                )}

                                            </div>

                                            <div className="col-sm-12">
                                                <input
                                                    type="text"
                                                    name="databasename"
                                                    id="databasename"
                                                    placeholder="Database Name"
                                                    value={databaseName}
                                                    onChange={(e) => setDatabaseName(e.target.value)}

                                                />
                                            </div>





                                        </div>


                                        <button
                                            className="btn float-btn flat-btn color-bg"
                                            id="submit_cnt" onClick={storePanelInfo}
                                            disabled={!register}>

                                            Register <i className="fal fa-long-arrow-right" />
                                        </button>



                                    </fieldset>

                                    {/* <div className="login-section">
                                        <h4>Already have an account? </h4>
                                        <h4>
                                            {" "}
                                            Log in here:{" "}
                                            <a style={{ textDecoration: "underline", color: " #C19D60;" }} href="/userlogin">
                                                Login
                                            </a>
                                        </h4>
                                    </div> */}

                                </form>

                            </div>

                            <div className="section-dec sec-dec_top" />
                        </div>
                        {/* <div className="col-md-5">
                            <div className="column-text_inside fl-wrap dark-bg">

                                <img src='images/menu/8.jpg' alt='' id='login-side-img' />

                                <div className="illustration_bg">
                                    <div className="bg" data-bg="images/bg/dec/6.png" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="section-bg">
                    <div className="bg" data-bg="images/bg/dec/section-bg.png" />
                </div>
            </section>
        </>
    )
}

export default CreatePanel