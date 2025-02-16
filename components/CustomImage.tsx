"use client";

import Image from "next/image";
import { cn } from "@/lib/utlis";
import { useEffect, useRef, useState } from "react";

type CustomImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  index: number;
};

const CustomImage = ({
  src,
  alt,
  width,
  height,
  className,
  index,
}: CustomImageProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "h-full w-full object-cover hover:cursor-pointer transition-all ease-in-out duration-[500ms]",
        className || ""
      )}
      data-index={index}
    />
  );
};

export default CustomImage;
