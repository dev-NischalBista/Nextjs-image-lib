"use client";

import CustomImage from "@/components/CustomImage";
import ImageCarousel from "@/components/ImageCarousel";
import { images } from "@/data/sampleImages";
import { Image } from "@/types/Image.entity";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carouselImageIndex, setCarouselImageIndex] = useState<number>(0);

  const handleCarousel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCarouselWithIndex = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const imgIndex = Number(target.dataset.index);

    if (!isNaN(imgIndex)) {
      setCarouselImageIndex(imgIndex);
      handleCarousel();
    }
  };

  return (
    <>
      <div className="min-h-[100vh] p-4 bg-[#1D1D1D]">
        <div
          className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]"
          onClick={handleCarouselWithIndex}
        >
          <div className="relative row-span-2 rounded-lg bg-gray-500 transition-all duration-300 ease-in-out overflow-hidden group">
            <CustomImage
              src="/images/forest.jpg"
              alt="forest"
              width={180}
              height={180}
              className="h-full w-full object-cover rounded-lg brightness-75 group-hover:scale-125"
              index={1}
            />
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-white">
              <p className="text-[48px] font-bold uppercase group-hover:tracking-[8px] leading-none transition-all duration-700 ease-in-out">
                Gallery
              </p>
            </div>
          </div>

          {images.map((image: Image, idx: number) => (
            <CustomImage
              key={idx}
              index={idx}
              src={image.url}
              alt={image.title}
              width={180}
              height={180}
              className="row-span-1 brightness-75 hover:brightness-110 rounded-lg"
            />
          ))}
        </div>
        <div>
          {isOpen && (
            <ImageCarousel
              images={images}
              index={carouselImageIndex}
              handleCarousel={handleCarousel}
            />
          )}
        </div>
      </div>
    </>
  );
}
