import React, { useState } from "react";
import style from "./search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filters, getByName, order, type, type2 } from "../../actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);
  const button = style.button;
  const button0= style.button0;
  const button2= style.button2;

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byTipo = (e) => {
    dispatch(type(e.target.value));
  }

  const byTipo2 = (e) => {
    dispatch(type2(e.target.value));
  }

  
  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    setPokemons("");
  };

  const creadoBy = (e) => {
    dispatch(filters(e.target.value))
  }

  const orderBy = (e) => {
    dispatch(order(e.target.value));
  }

  return (
    <div className={style.container}>
      <form onSubmit={submit}>
        <div className={style.field}>
          <input
            type="text"
            id="searchterm"
            value={pokemons}
            onChange={handleInputChange}
            placeholder="Find your Pokemon..."
          />
          <input className={button} type="submit" value="Find!" />
        </div>
      </form>
      <div className={style.field2}>
        <select className={button0} name="Type" onChange={byTipo}>
          <option value="">Type:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot}>
              {p.name}
            </option>
          ))}
        </select>
        <select className={button} name="Type2" onChange={byTipo2}>
          <option value="">Type2:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="creado" className={button} onChange={creadoBy}>
          <option value="0">Created by:</option>
          <option value="1">API</option>
          <option value="2">Fandom</option>
        </select>
        <select name="Ordenar" className={button2} onChange={orderBy}>
          <option value="">Order by:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="fuerza+">Fuerza+</option>
          <option value="fuerza<30">Fuerza30</option>
          <option value="fuerza-">Fuerza-</option>
        </select>
      </div>
    </div>
  );
};