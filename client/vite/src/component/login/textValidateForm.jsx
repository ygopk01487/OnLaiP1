import React from "react";

const TextValidateForm = ({ textCheck }) => {
  return (
    <div className="">
      <span className="text-[12px] text-red-500 font-light italic">
        {textCheck}
      </span>
    </div>
  );
};

export default TextValidateForm;
