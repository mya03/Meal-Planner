import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {

  constructor() {
    super();
  }

  addSubscriptions() {
      this.subscribe(Events.RandomRecipe, async(data) => {
        await this.getRandomRecipe(data.numRecipes, data.response);
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
}
  