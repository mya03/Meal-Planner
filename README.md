# Meal-Planner

## Overview
Having all the ingredients but don't know what to cook? Tired to think about what will you cook today? Our web app **Meally** is here to help you explore a world of culinary delights, perfectly tailored to your preference. From comfort food to healthy meals, we've got you covered. **Meally** also plan your meals based on your calculated TDEE and dietary goals, whether you're aiming to lose weight, maintain your weight, or gain weight. You can also share your culinary creations with the Meally community, inspiring others with your recipes.

## Installation
1. Clone the repository
2. To get the web app started, run on your terminal: 
- npm run build
- npm run start
3. Go to http://localhost:3000 to check out the app

## Features

### Home page
On the home page, you can see 3 trending recipes. By clicking on any of the recipes, you can view the full details of the recipe, including: nutritions, ingredients, and step-by-step cooking instructions. Additionally, The 'Discover Recipes' button on the home page will take you to the search recipes page, where you can explore more recipes based on your ingredients.

### Recipes page
On the recipes page, you can search for recipes based on ingredients you have on hand. When searching for recipes: 
- Enter your ingredients in the search bar (multiple ingredients have to be separeated by a comma)
- Click the 'Find' button to display recipes
Using the filter:
- Select your desired filter and enter your ingredients **before** clicking the find button (Note: filter must be applied before searching, otherwise they won't work if applied after recipes are displayed). Then, clicking on the recipes cards will take you to view their full details

### Meal Planner page
On the meal planner page, you can input your weight, height, age, etc. and our app will calculate your TDEE. Then depending on your dietary goal (lose, maintain, or gain weight), clicking on one of the goal will take you to the meal suggestion page, where meals are suggested based on their calories needs. Exploring meal suggestions:
- Click on the image of the recipe to see the full details
- To see the entire suggestions for 3 meals (breakfast, lunch, dinner), swipe right and you will see the recipe suggestion for the next meal of the day

### Profile page
The profile page will only be availble after you've sign up or log in to the app. On the page, you can view 9 recipes suggested based on what we think you might like. For future updates, the app could suggest recipes based on the ingredients that you searched for most often.

### Share Recipes page
On this page, you can unleash your creativity and share your own creations with the Meally community! To share your recipe, enter the name of your recipe, along with all the ingredients needed and step-by-step instructions for preparing the dish. You can also upload an image of your amazing creation to go along with the recipe. All the recipes shared to the community will be displayed on this page. 

### Log In page
Join the Meally community by logging in or signing up! Enter your username and password, then click either log in button (if you already have an account) or sign up button (if you don't have an account yet). 