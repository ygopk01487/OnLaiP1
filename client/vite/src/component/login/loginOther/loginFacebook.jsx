import React from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";

const appId = "1346461495968866";

const LoginFacebook = () => {
  const navigate = useNavigate();

  const responseFacebook = (res) => {
    console.log(res);
    navigate("/trang-chu", { state: res });
  };

  return (
    <div>
      <FacebookLogin
        appId={appId}
        autoLoad={true}
        callback={responseFacebook}
        textButton="Đăng nhập bằng facebook"
        cssClass="text-[14px] text-gray-300 
        w-[280px] h-[50px] bg-blue-800 mt-[10px] shadow-2xl
        rounded-[30px] flex justify-center items-center"
        icon={<FaFacebookF className="mr-[10px]" size="18px" />}
      />
    </div>
  );
};

export default LoginFacebook;
