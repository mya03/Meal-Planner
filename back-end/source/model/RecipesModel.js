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
    #apiKey = "9a228f1e657f4e0eba6aadba28db9239";

    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            // await this.delete();

            let numRecipes = 0;

            while(numRecipes < 100) {
                await this.create(await this.#fetchRecipes());
                numRecipes++;
            }
        }
    }

    async create(recipe) {
        return await Recipes.create(recipe);
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

    async #fetchRecipes() {
        return new Promise((resolve, reject) => {
            this.#fetchRecipeData()
                .then((data) => {
                    this.#fetchNutritionData(data.recipes[0].id)
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

    async #fetchRecipeData() {
        try {
            const response = await fetch(this.#api + "/random?apiKey=" + this.#apiKey);
            const data = await response.json();
            console.log('Fetched a random recipe: ' + Object.keys(data.recipes[0]));
            // console.log('Fetched nutrition data ingredients: ', data.recipes[0].ingredients);
            return data;
        } catch(error) {
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

    #createRecipeEntry(data, nutrition, dataIngredients) {
        return {
            recipeid: data.id,
            title: data.title,
            description: data.summary,
            nutrients: nutrition,
            servings: data.servings,
            instruction: data.instructions,
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