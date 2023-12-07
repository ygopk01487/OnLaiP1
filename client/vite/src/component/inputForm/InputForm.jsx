import React from "react";

const InputForm = ({ type, pla, val, name, onChang }) => {
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

export default InputForm;
