import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

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
        this.#attachEventListeners();
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

    //log in and sign up form
    #createLogInForm(){
        this.#LogInForm = document.createElement('div');
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
          <button id="loginBtn">Log In</button>
          <button id="signupBtn">Sign Up</button>
        </div>
      `;

      return this.#LogInForm;
    }

    #attachEventListeners(){
      const userNameField = this.#LogInForm.querySelector('#userNameField');
      const passwordField = this.#LogInForm.querySelector('#passwordField');
      const loginBtn = this.#LogInForm.querySelector('#loginBtn');
      const signupBtn = this.#LogInForm.querySelector('#signupBtn');

      //add event listeners to log in and sign up buttons
      loginBtn.addEventListener("click", ()=>this.#handleLogIn(userNameField,passwordField));
      signupBtn.addEventListener("click", ()=>this.#handleSignUp(userNameField,passwordField));

      const hub = EventHub.getInstance();
      hub.subscribe('LogInSuccess', () =>this.#handleLoginSuccess());
      hub.subscribe('FailedLogIn', ()=>this.#handleFailedLogIn());
      hub.subscribe('FailedSignUp', ()=>this.#handleFailedSignUp());
    }

    #handleLogIn(userNameField,passwordField){
      const username = userNameField.value;
      const password = passwordField.value;

      const user = {username, password};

      const hub = EventHub.getInstance();
      hub.publish('LogInUser', user); //pass user input to service
      userNameField.value = '';
      passwordField.value = '';
    }

    #handleSignUp(userNameField,passwordField){
      const username = userNameField.value;
      const password = passwordField.value;

      const user = {username, password};
      const hub = EventHub.getInstance();
      hub.publish('SignUpUser', user); //pass user input to service
      userNameField.value = '';
      passwordField.value = '';
    }

    #handleLoginSuccess(){
      const hub = EventHub.getInstance();
      hub.publish('navigateToHome', null); //navigate to home page

      //clear container once logged in
      this.#container.innerHTML = '';
      this.#container.innerHTML = `<h1>You're logged in</h1>`
    }

    //user feedback authentication error
    #handleFailedLogIn(){
      alert("Failed to log in. Can't find user or invalid credentials. Please sign up or try again later.");
    }
    
    //user feedback username already exists
    #handleFailedSignUp(){
      alert("Failed to sign up. Username already exists. Please log in or try another username.");
    }

}