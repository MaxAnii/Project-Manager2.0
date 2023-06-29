import React from "react";
import "./home.css";
const Loader = (props) => {
  return (
    <div className={`lds-ring ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
