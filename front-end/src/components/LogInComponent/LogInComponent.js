import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class LogInComponent extends BaseComponent{
    #container = null
    #LogInForm = null;

    constructor(){
        super();
        this.loadCSS('LogInComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        //this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('div');;
        this.#container.classList.add("log-in-containter");

        //header
        this.#container.innerHTML = `
          <img src="https://shapeyourfutureok.com/wp-content/uploads/2018/10/25698-TSET-19-04-SYF-Website-Refresh_Header_5FoodGroups_F.jpg">
        `;
        this.#container.appendChild(this.#createHeader());

        //login/signup form 
        this.#container.appendChild(this.#createLogInForm());

    }

    #createHeader(){
        const header = document.createElement('div');
        header.classList.add("log-in-header");
        header.innerHTML = `<h1>Log In | Sign Up</h1>`;
        return header;
    }

    #createLogInForm(){
        this.#LogInForm = document.createElement('form');
        this.#LogInForm.classList.add("log-in-form");
        this.#LogInForm.innerHTML = `
        <div class="usernameDiv">
          <label for="userNameField">Username:</label>
          <input type="text" id="userNameField" placeholder="Enter your username" required>
        </div>
        <div class="passwordDiv">
          <label for="passwordField">Password:</label>
          <input type="password" id="passwordField" placeholder="Enter your password" required>
        </div>
        <div>
          <button type="submit">Log In</button>
          <button type="submit">Sign Up</button>
        </div>
      `;

      return this.#LogInForm;
    }

    

}