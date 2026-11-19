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
- **Friendly error handling**: clear messages for searches with no results, network problems and when the API's daily request limit has been reached.
- **Responsive design**: works on desktop, tablet and phone. The layout, header, navigation, ingredient list and tables adapt to the screen size.
- **Accessibility basics**: labelled buttons and form fields, keyboard support (Escape closes menus and the Add recipe window) and user-supplied text is escaped before it is displayed.

## Built with

- **JavaScript** (ES modules, no framework)
- **HTML5** and **CSS3** (custom properties, Grid, Flexbox, media queries and container queries)
- **[Parcel](https://parceljs.org/)** as the bundler and dev server
- **[Spoonacular API](https://spoonacular.com/food-api)** for recipe data
- **`localStorage`** for persistence

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A free [Spoonacular API key](https://spoonacular.com/food-api)

### Setup

1. Clone the repository and open the project folder:

   ```bash
   git clone https://github.com/mihaelasamardzhieva/Recipe-Finder.git
   cd Recipe-Finder
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create your environment file by copying the example:

   ```bash
   # macOS / Linux
   cp .env.example .env

   # Windows (Command Prompt)
   copy .env.example .env
   ```

   Open the new `.env` file and replace the placeholder with your Spoonacular API key. The file should contain a single line, with no quotes and no spaces around the `=`:

   ```
   SPOONACULAR_API_KEY=your_key_here
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   Parcel will serve the app at [http://localhost:1234](http://localhost:1234).

If you change `.env` while the server is running, stop it (`Ctrl + C`) and run `npm start` again so the new value is picked up.

> **Note:** the free Spoonacular plan has a daily request limit. If searches stop returning results, you may have reached it.

### Production build

```bash
npm run build
```

The optimised files are written to the `dist/` folder.

## Deployment

The site is deployed on [Netlify](https://www.netlify.com/). The build settings live in `netlify.toml`, and the API key is stored as an environment variable named `SPOONACULAR_API_KEY` in the Netlify site settings, not in the repository.

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
├── netlify.toml          # Netlify build settings
└── package.json
```

The code follows an MVC-inspired structure: `state.js` holds the data, the modules in `views/` render it, and `main.js` connects the two and handles user actions.

## About the API key

The key is read from a `.env` file that is excluded from git, so it is never committed to the repository.

Because this is a client-side app, the key is still included in the built JavaScript and can be seen in the browser's developer tools on the live site. For a production application, the right approach is to send requests through a small backend or serverless function that keeps the key private.

## Acknowledgements

- Recipe data and images are provided by [Spoonacular](https://spoonacular.com/food-api).
- Inspired by the original [Forkify](https://forkify-mw.vercel.app/) project.

## Author

Designed and built by **Mihaela Samardzhieva** ([GitHub](https://github.com/mihaelasamardzhieva)).

## License

This project is licensed under the ISC License.
