import { useState } from 'react';
import Swal from 'sweetalert2';

function AdminLoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function go(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('un', username);
    formData.append('ps', password);

    if (username === "" || password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter The Form Properly !'
      });
    } else {

      var url = `${process.env.REACT_APP_API_URL}checklogin`;


      fetch(url, { method: "POST", body: formData })
        .then(response => response.text())
        .then(ans => renderAsHtml(ans));
    }

    function renderAsHtml(ans) {



      if (ans === "success") {
        // sessionStorage.setItem("un", username);
        localStorage.setItem("un", username);
        Swal.fire({
          icon: 'success',
          title: 'login Successful',
          text: 'You have successfully Logged up!',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/admindashboard";
          }
        });



      } else if (ans === "fail") {

        Swal.fire({
          icon: 'error',
          title: 'login Failed',
          text: 'Invalid UserName/Password!',
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
          <h2 className='text-light' id='text'>Admin Login</h2>
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
                <h2>Login Form</h2>
                <div className="dots-separator fl-wrap">
                  <span />
                </div>
              </div>
              <div className="text-block ">
                <h4 >
                  Attention! You must enter your login credentials.
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
                          type="text"
                          name="username"
                          id="name2"
                          placeholder="UserName *"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}

                        />
                      </div>

                      <div className="col-sm-12">
                        <input
                          type="Password"
                          name="password"
                          id="phone2"
                          placeholder="Password*"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}

                        />
                      </div>

                    </div>
                    <button
                      className="btn float-btn flat-btn color-bg"
                      id="submit_cnt" onClick={go}>

                      Login <i className="fal fa-long-arrow-right" />
                    </button>
                  </fieldset>
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



      {/* <div>
        <form>
          <label>
            Username:
            <input type="text" name='username' value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name='password' value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit" onClick={go}>Login</button>
        </form>

      </div> */}

    </>
  );
}

export default AdminLoginForm;
