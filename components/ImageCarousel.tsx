"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomImage from "./CustomImage";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowDown,
  FaDownload,
  FaShare,
  FaSquare,
  FaX,
} from "react-icons/fa6";
import { Image } from "@/types/Image.entity";
import CustomButton from "./CustomButton";

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
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastClickTime = useRef<number>(0);

  const handlePrev = () => {
    handleDebounceClick(() => {
      setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
    });
  };

  const handleNext = () => {
    handleDebounceClick(() => {
      setImageIndex((imageIndex + 1) % images.length);
    });
  };

  const handleDebounceClick = (callback: () => void) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    if (timeSinceLastClick < 300 && clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    clickTimeout.current = setTimeout(() => {
      callback();
      lastClickTime;
    }, 300);
  };

  const handleImageDownload = async () => {
    try {
      const imageUrl = images[imageIndex].url;
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = images[imageIndex].title || "downloaded-image";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleImageLink = () => {
    try {
      const imageUrl = images[imageIndex].url;

      if (!imageUrl) {
        return;
      }

      window.open(imageUrl, "_blank");
    } catch (error) {
      alert("Image Url not found!");
    }
  };

  useEffect(() => {
    document.body.classList.add("hidden-scrollbar");

    return () => {
      document.body.classList.remove("hidden-scrollbar");
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 max-h-full w-full bg-black/70 backdrop-blur-lg z-10 overflow-hidden">
      <div className="h-full w-full px-32">
        <div className="relative h-full flex items-center gap-4">
          <CustomButton
            icon={<FaAngleLeft />}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 !text-lg !p-4"
            onClick={handlePrev}
          />

          <div className="h-full w-full overflow-hidden">
            <div className="relative h-full">
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
              <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-4 z-[100]">
                <CustomButton onClick={handleCarousel} icon={<FaX />} />
                <div className="flex gap-6 items-center">
                  <CustomButton icon={<FaShare />} onClick={handleImageLink} />
                  <CustomButton
                    icon={<FaArrowDown />}
                    onClick={handleImageDownload}
                  />
                </div>
              </div>
            </div>
          </div>
          <CustomButton
            icon={<FaAngleRight />}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 !text-lg !p-4"
            onClick={handleNext}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 w-full flex justify-center z-[50] py-6"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            const imgIndex = Number(target.dataset.index);

            if (!isNaN(imgIndex)) {
              setImageIndex(imgIndex);
            }
          }}
        >
          <div className="relative w-[84px] aspect-[3/2] flex items-center">
            {images.map((item: Image, idx: number) => (
              <div
                style={{
                  left:
                    idx === imageIndex
                      ? "50%"
                      : `calc(${(idx - imageIndex) * 84}px)`,
                }}
                key={idx}
                className={`absolute w-full h-full transition-all ease-in-out duration-500 ${
                  imageIndex === idx ? "transform -translate-x-1/2 z-[100]" : ""
                }`}
              >
                <CustomImage
                  src={item.url}
                  alt={item.title}
                  width={180}
                  height={120}
                  className={`${
                    imageIndex === idx
                      ? "brightness-110 scale-125"
                      : "brightness-75 hover:brightness-110"
                  } object-cover hover:cursor-pointer border-[0.01px]`}
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
