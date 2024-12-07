import UserModel from "./UserModel.js";

class _ModelFactory {
  async getModel(model = "sqlite") {
    if (model === "sqlite") {
      return UserModel;
    } else if (model === "sqlite-fresh") {
      await UserModel.init(true);
      return UserModel;
    } 
  }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;