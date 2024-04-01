import { useState } from "react";
import Image from "next/image";

export default function Carousel() {
  return (
    <div className="relative h-96">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="relative">
            <Image layout="fill" objectFit="cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-between">
            <button
              type="button"
              className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg"
            >
              Previous
            </button>
            <button
              type="button"
              className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
