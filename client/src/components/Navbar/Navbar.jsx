import {React, useEffect} from "react";
import { Link, NavLink,  useLocation} from "react-router-dom";
import style from './navbar.module.css';

var path = "/pokedex/1"

export const Navbar = () => {
  
  const location = useLocation();
  if(location.pathname.includes("pokedex") && location.pathname !== path){
    path = location.pathname
  }

  useEffect(() => {
    const indicator = document.querySelector("[data-indicator]")
    document.addEventListener("click", e => {
      let anchor
      if (e.target.matches("a")) {
        anchor = e.target
      } 
      else {
        anchor = e.target.closest("a")
      }
      if (anchor != null) {
        const allAnchors = [...document.querySelectorAll("a")]
        const index = allAnchors.indexOf(anchor)
        if (index > 0 && index <5){
        indicator.style.setProperty("--position", index-1)
        } else{
          indicator.style.setProperty("--position", 1)
        }
      }
    })
  })
  return (
    <div>
      <header className={ style.header } >
        <Link to="/" className={ style.logo }>
          <img src="img/logo.png" alt="" />
        </Link>
        <script src="script.js" defer></script>
        <nav className={style.navbar_container}>
        <ul className ={style.list}>
            <div data-indicator className={style.indicator}>
                <div className={style.corners}></div>
                </div>
            <li ><NavLink activeClassName={style.active} to="/home">
                <div className={style.icon}><img src= "img/home.svg" alt="home" /></div>
                <div className={style.text}>Home</div>
                </NavLink></li>
              <li ><NavLink activeClassName={style.active} to={{pathname:path}}> 
                <div className={style.icon}><img src= "img/pokedex.svg" alt="pokedex"/></div>
                <div className={style.text}>Pokedex</div>
                </NavLink></li>
            <li ><NavLink activeClassName={style.active} to="/create" >
            <div className={style.icon}><img src= "img/create.png" alt="create" /></div>
                <div className={style.text}>Create</div>
                </NavLink></li>
        </ul>
        </nav>
      </header>
    </div>
  );
};