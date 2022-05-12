import React, { useState } from "react";
import style from "./pokedex.module.css";
import { Card } from "../../components/Cards/Card";
import { Search } from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../../components/filters";

export const Pokedex = () => {
  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = tipos(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);

  const pagination = () => {
    if (pokemons.length) return pokemons.slice(page, page + 12);
    if (pokemons.info) return pokemons;
    return [];
  };

  const array = pagination();

  const nextPage = () => {
    if (pokemons.length > page + 12) {
      setPage(page + 12);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 12);
    }
  };

  return (
    <div className={style.container}>
      <Search />
      <Card
        array={array}
        img={"https://i.giphy.com/media/10LKovKon8DENq/giphy.webp"}
      />
        <div className="botones">
        <button onClick={previousPage} className="pagesP">
          &laquo; Previous
        </button>
        <button onClick={nextPage} className="pagesN">
          Next &raquo;
        </button>
      </div>
    </div>
  );
};