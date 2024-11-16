import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
    constructor() {
      super();
      this.dbName = 'recipesDB';
      this.storeName = 'recipes';
      this.db = null;
      this.recipesData = [];
  
      // Initialize the database
      this.fetchRecipesData()
        .then(() => {this.initDB()
            .then(() => {
                      // Load tasks on initialization
                      this.loadRecipesFromDB();
                    })
                    .catch(error => {
                      console.error(error);
                    });
        });

        console.log(this.recipesData);
    }

    async fetchRecipesData() {
        try {
          const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=m");
          const data = await response.json();
          this.recipesData = data.meals; // Assuming 'meals' is the property containing the recipes
          console.log('Fetched recipes data:', this.recipesData);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
  
    async initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 3);
  
        request.onupgradeneeded = event => {
            console.log("hi");
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
  }
  