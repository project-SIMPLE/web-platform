import AddCard from "@/components/AddCard";
import React, { useState } from "react";

export default function GetPlayer() {
  // Recupération des players
  const [addPlayers, setPlayers] = useState([
    { id: 1, name: "Player 1", checked: true },
    { id: 2, name: "Player 2", checked: false },
    { id: 3, name: "Player 3", checked: true },
    { id: 4, name: "Player 4", checked: false },
  ]);

  return (
    <div className="p-1 m-1 flex items-center">
      {addPlayers.map((player) => (
        <div key={player.id} className="card">
          <AddCard player={player} />
        </div>
      ))}
    </div>
  );
}
