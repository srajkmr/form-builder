import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return [<Link to="/builder">Build Form</Link>, <Link to="/test">Test</Link>];
};

export default HomePage;
