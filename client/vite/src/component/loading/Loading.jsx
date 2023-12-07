import React from "react";

const Loading = () => {
  return (
    <div
      className="w-[50px] h-[50px] rounded-full animate-spin fixed top-[50%] left-[50%] z-9999
                    border-[6px] border-solid border-blue-500 border-t-transparent shadow-md"
    ></div>
  );
};

export default Loading;
