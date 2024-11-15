/* 
the RecipeForm component will include fields that the user may want to share
Such as the recipe name, ingredients, and instructions
*/

import React, { useState } from 'react';

const RecipeForm = ({ onSubmit }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ recipeName, ingredients, instructions });
        setRecipeName('');
        setIngredients('');
        setInstructions('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Recipe Name:</label>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div>
            <label>Ingredients:</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Separate ingredients by commas"
            />
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <button type="submit">Share Recipe</button>
        </form>
    );
};

export default RecipeForm;