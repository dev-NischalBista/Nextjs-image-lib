import React from "react";

const ImageGridSuspense = () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
      <div className="relative row-span-2 rounded-lg bg-gray-300 animate-pulse"></div>

      {[...Array(10)].map((_, idx) => (
        <div
          key={idx}
          className="row-span-1 rounded-lg bg-gray-300 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ImageGridSuspense;
