import { UserRepositoryRemoteService } from "./UserRepositoryRemoteService.js";

export class RepositoryFactory {
    constructor() {
        throw new Error("Cannot instantiate a TaskRepositoryFactory object");
      }
    

    static get(repoType = "remote") {
    if (repoType === "remote") {
        return new UserRepositoryRemoteService();
    } else {
        throw new Error("Invalid repository type");
    }
    }
}