import { useEffect, useState } from "react";
import { getPokemonData, shuffleArray } from "../utils";

function Card({ pokemon, onClick }) {
  return (
    <div onClick={(e) => onClick(e, pokemon.id)}>
      <img src={pokemon.src} alt={pokemon.name} className="card" />
      <span>{pokemon.name.toUpperCase()}</span>
    </div>
  );
}

function CardContainer({ ids, onGameEnd, onGameWin, highScore }) {
  // console.log(ids);
  const [pokemon, setPokemon] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemonData(ids);
        shuffleArray(pokemonData);
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
        setPokemon([]);
      }
    };

    fetchPokemon();
  }, [ids]);

  function onClickCard(e, id) {
    if (sequence.includes(id)) {
        setScore(0);
        setSequence([]);
        onGameEnd(score);
    }
    else {
        setScore(score + 1);
        let newSequence = [...sequence, id];
        if (newSequence.length === ids.length) {
            
            setSequence([]);
            onGameWin();
        }
        else {
            setSequence(newSequence);
        }
    }
    
    
  }
  return (
    <>
      <div className="score-container">
        <span>Current Score: {score}</span>
        <hr />
        <span>Best Score: {highScore}</span>
      </div>
      <div className="card-container">
        {pokemon &&
          pokemon.map((p) => {
            return <Card pokemon={p} key={p.id} onClick={onClickCard}></Card>;
          })}
      </div>
    </>
  );
}

export { Card, CardContainer };
