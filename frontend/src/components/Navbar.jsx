import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="flex justify-between pr-25 pl-41 items-center mx-4 ">
      <div>
        <span className="font-[Lobster]">LeafSense</span>
      </div>
      <div className="flex space-x-5">
        <Link
          to={"/"}
          className={`text-[15px] font-medium px-8 mx-4 font-[sekuya] transition ${
            isActive("/") ? "text-yellow-400" : "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          to={"/train"}
          className={`text-[15px] font-medium px-8 mx-4 font-[sekuya] transition ${
            isActive("/train") ? "text-yellow-400" : "text-white"
          }`}
        >
          Train
        </Link>
        <Link
          to={"/test"}
          className={`text-[15px] font-medium px-8 mx-4 font-[sekuya] transition ${
            isActive("/test") ? "text-yellow-400" : "text-white"
          }`}
        >
          Test
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

//286B3E
