/* 
The RecipeList component will display a list of recipes that users have shared.
*/

import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
    return (
        <div className="recipe-list">
          <h2>Shared Recipes</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.recipeName}</h3>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default RecipeList;