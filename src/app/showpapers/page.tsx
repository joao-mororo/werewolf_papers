"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TbReload } from "react-icons/tb";
import {
  GiWolfHead,
  GiWitchFace,
  GiAngelWings,
  GiPerson,
} from "react-icons/gi";

interface Player {
  id: string;
  name: string;
  paper: undefined | "Lobisomem" | "Bruxa" | "Anjo" | "Vítima" | string;
}

const ShowPapers = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const playersOnStorage = localStorage.getItem("players");

    if (playersOnStorage) {
      return JSON.parse(playersOnStorage);
    }

    return [];
  });

  const icontoname = (paper: string | undefined) => {
    switch (paper) {
      case "Lobisomem":
        return <GiWolfHead />;
      case "Bruxa":
        return <GiWitchFace />;
      case "Anjo":
        return <GiAngelWings />;
      case "Vítima":
        return <GiPerson />;
      case undefined:
        break;
    }
  };

  useEffect(() => {
    const numplayers = players.length;
    const numLobisomens = Math.round(numplayers * 0.2);
    const numBruxas = Math.round(numplayers * 0.2);
    const numAnjos = Math.round(numplayers * 0.1);
    const numVitimas = numplayers - numLobisomens - numBruxas - numAnjos;

    const papeisDisponiveis: string[] = [];
    for (let i = 0; i < numLobisomens; i++) {
      papeisDisponiveis.push("Lobisomem");
    }
    for (let i = 0; i < numBruxas; i++) {
      papeisDisponiveis.push("Bruxa");
    }
    for (let i = 0; i < numAnjos; i++) {
      papeisDisponiveis.push("Anjo");
    }
    for (let i = 0; i < numVitimas; i++) {
      papeisDisponiveis.push("Vítima");
    }

    // Embaralhar os papeis disponíveis para distribuição
    for (let i = papeisDisponiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [papeisDisponiveis[i], papeisDisponiveis[j]] = [
        papeisDisponiveis[j],
        papeisDisponiveis[i],
      ];
    }

    let playersAtualizados: Player[] = players.map((jogador, index) => {
      if (jogador.paper === undefined) {
        return { ...jogador, paper: papeisDisponiveis[index] };
      }
      return jogador;
    });

    setPlayers(playersAtualizados);
  }, []);

  return (
    <main className="mx-auto max-w-6xl my-6 p-4 md:p-0">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Papéis dos Jogadores</h1>
        <Link
          href={"/"}
          className="bg-orange-500 hover:bg-orange-500/80 rounded-md p-2 flex gap-2 justify-center items-center"
        >
          Recomeçar <TbReload />
        </Link>
      </div>
      <ul className="space-y-2 my-10">
        {players.map((player, i) => (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <li
                key={player.name}
                className="bg-purple-900 rounded-md p-4 flex justify-between cursor-pointer"
              >
                <div>
                  <span className="text-white/50 mr-2">{`#${i + 1}`}</span>
                  {`${player.name}: ${player.paper}`}
                </div>
              </li>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="inset-0 fixed bg-black/50" />
              <Dialog.Content className="left-1/2 top-1/2 w-96 fixed -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-purple-700 p-4 text-center">
                <p className="text-8xl flex justify-center mt-4 mb-8">
                  {icontoname(player.paper)}
                </p>
                <p>{player.name} é:</p>
                <h1 className="text-3xl font-bold">{player.paper}</h1>
                <Dialog.Close className="p-2 bg-purple-900 rounded-md mt-12 outline-none">
                  Entendi!
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </ul>
    </main>
  );
};

export default ShowPapers;
