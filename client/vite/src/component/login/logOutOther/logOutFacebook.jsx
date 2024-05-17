import React from "react";
import { Cookies } from "react-cookie";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogOutFacebook = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOut = () => {
    try {
      console.log("LOG OUT SUCCESS!");
      cookies.remove("fb_access_token");
      window.sessionStorage.removeItem("lg");
      window.sessionStorage.removeItem("user");
      window.localStorage.removeItem("nameSort");
      window.localStorage.removeItem("numberPage");
      window.localStorage.removeItem("search");
      window.localStorage.removeItem("pageSize");
      window.localStorage.removeItem("counts");
      window.sessionStorage.removeItem("active");
      window.localStorage.removeItem("sort");
      navigate("/dang-nhap");
      window.location.reload()
    } catch (error) {
      console.log("logout FB fail");
    }
  };
  return (
    <button
      className="bg-blue-600 flex p-2 rounded-[3px] hover:opacity-[0.6]
    duration-[0.5s] "
      onClick={logOut}
    >
      <span>
        <FaFacebookF size="18px" className="text-blue-800" />
      </span>
      <h3 className="text-[15px] text-white font-[450] pl-[12px] pr-[10px]">
        Đăng xuất
      </h3>
    </button>
  );
};

export default LogOutFacebook;
