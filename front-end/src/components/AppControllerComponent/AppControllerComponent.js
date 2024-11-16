export class AppControllerComponent{
    #container = null;

    constructor() {
        this.#createContainer();
    }

    render() {
        return this.#container;
    }

    // Creates the main container element
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }
}