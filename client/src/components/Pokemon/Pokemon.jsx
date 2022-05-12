
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../stats"
import { deletePokemon, getPokemons } from "../../actions";

export const Pokemon = () => {
  const { id } = useParams();
  const history = useHistory();

  const [pokemon, setPokemon] = useState({});

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePokemon(id));
  };

  useEffect(() => {
    detalles();
  }, []);

  const detalles = async () => {
    const data = await fetch(`http://localhost:3001/pokemons/${id}`);

    const pokemon = await data.json();
    setPokemon(pokemon);
  };

  return (
    <>
      <div className={style.container}>
        <button onClick={handleDelete}>X</button>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>
        <div className={style.ima}>
          <img src={pokemon.img} alt="" />
          <div className={style.parrafo}>
            <p>peso: {pokemon.weight /10}kg</p>
            <p>altura: {pokemon.height / 10}m</p>
          </div>
        </div>

        <div className={style.type}>
          {pokemon.type
            ? pokemon?.type.map((t) => <h3 className={style[`${t}`]}>{t}</h3>)
            : null}
        </div>
        <div className={style.meter}>
          <div className={style.type}>
            <Stats valor={pokemon.vida} nombre={"HP"} />
            <Stats valor={pokemon.fuerza} nombre={"Fuerza"} />
          </div>
          <div className={style.type}>
            <Stats valor={pokemon.defensa} nombre={"Defensa"} />
            <Stats valor={pokemon.velocidad} nombre={"Velocidad"} />
          </div>
        </div>
      </div>
    </>
  );
};