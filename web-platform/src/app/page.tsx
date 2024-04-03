"use client";
import Header from "../components/header";
import Carousel from "../components/Carousel_1";
import GetPlayer from "@/Domain/UseCase/Player/GetPlayer";
export default function Home() {
  const images = [
    { id: "1", src: "/simple-assets/images/1.png", alt: "Image 1" },
    { id: "2", src: "/simple-assets/images/2.jpg", alt: "Image 2" },
    { id: "3", src: "/simple-assets/images/3.png", alt: "Image 3" },
    { id: "4", src: "/simple-assets/images/4.png", alt: "Image 4" },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Carousel images={images} />
      {/* Example d'utilisation de GetPlayer pour afficher les players de la Waiting Game */}
      <div className="">
        <GetPlayer />
      </div>
    </main>
  );
}

function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}
