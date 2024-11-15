/* 
The RecipeSharing component will manage state, combining RecipeForm and RecipeList
*/

import React, { useState } from 'react';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import './RecipeSharing.css';

const RecipeSharing = () => {
    const [recipes, setRecipes] = useState([]);

    const addRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    return (
        <div className="recipe-sharing-container">
          <h1>Share a Recipe</h1>
          <RecipeForm onSubmit={addRecipe} />
          <RecipeList recipes={recipes} />
        </div>
      );
};

export default RecipeSharing;