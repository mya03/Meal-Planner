import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  #api = "https://api.spoonacular.com/recipes/";
  #apiKey = "56696075b2fe4df48b9d6f5660305da8";

  constructor() {
    super();
    this.dbName = 'recipesDB';
    this.storeName = 'recipes';
    this.db = null;
    this.recipesData = [];

    this.publish(Events.FilterIngredients, {ingredients: "rum, flour"});
  }

  addSubscriptions() {
      this.subscribe(Events.FilterIngredients, (ingredients) => {
        this.filterIngredients(ingredients);
      });
  }

  async filterIngredients(ingredients) {
    const response = await fetch("/v1/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
    });

    if (!response.ok) {
      throw new Error("Failed to store task");
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
}
  