export class SharedRecipeService {
    static async fetchSharedRecipes() {
        const response = await fetch('/sharedrecipes');
        return response.json(); //returns an array of shared recipes
    }

    static async shareRecipe(data) {
        const response = await fetch('/sharedrecipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json(); //returns the newly shared recipe
    }

    static async updateSharedRecipe(id, data) {
        const response = await fetch(`/sharedrecipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json(); // Returns the updated recipe
      }
    
    static async deleteSharedRecipe(id) {
            const response = await fetch(`/sharedrecipes/${id}`, {
            method: 'DELETE',
        });
        return response.json(); // Returns confirmation of deletion
    }
}