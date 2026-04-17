import React from "react";
import loading from "../../../../public/loading2.mp4";

const Loader = ({ onFinish }) => {
  return (
    <div className="fixed inset-0 z-[999] bg-white">
      <video
        src={loading}
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default Loader;