"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

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
  return (
    <Image
      src={src}
      alt={alt || "library-image"}
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
