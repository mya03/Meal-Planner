import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("recipes-sqlite").then((model) => {
        this.model = model;
    });
    }

    // Get all recipes
    async getAllRecipes(req, res) {
        const recipes = await this.model.read();
        res.json({ recipes });
    }

    // Clear all recipes
    async clearRecipes(req, res) {
        await this.model.delete();
        res.json(await this.model.read());
    }
}

export default new RecipesController();
