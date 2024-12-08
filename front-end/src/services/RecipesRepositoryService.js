import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  #api = "https://api.spoonacular.com/recipes/";
  #apiKey = "56696075b2fe4df48b9d6f5660305da8";

  constructor() {
    super();
    // this.publish(Events.CaloriesRecommendation, {numRecipes: 3, calories: 500, response: {}});
  }

  addSubscriptions() {
    this.subscribe(Events.CaloriesRecommendation, (data) => {
      this.getRecipesBasedOnCalories(data);
    });
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
  