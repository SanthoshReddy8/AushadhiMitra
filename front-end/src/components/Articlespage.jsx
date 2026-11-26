import React from "react";
import "./Articlespage.css";
import { Link } from "react-router-dom";

function Article(){
   return(
    <section>
    <section class="aheader">
    <div class="atext-box">
            <h1>Explore the latest insights, tips in our articles section.</h1>
        </div>
        </section>
    <div class="article">
        <div class="article">
            <div class="images">
                <Link to="/ImpMedicineDon">
                    <img src="../imgs/medicinedonation.jpg" alt="Image 1"/>
                    <div class="description">Impact of Medicines Donation</div>
                </Link>
                <Link to="/Articles/donating-medical-equipment">
                    <img src="../imgs/medicalequipment.jpg" alt="Image 2"/>
                    <div class="description">Donating Medical Equipment</div>
                </Link>
            </div>
        </div>
    
        <div class="article">
            <div class="images">
                <Link to="/Articles/maximizing-blood-donation">
                    <img src="../imgs/blood donation.jpg" alt="Image 3"/>
                    <div class="description" style={{textAlign:'center'}}>Maximizing the Impact of Blood Donation</div>
                </Link>
                <Link to="/Articles/role-of-community-support">
                    <img src="../imgs/community.jpg" alt="Image 4"/>
                    <div class="description">The Role of Community Support </div>
                </Link>
            </div>
        </div>
    </div>
    </section>
   )
}
export default Article;