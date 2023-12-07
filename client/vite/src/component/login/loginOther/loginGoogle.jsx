import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const clientId =
  "416329735082-fitll6hgsqdubjfs7pqkqae1p9kdks41.apps.googleusercontent.com";

const LoginGoogle = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log(res.profileObj);
    navigate("/trang-chu", { state: res.profileObj });
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Đăng nhập bằng google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        className="rounded-[30px!important] w-[280px] h-[50px] justify-center"
      />
    </>
  );
};

export default LoginGoogle;
