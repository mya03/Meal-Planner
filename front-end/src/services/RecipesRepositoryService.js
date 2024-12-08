import { Events } from '../eventhub/Events.js';
import { EventHub } from '../eventhub/EventHub.js';
import Service from './Service.js';

export class RecipesRepositoryService extends Service {
  constructor(){
    super();
  }

  addSubscriptions(){
    this.subscribe('LogInUser', async (data) => {
      await this.login(data);
    });

    this.subscribe('SignUpUser', async (data) => {
      await this.signup(data);
    });
  }

  async login(user){
    try{
      const response = await fetch("/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      
      const hub = EventHub.getInstance();
      hub.publish('LogInSuccess', data.username);
      return data;
    }catch(error){
      console.error("failed log in:", error);
    }
    
  }

  async signup(user){
    try{
      const response = await fetch("/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      const data = await response.json();
      console.log("sign up success");
      const hub = EventHub.getInstance();
      hub.publish('LogInSuccess', data.username);
      return data;
    }catch(error){
      console.error("failed sign up:", error);
    }
  }
}
  