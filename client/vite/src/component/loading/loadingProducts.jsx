import React from "react";

const LoadingProducts = (top) => {
  return (
    <div
      className={`w-[30px] h-[30px] border-blue-500 animate-spin absolute top-[${top}] left-[50%]
    z-[9999] border-[3px] border-solid rounded-full mb-[20px] border-t-transparent`}
    ></div>
  );
};

export default LoadingProducts;
