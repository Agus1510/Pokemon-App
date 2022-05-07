//                                   ,'\
//     _.----.        ____         ,'  _\   ___    ___     ____
// _,-'       `.     |    |  /`.   \,-'    |   \  /   |   |    \  |`.
// \      __    \    '-.  | /   `.  ___    |    \/    |   '-.   \ |  |
//  \.    \ \   |  __  |  |/    ,','_  `.  |          | __  |    \|  |
//    \    \/   /,' _`.|      ,' / / / /   |          ,' _`.|     |  |
//     \     ,-'/  /   \    ,'   | \/ / ,`.|         /  /   \  |     |
//      \    \ |   \_/  |   `-.  \    `'  /|  |    ||   \_/  | |\    |
//       \    \ \      /       `-.`.___,-' |  |\  /| \      /  | |   |
//        \    \ `.__,'|  |`-._    `|      |__| \/ |  `.__,'|  | |   |
//         \_.-'       |__|    `-._ |              '-.|     '-.| |   |
//                                 `'                            '-._|
//                        by: Agustin Panizza



import "./App.css";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LandingPage } from "./Pages/Landing/index";
import { Pokedex } from "./Pages/Pokedex/Pokedex";
// import { Create } from "./Pages/Create/Create";
import { Navbar } from "./components/Navbar/Navbar";
import { getPokemons, getTypes } from "./actions";
// import { Pokemon } from "./components/Pokemon/Pokemon";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });

  return (
    <>
      {/* <Route exact path="/pokedex/:id" >
        <Pokemon />
      </Route> */}
      <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
        <Route>
          <Navbar />
            <Route exact path="/home">
            <Pokedex />
            </Route>
      {/* <Route exact path="/create">
        <Create />
      </Route>
      <Route exact path="/team">
        <Team />
      </Route> */}
      </Route>
      </Switch>
    </>
  );
}

export default App;
