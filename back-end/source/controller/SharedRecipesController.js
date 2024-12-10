import ModelFactory from "../model/ModelFactory.js";

class SharedRecipesController {
    constructor() {
        ModelFactory.getModel("sharedRecipes").then((model) => {
            this.model = model;
        });
    }

    //get all shared recipes
    async getAllSharedRecipes(req, res) {
        try {
            const sharedRecipes = await this.model.read();
            return res.status(200).json({ sharedRecipes });
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
    }

    //share a new recipe
    async shareRecipe(req, res) {
        try {
            if (!req.body || !req.body.recipeID || !req.body.sharedBy) {
                return res.status(400).json({error: "recipeID and sharedBy are required."});
            }
            const newSharedRecipe = await this.model.create(req.body);
            return res.status(201).json(newSharedRecipe);
        } catch (error) {
            return res.status(500).json({error: "Failed to share the recipe. Please try again."});
        }
    }

    //get shared recipe by id
    async getSharedRecipeById(req, res) {
        try {
            const sharedRecipe = await this.model.read(req.params.id);
            if (!sharedRecipe) {
                return res.status(404).json({error: "Shared recipe not found."});
            }
            return res.status(200).json(sharedRecipe);
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
    }

    //update shared recipe (e.g. to edit notes or metadata)
    async updateSharedRecipe(req, res) {
        try {
            const sharedRecipe = await this.model.update(req.body);
            if (!sharedRecipe) {
                return res.status(404).json({error: "Shared recipe not found."});
            }
            return res.status(200).json(sharedRecipe);
        } catch (error) {
            return res.status(500).json({error: "Failed to update the shared recipe. Please try again."});
        }
    }

    //delete shared recipe
    async deleteSharedRecipe(req, res) {
        try {
            const deletedRecipe = await this.model.delete({ id: req.params.id });
            if (!deletedRecipe) {
                return res.status(404).json({ error: "Shared recipe not found." });
            }
            return res.status(200).json(deletedRecipe);
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete shared recipe. Please try again." });
        }
    }
}   

export default SharedRecipesController;