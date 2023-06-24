"use client";

import { SkewLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <SkewLoader size={50} color="#666" />
    </div>
  );
};

export default Loader;
