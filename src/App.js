import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {
  const app_id = "097b5a73";
  const app_key = "0166dd5e604e2ca27bfef2d92d3bc5ec";

 

  const [recepies, setRecepies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

  useEffect(() => {
    getRecipes();
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecepies(data.hits);
    
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form>
        <input 
        className="search-bar" 
        type="text" 
        value = {search} 
        onChange = {updateSearch} />
        <button className="search-button" type="button" onClick = {getSearch} >Push</button>
        <p></p>
      </form>
      {recepies.map((recipe,index) => (
        <li className = "recipe" key = {index}>
        <Recipe 
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
        </li> 
      ))}
      
    </div>
  );
}

export default App;
