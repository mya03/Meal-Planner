import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {

  constructor() {
    super();
    const res = {};
    // this.publish(Events.FilterIngredients, {ingredients: "rum, flour", response: res});
  }

  addSubscriptions() {
      this.subscribe(Events.FilterIngredients, (data) => {
        this.filterIngredients(data);
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
      throw new Error("Failed to store task");
    }

    const data = await response.json();
    obj.response.data = data;
    console.log(obj.response);
  }
}
  