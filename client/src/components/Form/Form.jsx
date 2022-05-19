
import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getPokemons } from "../../actions/index";
import style from "./form.module.css";
import Alert from "../Alert/alert";

export const Form = () => {

  // window.onbeforeunload = (event) => { // Avisa que vas a recargar la pagina.
  //   const e = event || window.event;
  //   // Cancel the event
  //   e.preventDefault();
  //   if (e) {
  //     e.returnValue = '';
  //   }
  //   return ''; 
  // };

    const dispatch = useDispatch();
    const options = useSelector((store) => store.types);

    const [btnAlert, setBtnAlert]= useState(false);

    const validate = (input) => {
        let errors ={};
        if (!input.name) {
            errors.name = "Name is required";
        }

        return errors;
    } 

    const [data, setData] = useState({
        name: "",
        vida: 0,
        fuerza: 0,
        defensa: 0,
        velocidad: 0,
        altura: 0,
        peso: 0,
        img: "",
        tipos: [],
    })

    const [errors, setErrors] = useState({});

    const inputChange = (e) => {
      if (e.target.name !== "name") {
        if(e.target.name === "peso" || e.target.name ==="altura"){
          setData({
            ...data,
            [e.target.name]: Number(e.target.value) <=0 ? 0 : (e.target.value * 10), //La api usa la altura en decimetros y el peso en hectogramos, por eso multiplico por 10.
          });
        } else{
        setData({
          ...data,
          [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
        });
      }} else {
        setErrors(
          validate({
            ...data,
            [e.target.name]: e.target.value,
          })
        );
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    }

    const check = (e) => {
        if (data.tipos.includes(e.target.value)){
            data.tipos =data.tipos.filter((id) => id !== e.target.value);
            setData({
                ...data,
                tipos: data.tipos,
            })
        }else {
            setData({
                ...data,
                tipos: [...data.tipos, e.target.value],
            })
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const create = await fetch("http://127.0.0.1:3001/pokemons", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        dispatch(getPokemons());
        const response = await create.json();
        setData({
            name: "",
            vida: 0,
            fuerza: 0,
            defensa: 0,
            velocidad: 0,
            altura: 0,
            peso: 0,
            img: "",
            tipos: [],
        })
        setBtnAlert(true);
    }
    return (
        <div className={style.containerCreate}>
          <form action="POST" className={style.form} onSubmit={submit}>
           <div className={style.column}>
            <h1>Create your own Pokemon</h1>
            <div className={style.separado}>
              <p className={errors.name ? style.danger : style.question}>
                <label>Pokemon name</label>
                <input
                  type="text"
                  placeholder="Enter Name..."
                  name="name"
                  value={data.name}
                  onChange={inputChange}
                  required
                />
              </p>
              {errors.name ? <p className="danger">{errors.username}</p> : null}
              <p className={style.question}>
                <label>Life</label>
                <input
                  type="number"
                  name="vida"
                  value={data.vida}
                  onChange={inputChange}
                />
              </p>
              <p className={style.question}>
                <label>Strength</label>
                <input
                  type="number"
                  name="fuerza"
                  value={data.fuerza}
                  onChange={inputChange}
                />
              </p>
              <p className={style.question}>
                <label>Defense</label>
                <input
                  type="number"
                  name="defensa"
                  value={data.defensa}
                  onChange={inputChange}
                />
              </p>
              <p className={style.question2}>
                <label>Speed</label>
                <input
                  type="number"
                  name="velocidad"
                  value={data.velocidad}
                  onChange={inputChange}
                />
              </p>
              <p className={style.question}>
                <label>Height</label>
                <input
                  type="number"
                  name="altura"
                  value={data.altura /10} //Se divide por 10, porque antes de multiplica por 10 para guardar en la DB.
                  onChange={inputChange}
                />
              </p>
              <p className={style.question}>
                <label>Weight</label>
                <input
                  type="number"
                  name="peso"
                  value={data.peso /10} //Se divide por 10, porque antes de multiplica por 10 para guardar en la DB.
                  onChange={inputChange}
                />
              </p>
              <p className={style.question}>
                <label>Image</label>
                <input
                  type="text"
                  placeholder="Enter image link..."
                  name="img"
                  value={data.img}
                  onChange={inputChange}
                  required
                />
              </p>
            </div>
            <div>
            <img src={data.img} onError={(e)=>{e.target.onerror = null; e.target.src="http://joshcroyle.com/wp-content/uploads/2019/01/Logo-Menu.png"}}/>
            </div>
            </div>
            <div className={style.hiddenCB}>
              <h1>Types</h1>
              <div className={style.tipos}>
                {options?.map((t) => (
                  <div key={t.slot}>
                    <input
                      type="checkbox"
                      name={t.name}
                      value={t.slot}
                      id={t.slot}
                      onChange={check}
                    />
                    <label htmlFor={t.slot}>{t.name}</label>
                    {t.slot % 2 === 0 ? <br/> : null}
                  </div>
                ))}
                <input type="submit" value="Create" className={style.submit} />
              </div>
            </div>
          </form>
          <Alert trigger={btnAlert} setTrigger={setBtnAlert}>
          <img src="https://s8.gifyu.com/images/check-green.gif" alt="gif"></img>
          <h3>Pokemon created Successfully</h3>
        </Alert>
        </div>
      );

}