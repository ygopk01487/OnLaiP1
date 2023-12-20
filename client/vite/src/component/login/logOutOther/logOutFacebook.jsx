import React from "react";
import { Cookies } from "react-cookie";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogOutFacebook = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOut = () => {
    console.log("logout success");
    cookies.remove("fb_access_token");
    navigate("/dang-nhap");
  };
  return (
    <button className="bg-blue-600 flex p-2" onClick={logOut}>
      <span>
        <FaFacebookF size="18px" className="text-blue" />
      </span>
      <h3 className="text-gray-300 text-[15px] font-normal pl-[12px] pr-[10px]">
        Đăng xuất
      </h3>
    </button>
  );
};

export default LogOutFacebook;
