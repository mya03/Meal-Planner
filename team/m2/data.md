# Application Data

## Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including physical attributes, activity level, and dietary preferences, which are necessary for generating personalized meal plans.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `email` (string): The user's email address.
  - `password_hash` (string): A hashed version of the user's password.
  - `age` (integer): The user's age.
  - `weight` (float): The user's current weight.
  - `height` (float): The user's height.
  - `gender` (string): The user's gender.
  - `activity_level` (string): The user's physical activity level (e.g., sedentary, moderate, active).
  - `dietary_goal` (string): The user's dietary goal (e.g., maintain weight, lose weight, gain weight).
  - `preferences` (JSON): User's dietary preferences or restrictions (e.g., vegetarian, gluten-free).
  - `created_at` (timestamp): The date and time the account was created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
- **Data Source**: User-input data during registration or profile updates.

### 2. TDEE Data

- **Description**: Contains data calculated to determine the Total Daily Energy Expenditure (TDEE) for users based on their physical attributes and activity level.
- **Attributes**:
  - `tdee_id` (string): A unique identifier for each TDEE record.
  - `user_id` (string): A reference to the user's unique identifier.
  - `weight` (float): The user's weight at the time of calculation.
  - `height` (float): The user's height.
  - `age` (integer): The user's age.
  - `activity_level` (string): The user's selected activity level.
  - `tdee_value` (float): The calculated TDEE value in calories.
  - `caloric_adjustment` (float): Adjusted caloric intake based on the user's dietary goal.
  - `calculation_timestamp` (timestamp): The time the TDEE was calculated.
- **Data Source**: System-generated based on user-input data.

### 3. Meal Plan Data

- **Description**: Contains information related to the meal plans generated for users based on their TDEE and dietary goals.
- **Attributes**:
  - `meal_plan_id` (string): A unique identifier for each meal plan.
  - `user_id` (string): A reference to the user's unique identifier.
  - `goal` (string): The user's dietary goal (e.g., maintain weight, lose weight, gain weight).
  - `duration` (integer): The length of the meal plan in days.
  - `meals` (JSON): An array of meals, including recipes and meal type (e.g., breakfast, lunch).
  - `total_calories` (float): The total caloric value of the meal plan.
  - `created_at` (timestamp): The date the meal plan was generated.
  - `updated_at` (timestamp): The last time the meal plan was updated.
- **Data Source**: System-generated based on user preferences.

### 4. Recipe Data

- **Description**: Contains recipes suggested by the app or contributed by users.
- **Attributes**:
  - `recipe_id` (string): A unique identifier for each recipe.
  - `user_id` (string): A reference to the user who contributed the recipe (for user-generated content).
  - `name` (string): The name of the recipe.
  - `ingredients` (JSON): A list of ingredients and their quantities.
  - `instructions` (text): Instructions for preparing the recipe.
  - `calories` (float): The total calorie count for the recipe.
  - `macronutrients` (JSON): A breakdown of macronutrients (carbs, proteins, fats).
  - `vitamins` (JSON): Vitamin information for the recipe.
  - `created_at` (timestamp): The date the recipe was added.
  - `updated_at` (timestamp): The date the recipe was last updated.
- **Data Source**: User-input and system-generated data.

### 5. Ingredient Data

- **Description**: Tracks ingredients that users input to generate recipe suggestions.
- **Attributes**:
  - `ingredient_id` (string): A unique identifier for each ingredient entry.
  - `name` (string): The name of the ingredient.
  - `amount` (float): The quantity of the ingredient.
  - `user_id` (string): A reference to the user's unique identifier.
  - `input_timestamp` (timestamp): The date and time the ingredient was entered.
- **Data Source**: User-input data.

### 6. Community Recipe Data

- **Description**: Contains recipes shared by users within the app’s community.
- **Attributes**:
  - `community_recipe_id` (string): A unique identifier for each shared recipe.
  - `user_id` (string): A reference to the user who shared the recipe.
  - `name` (string): The name of the recipe.
  - `ingredients` (JSON): A list of ingredients and their quantities.
  - `instructions` (text): Cooking instructions for the recipe.
  - `likes` (integer): The number of likes received from other users.
  - `comments` (JSON): A list of comments made by other users.
  - `created_at` (timestamp): The date the recipe was shared.
  - `updated_at` (timestamp): The date the recipe was last updated.
- **Data Source**: User-generated content.

---

## Data Relationships

- **User Profile to TDEE Data**: One-to-one relationship, where each user profile is associated with a TDEE record.
- **User Profile to Meal Plan Data**: One-to-many relationship, where each user can have multiple meal plans.
- **User Profile to Recipe Data**: One-to-many relationship, where users can create or save multiple recipes.
- **Meal Plan Data to Recipe Data**: Many-to-many relationship, where meal plans include multiple recipes.
- **User Profile to Community Recipe Data**: One-to-many relationship, where each user can share multiple community recipes.

---

## Data Sources

- **User-Input Data**: Users manually enter their personal information, dietary goals, preferences, and ingredients.
- **System-Generated Data**: The system calculates TDEE, generates meal plans, and provides recipe suggestions based on user input.
- **Community-Generated Data**: Users contribute recipes and engage with the community through likes and comments.

---
