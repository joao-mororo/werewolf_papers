"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, ChangeEvent } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaPlus } from "react-icons/fa";

interface Player {
  id: string;
  name: string;
  paper: undefined | "Lobisomen" | "Bruxa" | "Anjo" | "Vítima";
}

const NewPlayer = () => {
  const [players, setPlayers] = useLocalStorage<Player[]>("players");
  const [name, setName] = useState<string>("");
  const [paper, setPaper] = useState<any>("");

  const addPlayer = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (name === "") {
      return;
    }

    const newArray = [
      ...players,
      {
        id: crypto.randomUUID(),
        name,
        paper,
      },
    ];

    setPlayers(newArray);
    setName("");
    setPaper(undefined);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-orange-500 hover:bg-orange-500/80 rounded-md p-2 flex gap-2 justify-center items-center">
        Adicionar Jogador <FaPlus />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="h-96 left-1/2 top-1/2 w-96 fixed -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col justify-between bg-purple-700">
          <Dialog.Close className="absolute right-0 top-0 p-2">X</Dialog.Close>

          <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => addPlayer(e)}
            className="flex flex-col p-4 space-y-4"
          >
            <h1 className="w-full text-center">Informações do Jogador</h1>

            <input
              className="bg-purple-900 p-1 rounded-md outline-none"
              placeholder="Nome do jogador..."
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <select
              className={`bg-purple-900 p-1 rounded-md outline-none ${
                paper === undefined && "text-white/50"
              }`}
              value={paper}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setPaper(e.target.value)
              }
            >
              <option value={undefined} className="text-white/50">
                Aletório
              </option>
              <option value="Vítima">Vítima</option>
              <option value="Lobisomen">Lobisomen</option>
              <option value="Bruxa">Bruxa</option>
              <option value="Anjo">Anjo</option>
            </select>

            <button className="bg-orange-500 hover:bg-orange-500/80 p-2 rounded-md mt-12">
              Adicionar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewPlayer;
