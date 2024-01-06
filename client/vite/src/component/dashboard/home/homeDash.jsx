import React, { useState } from "react";
import MenuDash from "../menu/MenuDash";
import NvabarDash from "../nvabar/NvabarDash";

const HomeDash = () => {
  const [openSun, setOpenSun] = useState(false);
  console.log(openSun);
  return (
    <div className={`w-[100%] ${openSun ? "bg-black" : ""}`}>
      {/* menu */}
      <MenuDash />
      {/* nvabar */}
      <NvabarDash setOpenSun={setOpenSun} openSun={openSun} />
    </div>
  );
};

export default HomeDash;
