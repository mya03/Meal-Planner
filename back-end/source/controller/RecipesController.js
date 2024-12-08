import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("recipes-sqlite").then((model) => {
        this.model = model;
    });
    }

    // Get all recipes
    async getAllRecipes(req, res) {
        try {
            const recipes = await this.model.read();
            return res.status(200).json({ recipes });
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
    }

    // Clear all recipes
    async clearRecipes(req, res) {
        await this.model.delete();
        res.json(await this.model.read());
    }

    // Get a random recipe in the database
    async getRandomRecipe(req, res) {
        try {
            const ids = new Set();
            while(ids.size < 3) {
                ids.add(await this.model.getRandom());
            }
            console.log(ids);
            const recipes = [];
            for(const id of ids) {
                recipes.push(await this.model.read(id));
            }
            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
    }
}

export default new RecipesController();
