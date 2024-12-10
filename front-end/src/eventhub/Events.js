/**
 * An object containing various message types for task management.
 */
export const Events = {
    FindRecipes: 'FindRecipes',
    AllRecipes: 'AllRecipes',
    RandomRecipe: 'RandomRecipe', // get random recipes
    FilterIngredients: 'FilterIngredients', // filter recipes based on ingredients
    FilterDiet: 'FilterDiet', // filter recipes based on diet types
    FilterRecipes: 'FilterRecipes', // filter recipes based on diet types AND ingredients
    CaloriesRecommendation: 'CaloriesRecommendation', // filter recipes based on average calories
  };