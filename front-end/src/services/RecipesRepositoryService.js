import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  #numRecipes = 0;

  constructor() {
    super();
    this.publish(Events.FindNumOfRecipedInDB, null);
  }
  
  addSubscriptions() {
    this.subscribe(Events.FindNumOfRecipedInDB, () => {
      this.numOfRecipesInDB();
    });
  }
  
  async numOfRecipesInDB() {
    const response = await fetch("/v1/count", {
      method: "GET",
    })
    this.#numRecipes = await response.json();
  }
}
  