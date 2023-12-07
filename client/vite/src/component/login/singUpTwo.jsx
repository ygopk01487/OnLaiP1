import React, { useEffect, useState } from "react";
import InputForm from "../inputForm/InputForm";
import { BsKeyFill } from "react-icons/bs";
import IconEyes from "./IconEyes";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { SignUps, forgetPass } from "../../action/users";
import TextValidateForm from "./textValidateForm";
import Toast from "../toast/Toast";
import { closeToast, showToast } from "../toast/ShowToast";
import Loading from "../loading/Loading";

const IconsEyes = ({ showPass2, showPassword, styles }) => {
  return (
    <>
      <span className="flex ">
        {showPass2 ? (
          <AiFillEye className={styles} onClick={showPassword} />
        ) : (
          <AiFillEyeInvisible className={styles} onClick={showPassword} />
        )}
      </span>
    </>
  );
};

const InputFormTwo = ({ pla, type, name, val, onChang }) => {
  return (
    <>
      <input
        placeholder={pla}
        className="input-login"
        type={type}
        name={name}
        value={val}
        onChange={onChang}
      />
    </>
  );
};

const SingUpTwo = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [textPass, setTextPass] = useState("");
  const [textRePass, setTexRetPass] = useState("");

  const location = useLocation();
  const users = location.state;

  const urlForgetPass = location.pathname;

  const navigate = useNavigate();

  const [showToasts, setShowToasts] = useState(false);
  const [mess, setMess] = useState("");
  const [checkToast, setCheckToast] = useState(false);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    name: users.name,
    email: users.email,
    password: "",
    rePassword: "",
  });

  const [updatePass, setUpdatePass] = useState({
    email: users,
    password: "",
    rePassword: "",
  });

  //function
  const showPassword = () => {
    setShowPass((e) => !e);
  };

  const showPassword2 = () => {
    setShowPass2((e) => !e);
  };

  const submit = async (e) => {
    e.preventDefault();
    let validate = false;
    setLoading(true);

    const { passV, rePassV } = textValidate();
    if (passV === false) clearTextValidate({ passV });
    if (rePassV === false) clearTextValidate({ rePassV });
    if (passV === false && rePassV === false) validate = true;

    if (validate === true) {
      if (urlForgetPass === "/doi-mat-khau") {
        await forgetPass({ updatePass });
        setShowToasts(true);
        setCheckToast(true);
        setMess("Sau vài giây sẽ quay lại đăng nhập !");
      } else {
        await SignUps({ data });
        setShowToasts(true);
        setCheckToast(true);
        setMess("Sau vài giây sẽ quay lại đăng nhập !");
      }
    }
    loadingPage();
  };

  const handelChange = (e) => {
    setUpdatePass({
      ...updatePass,
      [e.target.name]: e.target.value,
    });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //clear text validate
  const clearTextValidate = ({ passV, rePassV }) => {
    if (passV === false) {
      setTextPass("");
    }
    if (rePassV === false) {
      setTexRetPass("");
    }
  };

  //input validate
  const textValidate = () => {
    let passV = false;
    let rePassV = false;

    //pass
    if (data.password.trim() === "") {
      setTextPass("Không được bỏ để trống");
      passV = true;
    } else if (data.password.trim().length < 3) {
      setTextPass("Mật khẩu quá ngắn");
      passV = true;
    }

    //rePass
    if (data.rePassword.trim() === "") {
      setTexRetPass("Không được bỏ để trống");
      rePassV = true;
    } else if (data.rePassword.trim() !== data.password.trim()) {
      setTexRetPass("Không trùng khớp với mật khẩu trên");
      rePassV = true;
    }

    return { passV, rePassV };
  };

  useEffect(() => {
    if (loading === false) {
      if (showToasts === true) {
        showToast();
        setTimeout(() => {
          closeToast();
        }, 2000);
        setShowToasts(false);
        setTimeout(() => {
          navigate("/dang-nhap");
        }, 2000);
      }
    }
  }, [submit]);

  //loading
  const loadingPage = () => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    loadingPage();
  }, []);

  return (
    <>
      <Toast mess={mess} checkToast={checkToast} />
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white w-[450px] h-[auto] p-[20px] m-auto rounded-md mt-[50px] shadow-lg">
          <div className="flex flex-col justify-center h-[100%]">
            <h1 className="text-center text-[20px] font-bold uppercase pt-[20px]">
              {urlForgetPass === "/doi-mat-khau" ? "Đổi mật khẩu" : "Đăng ký"}
            </h1>
            <h3 className="text-center text-[12px] font-semibold">
              {urlForgetPass !== "/doi-mat-khau"
                ? "(Bước 3: Nhập mật khẩu)"
                : "( Bước 3: Nhập lại mật khẩu mới)"}
            </h3>
            <div className="flex justify-center w-[100%] h-[100%]">
              <form className="w-[100%] h-[60%] flex flex-col items-center">
                <div className="pt-[20px] relative w-[65%]">
                  <InputForm
                    type={`${!showPass ? "password" : "text"}`}
                    pla="Nhập mật khẩu"
                    name="password"
                    val={data.password}
                    onChang={handelChange}
                  />
                  <span>
                    <BsKeyFill size="15px" className="icon-input-signInTwo" />
                  </span>
                  <IconEyes
                    showPass={showPass}
                    showPassword={showPassword}
                    styles="icon-eyes-show"
                  />
                </div>
                <TextValidateForm textCheck={textPass} />
                <div className="pt-[20px] relative w-[65%]">
                  <InputFormTwo
                    type={`${!showPass2 ? "password" : "text"}`}
                    pla="Nhập lại mật khẩu"
                    name="rePassword"
                    val={data.rePassword}
                    onChang={handelChange}
                  />
                  <span className="icon-input-signInTwo">
                    <BsKeyFill size="15px" />
                  </span>
                  <IconsEyes
                    showPass2={showPass2}
                    showPassword={showPassword2}
                    styles="icon-eyes-show"
                  />
                </div>
                <TextValidateForm textCheck={textRePass} />
                <button
                  className="w-[65%] bg-green-600 p-3 rounded-[30px] mt-[20px] text-[16px] uppercase font-medium
            duration-300 hover:bg-green-700 hover:text-white"
                  type="submit"
                  onClick={submit}
                >
                  {urlForgetPass === "/doi-mat-khau" ? "Đổi" : "Đăng ký"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingUpTwo;
