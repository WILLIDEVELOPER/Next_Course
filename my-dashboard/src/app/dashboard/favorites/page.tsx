import { FavoritePokemons } from "@/pokemons";

export const metadata ={
    title: "Favorites",
    description: "favorites page",
}

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Favoritos <small>Global state</small>
      </span>
      {/* <PokemonGrid pokemons={[]} /> */}
      <FavoritePokemons />
    </div>
  );
}
