import React, { useEffect, useState } from 'react'


const ViewPanel = () => {
  const [panelData, setPanelData] = useState([]);

  const fetchPanelData = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}fetchpannel`, { method: "GET" });
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
  return (
    <>


      <div className="content">
        {/* section */}
        {/* <section className="parallax-section hero-section hidden-section" data-scrollax-parent="true">
          <img className="bg par-elem" src="images/bg/17.jpg" alt="img" data-scrollax="properties: { translateY: '30%' }" />
          <div className="overlay" />
          <div className="container">
            <div className="section-title" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <h4>View your Orders</h4>
              <h2>Your Orders</h2>
              <div className="dots-separator fl-wrap">
                <span />
              </div>
            </div>
          </div>
          <div className="hero-section-scroll">
            <div className="mousey">
              <div className="scroller" />
            </div>
          </div>
          <div className="brush-dec" />
        </section> */}

        <div className="container mt-3">
          <br />
          <h2>View Panel Data</h2>
          <br />
          <br />
          <div className="table-responsive">
            <table className="table table-dark table-hover" >
              <thead className="table-success" style={{ height: "70px" }}>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Company Name</th>
                  <th>Domain Name</th>
                  <th>DataBase Name</th>

                </tr>
              </thead>
              <tbody>
                {panelData.map((panel, index) => (


                  <tr key={index}>
                    <td>{panel.email}</td>
                    <td>{panel.password}</td>
                    <td>{panel.company_name}</td>
                    <td>{panel.domain_name}</td>
                    <td>{panel.database_name}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="brush-dec2 brush-dec_bottom" />
      </div>
      <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "380px" }}>
        <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
        <div className="designedby">
          <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
        </div>
      </div>
    </>
  )
}

export default ViewPanel