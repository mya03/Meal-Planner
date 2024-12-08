import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

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
    #apiKey1 = "75689177ee554a0d991c952b86f4b4f0";
    #apiKey2 = "c38789c63e6448d296ae87c829288fa6";
    #apiKey3 = "a1b174e35419408daadb08677f61695c";
    #apiKey4 = "b47b29729e9644edb531ee75a3150db5";

    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            // await this.delete();

            let numRecipes = 0;

            while(numRecipes < 34) {
                await this.create(await this.#fetchRecipes(this.#apiKey1));
                numRecipes++;
            }

            numRecipes = 0;
            while(numRecipes < 34) {
                await this.create(await this.#fetchRecipes(this.#apiKey2));
                numRecipes++;
            }

            numRecipes = 0;
            while(numRecipes < 34) {
                await this.create(await this.#fetchRecipes(this.#apiKey3));
                numRecipes++;
            }
            
            numRecipes = 0;
            while(numRecipes < 30) {
                await this.create(await this.#fetchRecipes(this.#apiKey4));
                numRecipes++;
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
                for(const type of set) {
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
        if (recipeidid) {
            return await Recipes.findByPk(recipeidid);
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