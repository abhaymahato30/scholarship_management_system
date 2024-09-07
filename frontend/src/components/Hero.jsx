import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ title}) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <Link to={"/appointment"} >
          <button className="Apply_btn ">Apply for Scholarship</button>

            </Link>
         
        </div>
       
 
      </div>
    </>
  );
};

export default Hero;
