import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {

  constructor() {
    super();
  }

  addSubscriptions() {
      this.subscribe(Events.FilterIngredients, (data) => {
        this.filterIngredients(data);
      });

      this.subscribe(Events.FilterDiet, (data) => {
        this.filterRecipesBasedOnDiet(data);
      });

      this.subscribe(Events.FilterRecipes, (data) => {
        this.filterRecipes(data.ingredientsObj, data.dietObj, data.resObj);
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
    const hub = EventHub.getInstance();
    hub.publish('FoundRecipes', data);
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
    const hub = EventHub.getInstance();
    hub.publish('FoundFilterRecipes', res);
  }
}
  