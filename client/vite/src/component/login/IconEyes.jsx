import React from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const IconEyes = ({ showPass, showPassword, styles }) => {
  return (
    <>
      <span className="flex ">
        {!showPass ? (
          <AiFillEyeInvisible className={styles} onClick={showPassword} />
        ) : (
          <AiFillEye className={styles} onClick={showPassword} />
        )}
      </span>
    </>
  );
};

export default IconEyes;
