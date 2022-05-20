
import React, { useCallback, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation} from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../stats"
import { deletePokemon, getPokemons} from "../../actions";
import Alert from "../Alert/alert";

export const Pokemon = () => {

  const { id } = useParams();

  const location = useLocation();

  const showButton = () => {       
    return (location.pathname.includes("-"));
  }

  const [pokemon, setPokemon] = useState({});
  const [btnAlert, setBtnAlert]= useState(false);
  const [btnAlertErr, setBtnAlertErr]= useState(false);

  const dispatch = useDispatch();
  
  const getResponse = async(id) =>{               // Trae la respuesta del dispatch 
    const res = await dispatch(deletePokemon(id))//(Para saber cuando tiene un error y cambiar la alerta)
    const data = await res;
    return (JSON.stringify(data));
  };
  
  const handleDelete = async(id) => {
    let response = await getResponse(id)
    if(response ==="404") setBtnAlertErr(true);
    else{ 
      setBtnAlert(true);
      dispatch(getPokemons());
    }
  };

  const details = useCallback(async () => {
    const response = await fetch(`https://agus-pokemon.herokuapp.com/${id}`);
    const data = await response.json();
    setPokemon(() => data);
  },[id])
  
  useEffect(() => {
    details();
  },[details]);

  return (
    <>
    <div>   
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
            ? pokemon?.type.map((t) => <h3 className={style[`${t}`]} key={t}>{t}</h3>)
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
        <Alert trigger={btnAlert} setTrigger={setBtnAlert}>
          <img src="https://s8.gifyu.com/images/check-greenadc54c8c906856d6.gif" alt="gif"></img>
          <h3>Pokemon deleted Successfully</h3>
        </Alert>
        <Alert trigger={btnAlertErr} setTrigger={setBtnAlertErr}>
          <img src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.webp" alt="gif"></img>
          <h3>Pokemon NOT FOUND!</h3>
        </Alert>
      </div>
    </div>
    </>
  );
};