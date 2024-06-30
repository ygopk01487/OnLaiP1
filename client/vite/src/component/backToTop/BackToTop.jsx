import React, { useEffect, useState } from "react";
import { TbPlayerTrackNext } from "react-icons/tb";
import { showBack } from "../jsAnimation/animation";

const BackToTop = () => {
  useEffect(() => {
    showBack();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToTOp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <span
        onClick={scrollToTop}
        className={`p-[14px] text-black duration-[0.5s] rounded-[3px]
        border-[2px] border-gray-200 shadow-md fixed hover:text-white hover:bg-green-600 bottom-[10%]
        right-[0%] cursor-pointer hover:border-green-600 z-[99999] opacity-0 invisible`}
        id="back"
      >
        <TbPlayerTrackNext size="20px" className="rotate-[-90deg]" />
      </span>
    </div>
  );
};

export default BackToTop;
