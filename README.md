# 🪐 [Seize The Day](https://seize-the-day.netlify.app/)

> One of the ways I manage anxiety and organize scattered thoughts is by creating lists and tracking my tasks. I built this full stack app with mindful language bring used throughout, and affirmations to greet users on the main page, so that users can organize their day, in a mindful way.

### > Old version
<img src="https://github.com/alexisintech/seize-the-day/blob/main/client/public/imgs/old-seize-the-day.gif" width="100%" />

### > New version (As of 02/11/2023)
<img src="https://github.com/alexisintech/seize-the-day/blob/main/client/public/imgs/new-seize-the-day.gif" width="100%" />

<!-- FEATURES -->
## ⭐ Features

### Welcome page
- User authentication supported using JSON Web Tokens and password encryption using Bcrypt password-hashing
- Login and signup pages built with custom form validation (will be updated to use Formik/Yup)

### Profile (Dashboard)
- Custom greeting based on username
- Randomly generated affirmations and reminders to help redirect thoughts and attitudes into positive directions 
- Dashboard widgets for tracking the time, date, and weather
  - Weather widget utilizes Open Weather API. Update location feature is currently in progress of being added.

### Explore the sidebar
#### Tasks
- All: users' tasks organized by in progress (what I will accomplish) vs. completed (what I have accomplished)
- Completed
- In Progress
#### Organize
- Lists (coming soon)
- Tags (coming soon)

<!-- BUILT WITH -->

## 🛠️ Built With

- MongoDB, Mongoose.js
- Node.js, Express.js
- JSON Web Tokens
- React.js, Material UI, Vite
- Formik/Yup
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
    JWT_SECRET = "<Any string of your choice>"
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
- [ ] User can update location on weather widget
- [ ] User can choose between celsius vs. fahrenheit on weather widget
- [ ] User hovers clock, will show analogous time
- [X] Use useReducer and Context API for passing data around components
  - [X] Add getUser to the AppContext
- [X] Light/dark mode (implemented by updating MUI theme using useContext)
- [X] A task can become a list when subtasks are added
  - For example, a task with the title "Grocery Shopping" can become a list if subtasks, such as grocery items, are added
- [ ] Organize tasks using tags, such as important or critical, or users can create custom tag names

See the [open issues](https://github.com/alexisintech/seize-the-day/issues) for a full list of proposed features (and known issues).

<!-- TEA SPILL -->

## 🌝 Tea Spill
I created this project using Vite for optimization reasons (sorry CRA...ur slow). In contrast to my previous projects using EJS for views and Passport.js for authentication, I used React Router for client-side rendering, and realized quickly that Passport.js was not so friendly with this - so I removed all of Passport.js authentication and dived into implementing auth with JSON Web Tokens. First off, React Router was super easy to set up: friendly reminder to self, use < Link to="" > instead of typical href's for routing to different pages on the app :P Next, implementing JSON Web Tokens for the first time was... interesting. Stressful. Rewriting my entire auth.js file and coding my middleware from scratch was really good practice for me to learn how JWT works. Also had to write my own "comparePassword" function because Passport.js did this logic for you, but the logic for this was pretty simple using bcrypt documentation. 
For the front end development of this project, I decided to use Material UI to streamline my design process and deliver a consistent UI. Plus, as is the reason I love React, I really nerd out over the reusability of the pre-made components. Learning MUI's V5 structure such as Themes with the ThemeProvider, and custom styling the components, was a bit difficult at first - luckily, MUI has great documentation. I also got more practice using Grid and I definitely want to continue and improve on using it because it's an incredibly powerful and customizable layout system.
In a separate branch, I'm currently working on restructuring my code to use useReducer and the Context API. The way my project currently is, the Profile.jsx page is too cluttered with elements that can become components. And the data that is being fetched in the Profile.jsx *page* needs to be accessible by other components, which is the reason I'd like to use Context. I want my Fetch calls to be in a utils folder, and overall, want more readable, maintanable, organized, and dry code (which is why I'm choosing Context instead of prop drilling). Instead of trying to integrate these tools into my preexisting code, I'm realizing it might be easier for my learning if I rebuilt the front end from scratch using them.

02/11/2023: I have finally implemented the Context API!! I used useContext and useMemo for updating the mode between light and dark and therefore, the corresponding MUI theme. I used useContext and useReducer to handle API calls and updating the user's global state for their tasks. This allowed me to entirely restructure my app. I decided to redesign the entire app as well while I was at it, giving it a more clean, sophisticated, and modern UI. I created a simple, but interesting dashboard for users so that data is not the first thing they encounter - it's supposed to be a mental health forward version of a to-do app. I also played around with Formik+Yup for the "Create New Task" component; I plan to implement them for the login and signup forms as well. It was INCREDIBLY frustrating to learn how to use the context API and useReducer... how many console.log's were there? The limit does not exist. HOWEVER! I have learned SO much, and it is very rewarding to have the application finally functional and looking so much better than the last deployment.

04/10/2023: I implemented the Subtasks feature! When users are creating a new task, they have the option to add "subtasks". For example, the task's title could be "Grocery List" and the subtasks could be "apples", "oranges", etc. The challenge of this feature was figuring out how to do this using Formik, because Formik has a lot of form control and does a lot of the form's functionality behind the scenes. Through Formik documentation and a single youtube video that I found, I learned that I would need to use Formik's FieldArray component, map over the array of values, and render a Field component for each. Another challenge was that I used TextField components from Material UI so that I could have uniform styling across input elements. I already successfully integrated Formik's functionality with MUI's TextField component, but I couldn't use a TextField here because the FieldArray component required the Field component to be its child. Through research, I found that the Field component accepts an "as'' property, allowing the Field to be compiled as any component you need. In my case, I needed the Field to be "as: {TextField}", so that it would inherit the styling from an MUI TextField component. After getting the submission to be successful, I built its addition into the Task and Tasks components with conditional logic. The next challenge would be adding a subtasks’ update functionality: when a user clicks on a subtask, toggle its completion. This was actually simple because it was the same logic as completing an entire task. I added its ACTION to the appReducer, its fetch call to the utils file, and all of the necessary code to my API: a new route, a new controller, and an updated model. From there, I just needed to add an onClick event to each subtask for calling the fetch function and dispatching the result to the appContext.
