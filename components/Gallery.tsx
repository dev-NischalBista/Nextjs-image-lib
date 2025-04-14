import Image from "next/image";
import ImagesGrid from "./ImagesGrid";
import { fetchImages } from "@/lib/data";

export default async function Gallery() {
  const images = await fetchImages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grids-cols-5 gap-4 auto-rows-[360px] md:auto-rows-[240px]">
      <div className="relative row-span-2 rounded-lg transition-all duration-300 ease-in-out overflow-hidden group brightness-75 hover:brightness-110 hover:cursor-pointer">
        <Image
          src="/images/forest.jpg"
          alt="forest"
          width={240}
          height={496}
          className="h-full w-full object-cover rounded-lg brightness-75 group-hover:scale-125 transition-all duration-700 ease-in-out"
        />

        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-white">
          <p className="text-[48px] font-bold uppercase group-hover:tracking-[8px] leading-none transition-all duration-700 ease-in-out">
            Gallery
          </p>
        </div>
      </div>
      <ImagesGrid images={images} />
    </div>
  );
}
