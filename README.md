# Think Deep - An interactive puzzle game to test soft skills

## Site Live Link : https://puzzle-game-thinkdeep.netlify.app/

### Soft skills assessed by the puzzle

-   Tests your picture analyzing skills
-   Tests your observation skills towards minute details
-   Needs general knowledge and knowledge on current affairs to solve the puzzle - Tests user awareness in the society
-   User is given some hints which he/she needs to analyze them before time is up - Tests time management skills

## How to solve puzzle?

1. User is given chunks of images which he/she needs to arrange properly to guess the word

  <img src="https://raw.githubusercontent.com/partheev/puzzle-game-web/master/frontend/public/images/image-chunks-preview.png" width="250" title="Puzzle Preview">

2. Puzzle has total 6 levels. 2 - Easy, 3 - Medium, 1 - Hard. Each level has different scores based on the difficulty.
3. User can take provided hints to solve the puzzle. Unlocking each hint reduces his/her points for that level.
4. Every level has time limit and limited attempts to guess the word.
5. If all given attempts used or time is up, then it is considered as fail for that particular level
6. Losing in two consecutive levels leads to GAME OVER.
7. Based on the user scores it's consider as PASS or FAIL for that attempt.

## Featuers

-   Registration and login using email and password
-   Users dashboard to analyze his/her past attempts results ( data shown using tables and charts)
-   Resume puzzle incase something unexpected happen and browser closes
-   User is asked whether to start new game or resume the previous one
-   Puzzle instructions are shown before and during the puzzle game
-   Drog and drop feature to arrange images for the puzzle
-   Leadership board and puzzle results are shown at the end of puzzle game
-   Time limit and limited attempts features implemented
-   Soft skills score is calculated by considering below factors
    -   Time taken to solve
    -   How many hints used
    -   Level points

### Admin Features

-   Admin can analyze the users performance using the charts and provided data
-   Provides platform usage data like how many users registered and how many attempted the puzzle
-   Bar charts used to show avg. time spent and avg. score of all users for each level

## Step up project

> _Node.js runtime required to run below commands_ [Click here to download](https://nodejs.org/en/download)

Project is divided into Frontend and Backend. You need to run individually.

Clone the repo and run commands in the root directory.

### Run Frontend

1. `cd frontend`
2. `npm install` - To install dependencies
3. `npm run dev` - To start frontend app in development mode
    > configure VITE_BACKEND_URL in .env file

### Run Backend

1. `cd backend` - Run the command from the root dir
2. `npm install` - To install dependencies
3. `npm run start` - To start the server
    > configure PORT,MONGO_DB_URL,JWT_KEY in the .env file

## Run Tests

Unit tests are written for some functions and apis.

Run backend tests using `npm run test` command in the backend dir

Run frontend tests using `npm run test` command in the frontend dir

## Used Languages and Frameworks

### Frontend

1. Frontend developed using React and Typescript
2. Redux used for global state management
3. Frontend app deployed in [Netlify](https://www.netlify.com/)

### Backend

1. Backend application developed using Nodejs, Javascript and Express.js backend framework
2. MongoDB database used.
3. Database schemas are implemented using Mongoose (ORM tool for mongodb)
4. Deployed at [Render](https://render.com/)
