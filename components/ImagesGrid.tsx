"use client";

import { UnsplashPhotoResponse } from "@/types/Image.entity";
import Image from "next/image";
import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";

const ImagesGrid = ({ images }: { images: UnsplashPhotoResponse[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carouselImageIndex, setCarouselImageIndex] = useState<number>(0);

  const handleCarousel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {images &&
        images.map((image, idx) => (
          <Image
            onClick={() => {
              setCarouselImageIndex(idx);
              setIsOpen(true);
            }}
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            height={240}
            width={240}
            className="h-full w-full object-cover brightness-75 hover:brightness-110 rounded-lg hover:cursor-zoom-in"
            draggable={false}
          />
        ))}
      <div>
        {isOpen && (
          <ImageCarousel
            images={images || []}
            index={carouselImageIndex}
            handleCarousel={handleCarousel}
          />
        )}
      </div>
    </>
  );
};

export default ImagesGrid;
