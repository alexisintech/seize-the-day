# 🪐 [Seize The Day](https://seize-the-day.netlify.app/)

> A to-do app with your mental health in mind. 

<img src="https://github.com/alexisintech/seize-the-day/blob/main/client/public/imgs/seize-the-day.gif" width="100%" />

<!-- FEATURES -->
## ⭐ Features

### Welcome page
- User authentication supported using JSON Web Tokens and password encryption using Bcrypt password-hashing

### Home page
- Custom greeting based on username
- Randomly generated affirmations and reminders to help redirect thoughts and attitudes into positive directions 
- Create items to add to your to-do list
- Click on an item to mark it complete and it will move to your accomplishment list
- Click on the 'X' to delete items

<!-- BUILT WITH -->

## 🛠️ Built With

- MongoDB, Mongoose.js
- Node.js, Express.js
- JSON Web Tokens
- React.js, Material UI, Vite
- HTML5/CSS3, Javascript ES6
- ESbuild, ESlint, Stylelint
- VSCode
- Backend hosted on Railway
- Frontend hosted on Netlify

<!-- GET YOUR OWN COPY -->

## 🚀 Get your own copy running!
### Backend
In one terminal:
1. Change the directory to the config folder and create a new file 
    ```sh 
    cd api/config
    touch .env
    ```
2. Create .env variables PORT and DB_STRING
    ```sh
    PORT = 2222 // port 2222 is used as the api_base in App.js on the client side
    DB_STRING = "<Replace everything in quotes with MongoDB Connection String>"
    ```
3. Navigate back to the api
    ```sh
    cd ..
    ```
4. Install packages and dependencies
    ```sh
    npm i
    ```
 
*The server will be running on localhost:2222*

### Frontend
In a second terminal:
1. Navigate to the client folder
    ```sh
    cd client
    ```
2. Install packages and dependencies
    ```sh
    npm i
    ```
 
### Start the app
Concurrently is a package that allows you run multiple commands in a single terminal <br />
To run the application in a development server,
1. Navigate to the client folder
2. In the client folder, the package.json should have a "script" that looks like this:
    ```sh
    "api": "cd ../api && npm start",
    ```
3. While still in the client folder, run the application using this command:
    ```sh
    concurrently "npm:api" "npm:dev"
    ```

*The client side application will render on localhost:4444* <br />
*The page will reload if you make edits.*<br />

<!-- ROADMAP -->

## 🌠 Roadmap

- [X] Mobile-first design; responsiveness using CSS Flexbox and Grid (but needs to be redesigned for an improved UI/UX)
- [X] Utilize Material UI for consistent, reusable components
- [ ] A task can become a list when subtasks are added
  - For example, a task with the title "Grocery Shopping" can become a list if subtasks, such as grocery items, are added
- [ ] Organize tasks using tags, such as important or critical, or users can create custom tag names

See the [open issues](https://github.com/alexisintech/seize-the-day/issues) for a full list of proposed features (and known issues).

<!-- TEA SPILL -->

## 🌝 Tea Spill
I created this project using Vite for optimization reasons (sorry CRA...ur slow). In contrast to my previous projects using EJS for views and Passport.js for authentication, I used React Router for client-side rendering, and realized quickly that Passport.js was not so friendly with this - so I removed all of Passport.js authentication and dived into implementing auth with JSON Web Tokens. First off, React Router was super easy to set up: friendly reminder to self, use <Link to=""> instead of typical href's for routing to different pages on the app :P Next, implementing JSON Web Tokens for the first time was... interesting. Stressful. Rewriting my entire auth.js file and coding my middleware from scratch was really good practice for me to learn how JWT works. Also had to write my own "comparePassword" function because Passport.js did this logic for you, but the logic for this was pretty simple using bcrypt documentation. 
For the front end development of this project, I decided to use Material UI to streamline my design process and deliver a consistent UI. Plus, as is the reason I love React, I really nerd out over the reusability of the pre-made components. Learning MUI's V5 structure such as Themes with the ThemeProvider, and custom styling the components, was a bit difficult at first - luckily, MUI has great documentation. I also got more practice using Grid and I definitely want to continue and improve on using it because it's an incredibly powerful and customizable layout system.
In a separate branch, I'm currently working on restructuring my code to use useReducer and the Context API. The way my project currently is, the Profile.jsx page is too cluttered with elements that can become components. And the data that is being fetched in the Profile.jsx *page* needs to be accessible by other components, which is the reason I'd like to use Context. I want my Fetch calls to be in a utils folder, and overall, want more readable, maintanable, organized, and dry code (which is why I'm choosing Context instead of prop drilling). Instead of trying to integrate these tools into my preexisting code, I'm realizing it might be easier for my learning if I rebuilt the front end from scratch using them.
