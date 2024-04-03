import Image from "next/image";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/**
 * Carousel component for Next.js and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices.
 *
 * @param {Object[]} images - Array of images with src, alt, and id attributes
 * @returns React component
 */
interface GameContextState {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedGame: string | null;
  setSelectedGame: Dispatch<SetStateAction<string | null>>;
}

const GameContext = createContext<GameContextState | null>(null);

export default function Carousel({
  images,
}: {
  images: { src: string; alt: string; id: string; gameName: string }[];
}) {
  //------------ CONSTANTS
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  //------------ MODAL CONTROLS
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

  // This function will be called when a game is selected
  const openModalWithGameData = (gameName: any) => {
    setSelectedGame(gameName);
    setIsModalOpen(true);
    // Fetch the game data here if needed
  };

  const handleChooseGameClick = () => {
    const gameName = images[currentSlide].gameName;
    setSelectedGame(gameName); // Set the selected game name
    setIsModalOpen(true); // Open the modal
  };
  return (
<<<<<<< Updated upstream
    <div className="relative mt-8 w-full h-[106.667vh]">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
        aria-label="Previous slide"
      />
      {/* <Swipe
        onSwipeLeft={handleNextSlide}
        onSwipeRight={handlePrevSlide}
        className="w-full h-[50vh] flex overflow-hidden relative m-auto"
      > */}
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
      {/* </Swipe> */}
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
=======
    <GameContext.Provider
      value={{ isModalOpen, setIsModalOpen, selectedGame, setSelectedGame }}
    >
      <div className="relative mt-5">
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
              } flex flex-col justify-between`}
            >
              {index === currentSlide && (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="contain"
                  />
                </>
              )}
            </div>
          ))}
        </Swipe>
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
          aria-label="Next slide"
        />
        {/* Button and indicators container */}
        <div className="w-full flex flex-col items-center mt-5">
          <button
            onClick={handleChooseGameClick}
            className="text-white bg-blue-500 font-bold text-h1 py-2 px-4 rounded-md mb-2"
          >
            CHOOSE THE GAME
          </button>

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
      </div>
      {/* Conditional rendering of the Modal component */}
      {isModalOpen && <Modal />}
    </GameContext.Provider>
  );
}

//------------ MODAL
function Modal() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Modal must be used within a GameContext.Provider");
  }
  // Destructure the context now that we've assured it's not null
  const { isModalOpen, setIsModalOpen, selectedGame } = context;

  // Handler for the "Yes" button
  const handleYesClick = () => {
    if (selectedGame) {
      // Check if selectedGame is not null
      // Redirect to the game page with the selected game name
      window.location.href = `/game-page?gameName=${encodeURIComponent(
        selectedGame
      )}`;
    } else {
      // Handle the case where selectedGame is null
      // For example, you might want to alert the user or log an error
      console.error("No game selected");
      // Optionally, redirect to a generic page or show a message
      // window.location.href = '/game-page'; // Without a specific game
    }
  };

  // Handler for the "No" button
  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-5 rounded-lg relative max-w-md w-full mx-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-3xl leading-none text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Are you ready to start the game?
        </h2>
        <p className="text-justify">
          You've chosen: <strong>{selectedGame}</strong>
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleNoClick}
            className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={handleYesClick}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Yes
          </button>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
