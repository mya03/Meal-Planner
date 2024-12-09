import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {

  constructor() {
    super();
    this.publish(Events.FilterRecipes, {
      ingredientsObj : {
        ingredients: "asparagus,olive oil",
        response: {}
      },
      dietObj : {
        diet: "glutenFree, dairyFree",
        response: {}
      },
      resObj : {}
    });
  }

  async getRandomRecipe(numRecipe, obj) {

    const response = await fetch("/v1/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({numRecipe: numRecipe}),
    });

    if (!response.ok) {
      throw new Error("Failed to get a random recipe");
    }

    const data = await response.json();
    obj.data = data;
  }

  addSubscriptions() {
    this.subscribe(Events.RandomRecipe, async(data) => {
      await this.getRandomRecipe(data.numRecipes, data.response);
    });

    this.subscribe(Events.FilterIngredients, async(data) => {
      await this.filterIngredients(data);
    });

    this.subscribe(Events.FilterDiet, async(data) => {
      await this.filterRecipesBasedOnDiet(data);
    });

    this.subscribe(Events.FilterRecipes, async(data) => {
      await this.filterRecipes(data.ingredientsObj, data.dietObj, data.resObj);
    });

    this.subscribe(Events.CaloriesRecommendation, async(data) => {
      await this.getRecipesBasedOnCalories(data);
    });
  }

  async filterIngredients(obj) {
    const response = await fetch("/v1/ingredients", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(obj),
    });
    
    if (!response.ok) {
      throw new Error("Failed to filter by ingredients");
    }
    
    const data = await response.json();
    obj.response.data = data;
  }
  
  async filterRecipesBasedOnDiet(obj) {
      const response = await fetch("/v1/diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to filter by diet");
    }

    const data = await response.json();
    obj.response.data = data;
  }

  async filterRecipes(ingredientsObj, dietObj, resObj) {
    await this.filterIngredients(ingredientsObj);
    await this.filterRecipesBasedOnDiet(dietObj);
    let setIngredients = new Set(ingredientsObj.response.data);
    for(const recipe of ingredientsObj.response.data) {
      setIngredients.add(recipe.recipeid);
    }
    const res = [];
    for(const recipe of dietObj.response.data) {
      if(setIngredients.has(recipe.recipeid)) {
        res.push(recipe);
      }
    }
    resObj.data = res;
  }

  async getRecipesBasedOnCalories(obj) {

    const response = await fetch("/v1/calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to get recipes based on calories.");
    }

    const data = await response.json();
    obj.response.data = data;
  }
}
  