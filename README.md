# Recipe Finder (Forkify)

A modern JavaScript application for discovering recipes, planning meals, and creating shopping lists.

Search for a recipe by ingredient, check its nutrition, save your favourites, plan your week and turn any recipe into a shopping list, all in one place and without creating an account.

## Features

- **Recipe search**: search by ingredient (or dish name) and browse up to 50 results, paginated 10 per page.
- **Recipe details**: photo, cooking time, servings, nutrition data (calories, carbs, protein, fat, fiber), the full ingredient list, and a link to the complete instructions on the original website.
- **Bookmarks**: save recipes you like and reopen them at any time.
- **My Recipes**: add your own recipes through a form and keep them in a personal collection.
- **Weekly meal planner**: assign a recipe to breakfast, lunch or dinner for any day of the week.
- **Shopping list**: add an ingredient from any recipe with one click. Identical items (same name and unit) are merged and their amounts added together. You can also add custom items, edit them, tick them off, delete them and clear everything you have completed.
- **Saved in your browser**: bookmarks, your own recipes, the meal planner and the shopping list are stored in `localStorage`, so they are still there when you come back.
- **Responsive design**: works on desktop, tablet and phone. The layout, header, navigation, ingredient list and tables adapt to the screen size.

## Built with

- **JavaScript** (ES modules, no framework)
- **HTML5** and **CSS3** (custom properties, Grid, Flexbox, media queries and container queries)
- **[Parcel](https://parceljs.org/)** as the bundler and dev server
- **[Spoonacular API](https://spoonacular.com/food-api)** for recipe data
- **`localStorage`** for persistence

## Project structure

```
Recipe-Finder/
├── index.html
├── css/
│   ├── base.css          # variables, reset, typography
│   ├── layout.css        # page layout (header, main grid, footer)
│   ├── components.css    # buttons, cards, forms, tables, modal
│   ├── responsive.css    # tablet and mobile adjustments
│   └── style.css         # imports the stylesheets above
├── img/                  # logo and icons
├── js/
│   ├── main.js           # controller: connects user actions, state and views
│   ├── state.js          # application state and the logic that changes it
│   ├── api.js            # Spoonacular requests and data formatting
│   ├── config.js         # API settings
│   ├── localStorage.js   # saving and loading persisted data
│   └── views/            # one module per part of the interface
├── .env.example          # template for your API key
└── package.json
```

The code follows an MVC-inspired structure: `state.js` holds the data, the modules in `views/` render it, and `main.js` connects the two and handles user actions.

## Acknowledgements

- Recipe data and images are provided by [Spoonacular](https://spoonacular.com/food-api).
- Inspired by the original [Forkify](https://forkify-mw.vercel.app/) project.

## Author

Designed and built by **Mihaela Samardzhieva** ([GitHub](https://github.com/mihaelasamardzhieva)).
