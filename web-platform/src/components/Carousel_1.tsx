import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/**
 * Carousel component for Next.js and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices.
 *
 * @param {Object[]} images - Array of images with src, alt, and id attributes
 * @returns React component
 */
export default function Carousel({
  images,
}: {
  images: { src: string; alt: string; id: string }[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
        aria-label="Previous slide"
      />
      <Swipe
        onSwipeLeft={handleNextSlide}
        onSwipeRight={handlePrevSlide}
        className="w-full h-[50vh] flex overflow-hidden relative m-auto"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {index === currentSlide && (
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        ))}
      </Swipe>
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
        aria-label="Next slide"
      />
      <div className="flex justify-center p-2 gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-4 w-4 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-gray-700" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
