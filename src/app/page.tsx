import SearchPokemon from "../components/SearchPokemon";

export default function Home() {
  return (
    <div
      className="bg-[url(/background-pokemon.jpg)] bg-no-repeat bg-contain size-full
 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <main className=" grid justify-items-center gap-8 row-start-2  sm:items-start bg-white p-5">
        <SearchPokemon />
      </main>
    </div>
  );
}
