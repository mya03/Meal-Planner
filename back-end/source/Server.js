// Server.js
import express from "express";
import RecipesRoutes from "./routes/RecipesRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static("../front-end/src"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));
  }

  // Setup routes by using imported RecipesRoutes
  setupRoutes() {
    this.app.use("/v1", RecipesRoutes); // Mount RecipesRoutes on the app
    this.app.use("/v1", UserRoutes); // Mount UserRoutes on the app
  }

  // Start the server on a specified port
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();
