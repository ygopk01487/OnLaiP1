import React from "react";

const TextValidateForm = ({ textCheck, styles }) => {
  return (
    <div className="">
      <span className={`text-[14px] text-red-500 font-light italic ${styles} `}>
        {textCheck}
      </span>
    </div>
  );
};

export default TextValidateForm;
