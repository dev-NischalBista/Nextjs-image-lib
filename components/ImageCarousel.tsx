"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomImage from "./CustomImage";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowDown,
  FaShare,
  FaX,
} from "react-icons/fa6";
import { UnsplashPhotoResponse } from "@/types/Image.entity";
import { AnimatePresence, motion } from "motion/react";
import { wrap } from "motion";
import Image from "next/image";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel = ({
  images,
  handleCarousel,
}: {
  images: UnsplashPhotoResponse[];
  index: number;
  handleCarousel: () => void;
}) => {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastClickTime = useRef<number>(0);

  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handlePrev = () => {
    handleDebounceClick(() => {
      paginate(-1);
    });
  };

  const handleNext = () => {
    handleDebounceClick(() => {
      paginate(1);
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
      lastClickTime.current = Date.now();
    }, 300);
  };

  const handleImageDownload = async () => {
    try {
      const imageUrl = images[imageIndex].urls.regular;
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = images[imageIndex].alt_description || "downloaded-image";
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
      const imageUrl = images[imageIndex].urls.regular;

      if (!imageUrl) {
        return;
      }

      window.open(imageUrl, "_blank");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
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
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 !text-lg !p-4 hover:bg-black/50 hover:rounded-full hover:p-6"
            onClick={handlePrev}
          >
            <FaAngleLeft />
          </button>

          <div className="h-full w-full overflow-hidden">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none z-10" />
              {images && (
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                  >
                    <Image
                      src={images[imageIndex].urls.full}
                      alt={images[imageIndex].alt_description}
                      width={240}
                      height={240}
                      className="brightness-110 w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-4 z-[100]">
                <button
                  onClick={handleCarousel}
                  className="hover:bg-black/50 hover:rounded-full p-2"
                >
                  <FaX />
                </button>
                <div className="flex gap-6 items-center">
                  <button
                    onClick={handleImageLink}
                    className="hover:bg-black/50 hover:rounded-full p-2"
                  >
                    <FaShare />
                  </button>
                  <button
                    onClick={handleImageDownload}
                    className="hover:bg-black/50 hover:rounded-full p-2"
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 !text-lg !p-4 hover:bg-black/50 hover:rounded-full hover:p-6"
            onClick={handleNext}
          >
            <FaAngleRight />
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full flex justify-center z-[50] py-6"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            const imgIndex = Number(target.dataset.index);

            if (!isNaN(imgIndex)) {
              setPage([imgIndex, 1000]);
            }
          }}
        >
          <div className="relative w-[84px] aspect-[3/2] flex items-center">
            {images.map((item: UnsplashPhotoResponse, idx: number) => (
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
                  src={item.urls.regular}
                  alt={item.alt_description}
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
