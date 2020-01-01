import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const pokemon = [];

  useEffect(() => {
    async function fetchData() {
      for (let i = 1; i < 21; i++) {
        await fetch(`https://pokeapi.co/api/v2/pokemon-form/${i}`)
          .then(res => res.json())
          .then(data =>
            pokemon.push({
              name: data.name,
              sprite: data.sprites.front_default
            })
          );
      }
      setOptions(pokemon);
    }
    fetchData();
  }, [options, pokemon]);

  const updatePokeSearch = arg => {
    setSearch(arg);
    setDisplay(false);
  };

  return (
    <div className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        onChange={event => setSearch(event.target.value)}
        value={search}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ name }) => name.indexOf(search) > -1)
            .map((value, i) => {
              return (
                <div
                  className="option"
                  key={i}
                  onClick={() => updatePokeSearch(value.name)}
                >
                  <span>{value.name}</span>
                  <img src={value.sprite} alt="" />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;
