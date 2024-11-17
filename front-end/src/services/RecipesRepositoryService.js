import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  #api = "https://api.spoonacular.com/recipes/";
  #apiKey = "193232ec7aa447bd889235b1cb5196ad";

  constructor() {
    super();
    this.dbName = 'recipesDB';
    this.storeName = 'recipes';
    this.db = null;
    this.recipesData = [];

    // Initialize the database
    // this.fetchRecipesData()
    //   .then(() => {this.initDB()
    //     .then(() => {
    //         // Load tasks on initialization
    //         this.loadRecipesFromDB();
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   });

    //   console.log(this.recipesData);
    this.getRandomRecipe();
  }

  async fetchRecipesData() {
      try {

        // // List all meals by first letters (a - z)

        // for(let i = 0; i < 25; i++) {
          // let response = await fetch(this.#api + this.#apiKey);
          // let data = await response.json();
          // this.recipesData.push(data.meals);
        // }
        // console.log('Fetched recipes data:', data);
        // this.getRandomRecipe();
        // this.fetchRandomRecipe();
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 3);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        
        //create obkectStore
        const objectStore = db.createObjectStore(this.storeName, {
          keyPath: 'recipe_id',
          autoIncrement: true,
        });

        //index for recipe name
        objectStore.createIndex("name", "strMeal", { unique: false });

        //index for images
        objectStore.createIndex("image", "strMealThump");

        objectStore.transaction.oncomplete = (event) => {
          // Store values in the newly created objectStore.
          const customerObjectStore = db
            .transaction(this.storeName, "readwrite")
            .objectStore(this.storeName);
          this.recipesData.forEach((recipe) => {
            customerObjectStore.add(recipe);
          });
        };

        request.onsuccess = event => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onerror = event => {
          reject('Error initializing IndexedDB');
        };
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }


  async loadRecipesFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const recipes = event.target.result;
        this.publish(Events.AllRecipes, recipes);
        resolve(recipes);
      };

      request.onerror = () => {
        reject('Error retrieving recipes');
      };
    });
  }


  addSubscriptions() {
      this.subscribe(Events.FindRecipes, (ingredients) => {
        this.findRecipes(ingredients);
      });
  }

  //find recipes from db based on input ingredients
  async findRecipes(ingredients){
      return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], 'readonly');
          const store = transaction.objectStore(this.storeName);
          const request = store.getAll(); // Get all recipes
    
          request.onsuccess = event => {
              const recipes = event.target.result;

              const foundRecipes = recipes.filter(recipe => {
                  // Loop through ingredients
                  for (let i = 1; i <= 20; i++) { 
                    const ingredient = recipe[`strIngredient${i}`];
                    if (ingredient && ingredient.toLowerCase().includes(ingredients.toLowerCase())) {
                      return true;
                    }
                  }
                  return false; // No match
              });

              const hub = EventHub.getInstance();
              hub.publish("FoundRecipes", foundRecipes);   
              resolve(foundRecipes);
          };
    
          request.onerror = event => {
            reject('Error finding recipes');
          };
        });
  }

  async getRandomRecipe() {
    this.#fetchRandomRecipe()
      .then((data) => {this.#fetchNutritionData(data.recipes[0].id)
        .then((nutrition) => {
          // Load tasks on initialization
          return this.#createRecipeObject(data, nutrition.nutrients);
        })
        .catch(error => {
          console.error(error);
          return null;
      });
    });
  }

  async #fetchRandomRecipe() {
    try {
      // Get a random recipe
      const response = await fetch(this.#api + "/random?apiKey=" + this.#apiKey);
      const data = await response.json();
      console.log('Fetched a random recipe: ' + data);
      return data;
    } catch (error) {
      console.log('Error fetching a random recipe: ' + error);
      return null;
    }
  }

  async #fetchNutritionData(id) {
    try {
      const response = await fetch(this.#api + id + "/nutritionWidget.json?apiKey=" + this.#apiKey);
      const data = await response.json();
      console.log('Fetched nutrition data: ', data);
      return data;
    } catch (error) {
      console.log('Error fetching nutrition data: '+ error);
      return null;
    }
  }

  #createRecipeObject(data, nutrition) {
    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      image: data.image,
      servings: data.servings,
      ingredients: data.extendedIngredients,
      instructions: data.instructions,
      readyInMinutes: data.readyInMinutes,
      dishTypes: data.dishTypes,
      glutenFree: data.glutenFree,
      vegan: data.vegan,
      vegetarian: data.vegetarian,
      dairyFree: data.dairyFree,
      nutrition: {
        calories: {
          amount: nutrition[0].amount,
          unit: nutrition[0].unit
        },
        fat: {
          amount: nutrition[1].amount,
          unit: nutrition[1].unit
        },
        carb: {
          amount: nutrition[3].amount,
          unit: nutrition[3].unit
        },
        sugar: {
          amount: nutrition[5].amount,
          unit: nutrition[5].unit
        },
        sodium: {
          amount: nutrition[7].amount,
          unit: nutrition[7].unit
        },
        protein: {
          amount: nutrition[8].amount,
          unit: nutrition[8].unit
        },
      }
    };
  }
}
  