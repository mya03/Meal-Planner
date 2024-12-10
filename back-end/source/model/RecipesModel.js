import { DataTypes } from "sequelize";
import { SQLiteDB } from "./SQLiteDB.js";

const sequelize = SQLiteDB.getInstance();

const Recipes = sequelize.define("Recipes", {
    id: { // primary key
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    recipeid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "There is no description for this recipe."
    },
    nutrients: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    servings: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0,
    },
    length: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0,
    },
    instruction: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    diet_type: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

class _RecipesModel {
    #api = "https://api.spoonacular.com/recipes/";
    
    constructor() {}
    
    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.
        
        if (fresh) {
            await this.delete();

            const apiKeys = [
                "28b0ce37f2fe40b0aa609436c7dd9b13",
                "348c299525a9466283ede68c204fb2b0",
                "8c22866419b44f32a05baeafcca28fa8",
                "fdace8161aa849829f7350d36e3542b9",
                "68d3837d88b14dd9b60962f35be4282c",
                "f8e8e063372c4bc681bf15aab2b436bb",
                "919f687eff9d4745a6636630c1f84740",
                "32905160df7e42db8453b0e5be699ea3",
                "c38789c63e6448d296ae87c829288fa6",
                "a1b174e35419408daadb08677f61695c",
                "b47b29729e9644edb531ee75a3150db5",
                "5bc47f30f94e4cc8adaeb0c417249a7f",
                "193232ec7aa447bd889235b1cb5196ad",
                "56696075b2fe4df48b9d6f5660305da8",
                "6b0150d40bae4966ac02152c34620ba4",
                "9a228f1e657f4e0eba6aadba28db9239",
                "8ad8b6f8e8ed44db9a414b157662a162"
            ];

            for(const key of apiKeys) {
                let numRecipes = 0;
    
                while(numRecipes < 34) {
                    await this.create(await this.#fetchRecipes(key));
                    numRecipes++;
                }
            }

        }
    }

    async filterIngredients(ingredients) {
        const list = ingredients.trim().split(",");
        for(let i = 0; i < list.length; i++) {
            list[i] = list[i].trim();
        }
        const set = new Set(list);
        const ids = new Set();
        const result = [];
        const recipes = await Recipes.findAll();
        if(list.length === 0 || (list.length === 1 && list[0] === '')) {
            for(let i = 0; i < recipes.length; i++) {
                if(ids.has(recipes[i].dataValues.id)) continue;
                ids.add(recipes[i].dataValues.id);
                result.push(recipes[i].dataValues);
            }
        } else {
            for(let i = 0; i < recipes.length; i++) {
                let recipeIngredients = recipes[i].dataValues.ingredients.trim().split(",");
                for(let ingredient of recipeIngredients) {
                    if(set.has(ingredient) && !(ids.has(recipes[i].dataValues.id))) {
                        ids.add(recipes[i].dataValues.id);
                        result.push(recipes[i].dataValues);
                    }
                }
            }
        }
        return result;
    }

    async create(recipe) {
        return await Recipes.create(recipe);
    }

    async filterDiet(dietTypes) {
        const set = new Set(dietTypes.trim().split(","));
        const result = [];
        const recipes = await Recipes.findAll();
        if(set.size == 0) {
            for(let i = 0; i < recipes.length; i++) {
                results.push(recipes[i].dataValues);
            }
        } else {
            for(let i = 0; i < recipes.length; i++) {
                let ok = true;
                const recipe = recipes[i].dataValues;
                for(let type of set) {
                    type = type.trim();
                    switch(type) {
                        case 'vegan':
                            ok = recipe.diet_type["vegan"];
                            break;
                        case 'glutenFree':
                            ok = recipe.diet_type["glutenFree"];
                            break;
                        case 'dairyFree':
                            ok = recipe.diet_type["dairyFree"];
                            break;
                        case 'vegetarian':
                            ok = recipe.diet_type["vegetarian"];
                            break;
                        default: // still ok
                            break;
                    }

                    if(!ok) break;
                }
                if(ok) result.push(recipe);
            }
        }
        return result;
    }

    async read(recipeid = null) {
        if (recipeid) {
            return await Recipes.findByPk(recipeid);
        }

        return await Recipes.findAll();
    }

    async update(recipe) {
        const recipeu = await Recipes.findByPk(recipe.id);
        if (!recipeu) {
            return null;
        }

        await recipeu.update(recipe);
        return recipeu;
    }

    async delete(recipe = null) {
        if (recipe === null) {
            await Recipes.destroy({ truncate: true });
            return;
        }

        await Recipes.destroy({ where: { recipeid: recipe.recipeid } });
        return recipe;
    }

    async count() {
        return Recipes.count();
    }

    async getRandom() {
        const ids = await Recipes.findAll({
            attributes: ['id'],
        });
        return ids[Math.floor(Math.random() * ids.length)].dataValues.id;
    }

    async getRecipeBasedOnCalories(numRecipes, calories) {
        const recipes = await Recipes.findAll();
        const result = []
        const ids = new Set();
        let iterations = 0;
        const possibles = [];
        for(let i = 0; i < recipes.length; i++) {
            let kcal = await this.#getCalories(recipes[i].dataValues);
            // marginal error +-50
            if(kcal <= calories + 50 && kcal >= calories - 50) {
                possibles.push(recipes[i].dataValues);
            }
        }
        while((result.length < numRecipes) && (iterations < possibles.length)) {
            let id = Math.floor(Math.random() * possibles.length);
            iterations++;
            while(ids.has(id) && (iterations < possibles.length)) {
                id = Math.floor(Math.random() * possibles.length);
                iterations++;
            }
            ids.add(id);
            result.push(possibles[id]);
        }
        while(result.length < numRecipes) {
            let id = Math.floor(Math.random() * recipes.length);
            result.push(recipes[id].dataValues);
        }
        return result;
    }

    async #getCalories(recipe) {
        return await recipe.nutrients[0]["amount"];
    }

    async #fetchRecipes(key) {
        return new Promise((resolve, reject) => {
            this.#fetchRecipeData(key)
                .then((data) => {
                    this.#fetchNutritionData(data.recipes[0].id, key)
                        .then((nutrition) => {
                            let ingredients = "";
                            for(let ingredient of nutrition.ingredients) {
                                ingredients += ingredient.name + ",";
                            }
                            resolve(this.#createRecipeEntry(data.recipes[0], nutrition.nutrients, ingredients.slice(0, ingredients.length - 1)));
                        })
                    .catch(error => {
                        console.error(error);
                        reject(null);
                    });
                });
        });
    }

    async #fetchRecipeData(key) {
        try {
            const response = await fetch(this.#api + "/random?apiKey=" + key);
            const data = await response.json();
            return data;
        } catch(error) {
            console.log('Error fetching a random recipe: ' + error);
            return null;
        }
    }

    async #fetchNutritionData(id, key) {
        try {
            const response = await fetch(this.#api + id + "/nutritionWidget.json?apiKey=" + key);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error fetching nutrition data: '+ error);
            return null;
        }
    }

    #createRecipeEntry(data, nutrition, dataIngredients) {
        return {
            recipeid: data.id,
            title: data.title,
            description: data.summary.replace(/<[^>]*>/g, ""),
            nutrients: nutrition,
            servings: data.servings,
            instruction: data.instructions.replace(/<[^>]*>/g, ""),
            image: data.image,
            diet_type: {
                vegetarian: data.vegetarian,
                vegan: data.vegan,
                glutenFree: data.glutenFree,
                dairyFree: data.dairyFree,
                veryHealthy: data.veryHealthy,
            },
            ingredients: dataIngredients,
            length: data.readyInMinutes,
        }
    }
}

const RecipesModel = new _RecipesModel();

export default RecipesModel;