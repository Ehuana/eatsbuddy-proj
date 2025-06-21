# Food Planner Application

A Vue.js application for recipe discovery, meal planning, and grocery list management with Firebase backend integration.

## Features

- **Recipe Finder**: Search thousands of recipes from Spoonacular API
- **Grocery List Manager**: Create, edit, and manage grocery lists
- **Meal Planner**: Plan meals for the week and generate grocery lists
- **User Authentication**: Register and login to save your data
- **Favorites**: Save your favorite recipes for quick access

## Tech Stack

- **Frontend**: Vue.js 3
- **Backend**: Firebase (Firestore + Authentication)
- **Recipe Data**: Spoonacular API
- **UI Framework**: Bootstrap 5
- **Animations**: AOS (Animate on Scroll)
- **Icons**: Font Awesome & Remixicon

## Prerequisites

- Node.js v14+ and npm
- Firebase account
- Spoonacular API key (free tier: 150 requests/day)

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```
   
   Or use the provided batch file (Windows only):
   ```
   install-and-run.bat
   ```

3. **Firebase Configuration**
   Update the Firebase config in `src/firebase/config.js` with your credentials.

4. **Spoonacular API**
   Update the API key in `src/services/spoonacular.js`.

5. **Run the app**
   ```
   npm run serve
   ```

6. **Build for production**
   ```
   npm run build
   ```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying to Digital Ocean App Platform.

## Project Structure

```
src/
  ├── assets/           # Images, styles, etc.
  ├── components/       # Vue components
  │   ├── recipes/      # Recipe related components
  │   └── ...
  ├── composables/      # Vue 3 composables 
  ├── firebase/         # Firebase configuration
  ├── router/           # Vue Router configuration
  ├── services/         # API services
  └── views/            # Page components
```

## Firebase Collections

- **users**: User profiles
- **recipes**: Saved favorite recipes
- **grocery_lists**: User grocery lists
- **meal_plans**: User meal plans
