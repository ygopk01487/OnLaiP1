import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRouters = () => {
  const [checkLogin, setCheckLogin] = useState(
    "" || window.sessionStorage.getItem("lg")
  );

  return checkLogin ? <Outlet /> : <Navigate to="/dang-nhap" />;
};

export default ProtectRouters;
