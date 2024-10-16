import { Pokemon } from "@/pokemons";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Pokemon - ${params.id}`,
    description: `Pokemon - ${params.id}`,
  };
}

const getPokemon = (id: string): Promise<Pokemon> => {
  const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache", // Todo: cambiar esto en un futuro
  }).then((res) => res.json());

  return pokemon;
};

export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id);
  return <div>Hello Pokemon {params.id} {pokemon.name}</div>;
}
