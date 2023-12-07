import React from "react";
import { BsCheck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { closeToast } from "./ShowToast";
import { BiSolidErrorCircle } from "react-icons/bi";

const Toast = ({ checkToast, mess }) => {
  return (
    <div
      className={`bg-white  flex p-2 absolute right-[30px] top-[30px]
    shadow-2xl rounded-[10px] border-l-[6px] ${
      checkToast === true ? "border-blue-600" : "border-red-600"
    } justify-center items-center
overflow-hidden duration-500 translate-x-[calc(100%+30px)]`}
      id="toast"
    >
      {checkToast === true ? (
        <span className="p-1 bg-blue-600 text-white rounded-[20px]">
          <BsCheck size="25px" />
        </span>
      ) : (
        <span className="p-1 bg-red-600 text-white rounded-[20px]">
          <BiSolidErrorCircle size="25px" />
        </span>
      )}
      <div className="p-2">
        <h3 className="font-[650]">
          {checkToast === true ? "Thành công" : "Thất lại"}
        </h3>
        <span className="text-[14px] text-slate-500">{mess}</span>
      </div>
      <span className="cursor-pointer" onClick={closeToast}>
        <GrFormClose />
      </span>
      <div
        className={`absolute bottom-0 right-0 bg-white w-[100%] h-[3px] duration-500
      before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-[100%]
      before:w-[100%] ${
        checkToast === true ? "before:bg-blue-500" : "before:bg-red-500"
      }`}
        id="progress"
      ></div>
    </div>
  );
};

export default Toast;
