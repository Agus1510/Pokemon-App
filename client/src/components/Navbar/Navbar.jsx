import {React, useEffect} from "react";
import { Link, NavLink, matchPath, useLocation} from "react-router-dom";
import style from './navbar.module.css';

export const Navbar = () => {
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
    <body>
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
                <div className={style.icon}><img src= "img/home.svg" /></div>
                <div className={style.text}>Home</div>
                </NavLink></li>
              <li ><NavLink activeClassName={style.active} to="/pokedex">
                <div className={style.icon}><img src= "img/pokedex.svg" /></div>
                <div className={style.text}>Pokedex</div>
                </NavLink></li>
            <li ><NavLink activeClassName={style.active} to="/create" >
            <div className={style.icon}><img src= "img/create.png" /></div>
                <div className={style.text}>Create</div>
                </NavLink></li>
            {/* <li ><NavLink  activeClassName={style.active} to="/team" >
            <div className={style.icon}><img src= "img/team.png" /></div>
                <div className={style.text}>My team</div>
                </NavLink></li> */}
        </ul>
        </nav>
      </header>
    </body>
  );
};