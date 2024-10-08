import React, { useState,useEffect } from 'react'
import AdminNavbar from "./AdminNavbar";
import { useAccordionButton } from 'react-bootstrap';

const AdminPlan = () => {
    const [planData, setPlanData] = useState([]);

    const showPlan = async () => {
        try {
     
    
          const response = await fetch(`${process.env.REACT_APP_API_URL}showplans`, { method: "POST" });
          const text = await response.text();
          const data = JSON.parse(text.trim());
          setPlanData(data.ans);
          
    
        } catch (error) {
          console.error('Error fetching Data:', error);
        }
    
      }
    
      useEffect(() => {
        showPlan();
    
      }, [])
    return (
        <>
       <AdminNavbar/>
          <section className="parallax-section hero-section hidden-section" data-scrollax-parent="true">
            <img className="bg par-elem" src="images/bg/17.jpg" alt="img" data-scrollax="properties: { translateY: '30%' }" />
            <div className="overlay" />
            <div className="container">
              <div className="section-title" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h4>View  Plans</h4>
                <h2>join Us</h2>
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
          </section>
    
    
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
    
         
    
          <div className="plancard-container">
          {planData.map((customplan, index) => {
              const plan = JSON.parse(customplan.plan_details)
         console.log(JSON.parse(customplan.plan_details))
            
              return  <div className="plancard" key={index}>
                  
                  <h2 className="plancard-title">MY PLAN</h2>
                  <p className="planprice">
                    ${plan.plan_cost}<span>/month</span>
                  </p>
                  <ul className="planfeatures">
                    <li>manage menu,users and orders</li>
                    <li>24/7 Customer Support</li>
                    <li>{plan.plan_menuitems} Food Items </li>
    
                    <li>Limited to {plan.plan_order} Orders/Month</li>
    
                  </ul>
    
                  <button className="plansubscribe-btn"
                    //  disabled={plan.plan_status.trim().toLowerCase() === 'inactive'}
                    //  disabled={isButtonDisabled}
                    // disabled={isInactive || isDowngrade}
                    // onClick={() => customHandleSubscription(customplan)}
                    > Current Plan
                     {/* { console.log(plan.plan_number,currentPlanId)} */}
                  {/* {customplan.id == currentPlanId ? "Current Plan" : "Subscribe Now"} */}
                  </button>
                
                  {/* {isInactive && <p className="warning-message">This plan is inactive.</p>} */} 
                  {/* {isDowngrade && <p className="warning-message">You cannot downgrade to a lower plan.</p>} */}
                
                 
               
    
                </div>
            
            })}
    
      
    
          </div>
    
   
    
          <div className="footer-bottom fl-wrap footerbottom" style={{ marginTop: "100px" }}>
            <div className="copyright">© FoodFusion 2024 . All rights reserved. </div>
            <div className="designedby">
              <a href='https://jatinsidana.netlify.app/'> <h5 className='copyright'>Designed by Jatin Sidana</h5></a>
            </div>
          </div>
    
    
    
        </>
      )
}

export default AdminPlan
