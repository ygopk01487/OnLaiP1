import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Cookies } from "react-cookie";

const LogOutGoogle = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logOut = () => {
    try {
      console.log("LOG OUT SUCCESS!");
      cookies.remove("gg_access_token");
      window.sessionStorage.removeItem("lg");
      window.sessionStorage.removeItem("user");
      window.localStorage.removeItem("nameSort");
      window.localStorage.removeItem("numberPage");
      window.localStorage.removeItem("search");
      window.localStorage.removeItem("pageSize");
      window.sessionStorage.removeItem("counts");
      window.sessionStorage.removeItem("active");
      navigate("/dang-nhap");
      window.location.reload();
    } catch (error) {
      console.log("logOut GG fails");
    }
  };

  return (
    <button
      className="bg-gray-600 flex p-2 
    rounded-[3px] hover:opacity-[0.6]
    duration-[0.5s] "
      onClick={logOut}
    >
      <span>
        <FaGoogle size="18px" className="text-white" />
      </span>
      <h3 className="text-[15px] text-white font-[450] pl-[12px] pr-[10px]">
        Đăng xuất
      </h3>
    </button>
  );
};

export default LogOutGoogle;
