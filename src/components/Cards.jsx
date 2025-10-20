import { useEffect, useState } from "react";
import { getPokemonData } from "../utils";

function Card({ imageURL, name }) {
  return (
    <div>
      <img src={imageURL} alt="Pokemon" className="card" />
      <span>{name}</span>
    </div>
  );
}

function CardContainer({ ids, onUpdateScore, highScore }) {
  // console.log(ids);
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemonData(ids);
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
        setPokemon([]);
      }
    };

    fetchPokemon();
  }, [ids]);

  return (
    <div className="card-container">
      {pokemon && pokemon.map((p) => {
        return <img src={p.src} alt="Pokemon" key={p.id}></img>;
      })}
    </div>
  );
}

export { Card, CardContainer };
