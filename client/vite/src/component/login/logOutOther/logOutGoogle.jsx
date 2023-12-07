import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

const clientId =
  "416329735082-fitll6hgsqdubjfs7pqkqae1p9kdks41.apps.googleusercontent.com";

const LogOutGoogle = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("LOG OUT SUCCESS!");
    navigate("/dang-nhap");
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText="Đăng xuất"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </>
  );
};

export default LogOutGoogle;
