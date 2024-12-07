import RecipesModel from "./RecipesModel.js";

class _ModelFactory {
    async getModel(model) {
        if (model === "recipes-sqlite") {
            return RecipesModel;
        } else if (model === "recipes-sqlite-fresh") {
            await RecipesModel.init(true);
            return RecipesModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;