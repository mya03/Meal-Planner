import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("recipes-sqlite-fresh").then((model) => {
        this.model = model;
    });
    }

    // Get all tasks
    async getAllRecipes(req, res) {
        const recipes = await this.model.read();
        res.json({ recipes });
    }
}

export default new RecipesController();
