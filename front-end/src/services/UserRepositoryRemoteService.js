import Service from "./Service.js";

export class UserRepositoryRemoteService extends Service {
    constructor() {
        super();
        this.#initUsers();
    }
    
    addSubscriptions() {
        this.subscribe("storeUser", (data) => {
            this.storeUser(data);
        });

    }

    async #initUsers() {
        const res = await fetch('v1/users');

        if(!res.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await res.json();

        data.users.forEach(async(user) => {
            this.publish("showUserInfo", user.username)
        })
    }

    async storeUser(userData) {
        const res = await fetch('v1/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!res.ok) {
            throw new Error("Failed to store task");
          }
      
        const data = await res.json();
        return data;
    }
}