import { EventHub } from '../eventhub/EventHub.js';
import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  constructor(){
    super();
  }

  addSubscriptions(){
    this.subscribe('LogInUser', async (data) => {
      await this.login(data);
    });

    this.subscribe('SignUpUser', async (data) => {
      await this.signup(data);
    });

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
    })
  }

  async login(user){
    const hub = EventHub.getInstance();
    try{
      const response = await fetch("/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      
      hub.publish('LogInSuccess', data.username);
      return data;
    }catch(error){
      hub.publish('FailedLogIn', null);
      console.error("failed log in:", error);
    }
    
  }

  async signup(user){
    const hub = EventHub.getInstance();
    try{
      const response = await fetch("/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      const data = await response.json();
      console.log("sign up success");
      hub.publish('LogInSuccess', data.username);
      return data;
    }catch(error){
      hub.publish('FailedSignUp', null);
      console.error("failed sign up:", error);
    }
  }

  // this function gets numRecipe number of random recipes
  // and put the data into the passed-in obj.data field
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

  // this function gets all recipes with the specific ingredients
  // and store those recipes in the passed-in obj.response.data field
  // this obj has a required 'ingredients' field or else the server will 
  // return 400 error - bad request
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

  // this function gets all recipes with the specific diet types
  // and store those recipes in the passed-in obj.response.data field
  // this obj has a required 'diet' field or else the server will
  // return 400 error - bad request
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

  // this function combines filterIngredients() and filterRecipesBasedOnDiet()
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

  // this function gets numRecipes number of recipes with
  // specific amount of calories
  // the passed-in obj has 3 fields: numRecipes, calories, response
  // the response fields store the returned data from the request
  // the calories field specifies the amount of calories for each recipe
  // the numRecipes field specifies the number of recipes to get
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