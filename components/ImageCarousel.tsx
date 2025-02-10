"use client";

import React, { useState } from "react";
import CustomImage from "./CustomImage";
import { FaAngleLeft, FaAngleRight, FaX } from "react-icons/fa6";
import { Image } from "@/types/Image.entity";

const ImageCarousel = ({
  images,
  index,
  handleCarousel,
}: {
  images: Image[];
  index: number;
  handleCarousel: () => void;
}) => {
  const [imageIndex, setImageIndex] = useState<number>(index);

  const handlePrev = () => {
    setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
  };

  const handleNext = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/45 z-10">
      <button
        className="absolute top-4 right-4 text-xl font-bold text-white"
        onClick={handleCarousel}
      >
        <FaX />
      </button>
      <div className="h-full w-full p-16">
        <div className="h-full flex items-center gap-4">
          <button
            className="text-white text-4xl font-bold"
            onClick={handlePrev}
          >
            <FaAngleLeft />
          </button>
          <div className="h-full w-full bg-red-50 rounded-lg">
            {images && (
              <CustomImage
                src={images[imageIndex].url}
                alt={images[imageIndex].title}
                width={240}
                height={240}
                index={imageIndex}
                className="brightness-110"
              />
            )}
          </div>
          <button
            className="text-white text-4xl font-bold"
            onClick={handleNext}
          >
            <FaAngleRight />
          </button>
        </div>
        <div
          className="absolute left-0 bottom-4 w-full flex justify-center"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            const imgIndex = Number(target.dataset.index);

            if (!isNaN(imgIndex)) {
              setImageIndex(imgIndex);
            }
          }}
        >
          <div className="relative h-[144px] w-[90vw] md:w-[80vw] lg:w-[50vw] flex items-center gap-2 overflow-hidden">
            {images.map((item: Image, idx: number) => (
              <div
                style={{
                  left:
                    idx === imageIndex
                      ? "50%"
                      : `calc(50% + ${(idx - imageIndex) * 144}px - 64px)`,
                }}
                key={idx}
                className={`w-[128px] h-[128px] absolute transition-all ease-in-out duration-500 ${
                  imageIndex === idx
                    ? "transform -translate-x-1/2 w-[144px] h-[144px] z-50"
                    : ""
                }`}
              >
                <CustomImage
                  src={item.url}
                  alt={item.title}
                  width={240}
                  height={240}
                  className={`${
                    imageIndex === idx
                      ? "brightness-110"
                      : "brightness-75 hover:brightness-110"
                  } h-full w-full object-cover hover:cursor-pointer rounded-lg`}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
