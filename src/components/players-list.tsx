"use client";

import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

// interface Player {
//   id: string;
//   name: string;
//   paper: null | "werewolf" | "witch" | "angel" | "victim";
// }

const PlayersList = () => {
  const [players, setPlayers] = useLocalStorage("players", [
    {
      id: crypto.randomUUID(),
      name: "Player 1",
      paper: undefined,
    },
    {
      id: crypto.randomUUID(),
      name: "Player 2",
      paper: undefined,
    },
    {
      id: crypto.randomUUID(),
      name: "Player 3",
      paper: undefined,
    },
  ]);

  const deletePlayer = (id: string) => {
    const newArray = players.filter((p) => p.id !== id);
    setPlayers(newArray);
  };

  return (
    <ul className="space-y-2 my-10">
      {players.length > 0 ? (
        players.map((player, i) => (
          <li
            key={player.id}
            className="bg-purple-900 rounded-md p-4 flex justify-between"
          >
            <div>
              <span className="text-white/50 mr-2">{`#${i + 1}`}</span>
              {player.name}{" "}
            </div>
            <button onClick={() => deletePlayer(player.id)}>X</button>
          </li>
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Nenhum jogador adicionado</h1>
          <h3>Adicione jogadores para começar a jogar</h3>
        </div>
      )}
    </ul>
  );
};

export default PlayersList;
