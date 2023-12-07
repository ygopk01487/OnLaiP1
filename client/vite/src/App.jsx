import SingIn from "./component/login/singIn";
import "./App.css";
import SignUpOne from "./component/login/signUpOne";
import SingUpTwo from "./component/login/singUpTwo";
import Otp from "./component/otp/Otp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgetPass from "./component/login/forgetPass";
import { useState } from "react";
import Home from "./component/Home/Home";
import Loading from "./component/loading/Loading";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dang-nhap" />} />
        <Route path="/dang-nhap" element={<SingIn />} />
        <Route path="/dang-ky-tai-khoan" element={<SignUpOne />} />
        <Route path="/xac-minh" element={<Otp />} />
        <Route path="/dang-ky-mat-khau" element={<SingUpTwo />} />
        <Route path="/doi-mat-khau" element={<SingUpTwo />} />
        <Route path="/quen-mat-khau" element={<ForgetPass />} />
        <Route path="/trang-chu" element={<Home />} />
        {/* <Route path="/load" element={<Loading />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
