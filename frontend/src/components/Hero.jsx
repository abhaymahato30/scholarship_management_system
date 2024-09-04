import React from "react";

const Hero = ({ title}) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <button>Apply for Scholarship</button>
        </div>
 
      </div>
    </>
  );
};

export default Hero;
