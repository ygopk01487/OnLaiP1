import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Cookies } from "react-cookie";

const LogOutGoogle = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOut = () => {
    console.log("LOG OUT SUCCESS!");
    cookies.remove("gg_access_token");
    navigate("/dang-nhap");
  };

  return (
    <button className="bg-gray-600 flex p-2" onClick={logOut}>
      <span>
        <FaGoogle size="18px" className="text-white" />
      </span>
      <h3 className="text-gray-300 text-[15px] font-normal pl-[12px] pr-[10px]">
        Đăng xuất
      </h3>
    </button>
  );
};

export default LogOutGoogle;
