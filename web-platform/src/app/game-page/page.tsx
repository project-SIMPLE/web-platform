import { useRouter } from "next/router";

const GamePage: React.FC = () => {
  const router = useRouter();
  // Explicitly state that gameName can be string or undefined
  const gameName =
    typeof router.query.gameName === "string"
      ? router.query.gameName
      : undefined;

  return (
    <div>
      <h1>Game Page</h1>
      {
        // Conditional rendering to handle the case where gameName might be undefined
        gameName ? (
          <p>
            You selected: <strong>{decodeURIComponent(gameName)}</strong>
          </p>
        ) : (
          <p>No game selected.</p>
        )
      }
    </div>
  );
};

export default GamePage;
