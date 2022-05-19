import axios from "axios";

export function getTypes() {return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/types");
    const data = await response.data;
    dispatch({
      type: "GET_TYPE",
      payload: data,
    });
  };
} 
  export function getPokemons(){ return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemons`);
    const data = await response.data;
      dispatch({
      type: "GET_POKEMONS",
      payload: data,
    });
  };
};
  
  export function getByName(name){ return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/pokemons?name=${name}`
    );
    const data = await response.data;
    dispatch({
      type: "GET_NAME",
      payload: data,
    });
  };
}; 
  export function filters(num) {return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/pokemons?by=${num}`
    );
    const data = await response.data;
    dispatch({
      type: "FILTER",
      payload: data,
    });
  };
}; 
  export const type = (type) => (dispatch) => {
    dispatch({
      type: "BY_TYPE",
      payload: type,
    });
  };
  
  export const order = (order) => (dispatch) => {
    dispatch({
      type: "ORDER",
      payload: order,
    });
  };
  
  export function deletePokemon(id) {
    return function (dispatch) {
      return axios
        .delete(`http://localhost:3001/pokemons/${id}`)
        .then(() => {
          return dispatch({ type: "DELETE_POKEMON" });
        })
        .catch((error) => {
          return(404)
        })
    };
  }