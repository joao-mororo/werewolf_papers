import NewPlayer from "@/components/new-player";
import PlayersList from "@/components/players-list";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl my-6 p-4 md:p-0">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold">Werewolf Papers</h1>
        <div className="flex gap-2">
          <NewPlayer />
          <Link
            className="bg-orange-500 hover:bg-orange-500/80 rounded-md p-2 flex gap-2 justify-center items-center"
            href={"showpapers"}
          >
            Começar <FaCheck />
          </Link>
        </div>
      </div>
      <PlayersList />
    </main>
  );
}
