
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation} from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../stats"
import { deletePokemon, getPokemons} from "../../actions";

export const Pokemon = () => {
  const { id } = useParams();
  const location = useLocation();
  const showButton = () => {
    return (location.pathname.includes("-"));
  }
  const [pokemon, setPokemon] = useState({});

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePokemon(id));
    dispatch(getPokemons());

  };

  useEffect(() => {
    details();
  }, );

  const details = async () => {
    const data = await fetch(`http://localhost:3001/pokemons/${id}`);

    const pokemon = await data.json();
    setPokemon(pokemon);
  };
  return (
    <>
      <div className={style.container}>
        <button onClick={() => handleDelete(id)} style={showButton() ? {display:'flex', marginLeft:'90em', color:'white', backgroundColor:'red', borderRadius:'20%'} : {display:'none'}}>X</button>
        <h1>{pokemon.name} #{pokemon.id}</h1>
        <div className={style.ima}>
          <img src={pokemon.img} alt="" />
          <div className={style.parrafo}>
            <p>Weight: {pokemon.weight /10}kg</p>
            <p>Height: {pokemon.height / 10}m</p>
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
            <Stats valor={pokemon.fuerza} nombre={"Strenght"} />
          </div>
          <div className={style.type}>
            <Stats valor={pokemon.defensa} nombre={"Defense"} />
            <Stats valor={pokemon.velocidad} nombre={"Speed"} />
          </div>
        </div>
      </div>
    </>
  );
};