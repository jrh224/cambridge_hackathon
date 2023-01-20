import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <h1 className="h1"> This is a Footer </h1>
      <div className="links">
        <Link to="" className="link">
          Home Page
        </Link>
        <Link to="test" className="link">
          Test Page
        </Link>
        <Link to="theodo" className="link">
          Theodo Page
        </Link>
      </div>
    </div>
  );
}
