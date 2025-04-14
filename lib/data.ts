import { UnsplashPhotoResponse } from "@/types/Image.entity";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchImages = async (): Promise<UnsplashPhotoResponse[]> => {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos?per_page=40",
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data: UnsplashPhotoResponse[] = await response.json();

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(data);
    //   }, 10000);
    // });

    return data;
    // Return the fetched images data
  } catch (error) {
    console.error("Error fetching images:", error);
    return []; // Return an empty array in case of failure
  }
};
