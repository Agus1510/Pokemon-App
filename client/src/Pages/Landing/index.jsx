import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";

export const LandingPage = () => {
  return (
    <div className={style.container}>
      <div>
        <h1>
          <span data-text='Lets'>Lets</span> find your <br />
          favorite <br />
          <span data-text='Pokemon'>Pokemon</span>
        </h1>
        <Link to="/home">
          <input type="submit" value="See Pokemon" className={style.myButton} />
        </Link>
      </div>

      <div>
        <img src="img/pikachu.png" alt="" />
      </div>
    </div>
  );
};