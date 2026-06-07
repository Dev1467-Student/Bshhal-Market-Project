import { Image } from "@/types";
import { useState } from "react";

function Carousel({ images }: { images: Image[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x600/e5e7eb/1f2937?text=Product";
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto py-2 px-1 md:px-0">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 w-14 h-14 border-2 rounded-md overflow-hidden ${
              index === activeIndex ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-700"
            } hover:border-black dark:hover:border-white transition-colors duration-150`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image.thumb}
              alt=""
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-white dark:bg-gray-900 border border-black dark:border-gray-700 rounded-lg overflow-hidden min-h-[300px] md:min-h-0">
        <img
          src={images[activeIndex]?.large || ""}
          alt=""
          onError={handleImageError}
          className="w-full h-full object-contain p-4"
        />
      </div>
    </div>
  );
}

export default Carousel;
