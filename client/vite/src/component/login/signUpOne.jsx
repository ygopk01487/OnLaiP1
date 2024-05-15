import React, { useEffect, useState } from "react";
import { BiSolidUserPlus } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import InputForm from "../inputForm/InputForm";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { sendMailss } from "../../action/sendMail";
import { checkEmailsss } from "../../action/users";
import TextValidateForm from "./textValidateForm";
import Toast from "../toast/Toast";
import { closeToast, showToast } from "../toast/ShowToast";
import Loading from "../loading/Loading";

const SignUpOne = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });

  const [textEmail, setTextEmail] = useState("");

  const [textName, setTextName] = useState("");

  const [showToasts, setShowToasts] = useState(false);
  const [mess, setMess] = useState("");
  const [checkToast, setCheckToast] = useState(false);

  const [loading, setLoading] = useState(true);

  //function
  const toBackSignIn = () => {
    setLoading(true);
    loadingPage();
    navigate("/dang-nhap");
  };

  const goToForgetPass = () => {
    setLoading(true);
    loadingPage();
    navigate("/quen-mat-khau");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const goToOTP = () => {
    setLoading(true);
    loadingPage();
    navigate("/xac-minh", { state: user });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let validate = false;

    let { nameV, emailV } = validateForms();
    console.log(nameV);

    if (nameV === false || emailV === false) {
      clearTextValieDateForm({ nameV, emailV });
      validate = false;
    }

    if (nameV === false && emailV === false) validate = true;

    if (validate === true) {
      const emailExist = await checkEmailsss({ email: user.email });

      if (emailExist.check) {
        setShowToasts(true);
        setMess(emailExist.message);
        setCheckToast(false);
        setUser({ ...user, name: "", email: "" });
      } else {
        await sendMailss({ email: user.email });
        if (localStorage.getItem("counts")) {
          localStorage.removeItem("counts");
        }
        localStorage.setItem("counts", 2);
        await goToOTP();
      }
    }
    loadingPage();
  };

  //vali form
  const validateForms = () => {
    let nameV = "";
    let emailV = "";
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //name
    if (user.name.trim() === "") {
      setTextName("Tên không được bỏ trống");
      nameV = true;
    } else if (user.name.trim().length < 5) {
      setTextName("Tên quá ngắn");
      nameV = true;
    } else {
      setTextName("");
      nameV = false;
    }

    //email
    if (user.email.trim() === "") {
      setTextEmail("Email không được để trống");
      emailV = true;
    } else if (!regexEmail.test(user.email.trim())) {
      setTextEmail("Không đúng định dạng email, gmail");
      emailV = true;
    } else {
      setTextEmail("");
      emailV = false;
    }

    return { nameV, emailV };
  };

  //clear text vali form
  const clearTextValieDateForm = ({ nameV, emailV }) => {
    if (nameV === false) {
      setTextName("");
    }
    if (emailV === false) {
      setTextEmail("");
    }
  };

  useEffect(() => {
    if (loading === false) {
      if (showToasts === true) {
        showToast();
        setTimeout(() => {
          closeToast();
        }, 2000);
        setShowToasts(false);
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
      <Toast checkToast={checkToast} mess={mess} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-white w-[700px] h-[auto] m-auto rounded-md mt-[50px] shadow-lg">
            <div className="grid grid-cols-2 h-[100%] w-[100%]">
              <div className="flex items-center justify-center h-[100%]">
                <span className="bg-slate-200 rounded-[100px] p-10">
                  <BiSolidUserPlus size="130px" className="text-white" />
                </span>
              </div>
              <div className="flex justify-center flex-col">
                <h1 className="text-[20px] font-bold uppercase text-center">
                  Đăng ký
                </h1>
                <h4 className="text-center text-[12px] font-semibold">
                  (Bước 1: Đăng ký họ tên và email)
                </h4>
                <div className="w-[100%] h-[70%] flex flex-col">
                  <form className="w-[100%] h-[60%] flex flex-col items-center">
                    <div className="w-[85%] p-3 relative">
                      <InputForm
                        type="text"
                        pla="Họ tên"
                        name="name"
                        val={user.name}
                        onChang={handleChange}
                      />
                      <span className="icon-input-login">
                        <AiOutlineUser size="15px" />
                      </span>
                    </div>
                    <TextValidateForm textCheck={textName} />
                    <div className="w-[85%] p-3 relative">
                      <InputForm
                        type="text"
                        pla="Email"
                        name="email"
                        val={user.email}
                        onChang={handleChange}
                      />
                      <span className="icon-input-login">
                        <AiOutlineMail size="15px" />
                      </span>
                    </div>
                    <TextValidateForm textCheck={textEmail} />
                    <button
                      className="bg-green-600 text-[16px] w-[80%] p-3 rounded-[30px] uppercase text-white mt-[15px]
              hover:bg-green-700 hover:text-black font-medium duration-300"
                      onClick={submit}
                      type="submit"
                    >
                      Đăng ký
                    </button>
                  </form>
                  {/* quen mat khau */}
                  <div className="p-2 mt-[60px]">
                    <h4 className="text-forget-pass" onClick={goToForgetPass}>
                      Quên mật khẩu?
                    </h4>
                    <div className="flex justify-center items-center group">
                      <span>
                        <GrFormPreviousLink className="text-red cursor-pointer text-scale-400 group-hover:text-scale-600 duration-500" />
                      </span>
                      <h4 className="text-forget-pass " onClick={toBackSignIn}>
                        Quay lại đăng nhập ?
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignUpOne;
