import RecipesModel from "./RecipesModel.js";

class _ModelFactory {
    async getModel(model = "sqlite") {
        if (model === "sqlite") {
            return RecipesModel;
        } else if (model === "sqlite-fresh") {
            await RecipesModel.init(true);
            return RecipesModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;