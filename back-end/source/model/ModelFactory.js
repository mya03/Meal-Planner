import RecipesModel from "./RecipesModel.js";
import UserModel from "./UserModel.js";

class _ModelFactory {
    async getModel(table, model = "sqlite") {

        // Recipes Model
        if(table === "Recipes") {
            if (model === "sqlite") {
                return RecipesModel;
            } else if (model === "sqlite-fresh") {
                await RecipesModel.init(true);
                return RecipesModel;
            }
        
        // User Model
        } else if (table === "User") {
            if (model === "sqlite") {
                return UserModel;
            } else if (model === "sqlite-fresh") {
                await UserModel.init(true);
                return UserModel;
            }
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;