import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  #api = "https://api.spoonacular.com/recipes/";
  #apiKey = "56696075b2fe4df48b9d6f5660305da8";

  constructor() {
    super();
    // this.dbName = 'recipesDB';
    // this.storeName = 'recipes';
    // this.db = null;
    // this.recipesData = [];
    // this.#initRecipes();

    //   console.log(this.recipesData);
    // this.getRandomRecipe();
    // this.loadMultiRecipes();
    // this.#initRecipes().then(() => {
    //   this.getRandomRecipe();
    // })
  }

  // async #initRecipes() {
  //   return new Promise((resolve) => {
  //     resolve("Start db");
  //   })

  //   // data.recipes.forEach(async (recipe) => {
  //   //   // Convert the base64 string back to blob
  //   //   if (task.file) {
  //   //     task.file = Base64.convertBase64ToFile(
  //   //       task.file,
  //   //       task.mime,
  //   //       task.filename
  //   //     );
  //   //   }

  //   //   // Publish the task. This will likely update the UI with the task data.
  //   //   // What is cool is that we do not care about the UI here. We just publish
  //   //   // the event and let the UI components handle the update or whatever part
  //   //   // of this application is interested in the task data.
  //   //   this.publish(Events.NewTask, task);
  //   // });
  // }

  // async fetchRecipesData() {
  //     try {

  //       // // List all meals by first letters (a - z)

  //       // for(let i = 0; i < 25; i++) {
  //         // let response = await fetch(this.#api + this.#apiKey);
  //         // let data = await response.json();
  //         // this.recipesData.push(data.meals);
  //       // }
  //       // console.log('Fetched recipes data:', data);
  //       // this.getRandomRecipe();
  //       // this.fetchRandomRecipe();
  //     } catch (error) {
  //       console.error('Error fetching recipes:', error);
  //     }
  //   }

  // async initDB() {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open(this.dbName, 3);

  //     request.onupgradeneeded = event => {
  //       const db = event.target.result;
        
  //       //create obkectStore
  //       const objectStore = db.createObjectStore(this.storeName, {
  //         keyPath: 'recipe_id',
  //         autoIncrement: true,
  //       });

  //       //index for recipe name
  //       objectStore.createIndex("name", "strMeal", { unique: false });

  //       //index for images
  //       objectStore.createIndex("image", "strMealThump");

  //       objectStore.transaction.oncomplete = (event) => {
  //         // Store values in the newly created objectStore.
  //         const customerObjectStore = db
  //           .transaction(this.storeName, "readwrite")
  //           .objectStore(this.storeName);
  //         this.recipesData.forEach((recipe) => {
  //           customerObjectStore.add(recipe);
  //         });
  //       };

  //       request.onsuccess = event => {
  //         this.db = event.target.result;
  //         resolve(this.db);
  //       };
  
  //       request.onerror = event => {
  //         reject('Error initializing IndexedDB');
  //       };
  //     };

  //     request.onsuccess = event => {
  //       this.db = event.target.result;
  //       resolve(this.db);
  //     };

  //     request.onerror = event => {
  //       reject('Error initializing IndexedDB');
  //     };
  //   });
  // }


  // async loadMultiRecipes() {
  //   let recipes = [];

  //   for(let i=0; i<5; i++){
  //     const recipe = await this.getRandomRecipe();
  //     recipes.push(recipe);
  //   }
  //   this.publish(Events.AllRecipes, recipes);
  // }


  addSubscriptions() {
      this.subscribe(Events.FindRecipes, (ingredients) => {
        this.findRecipes(ingredients);
      });
  }

  // //find recipes from db based on input ingredients
  // async findRecipes(ingredients){
  //     try{
  //       const ingredientsList = ingredients.replace(/ /g, '+');
  //       const response = await fetch(this.#api + `findByIngredients?ingredients=${ingredientsList}?apiKey=` + this.#apiKey);
  //       const result = await this.getRandomRecipe();
  //       return  result;
  //     }catch(error){
  //       console.error(error);
  //     }
  // }

  async getRandomRecipe() {

    const response = await fetch("/v1/recipes", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get a random recipe");
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
}
  