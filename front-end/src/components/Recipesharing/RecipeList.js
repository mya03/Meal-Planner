/* 
The RecipeList component will display a list of recipes that users have shared.
*/

import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
      <div>
        <h2>Shared Recipes</h2>
          {recipes.length === 0 ? (
            <p>No recipes shared yet.</p>
          ) : (
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>
                  <h3>{recipe.recipeName}</h3>
                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};

export default RecipeList;