# Think Deep - An interactive puzzle game to test soft skills

## Screenshots

#### Home
![home](https://github.com/partheev/puzzle-game-web/assets/30794881/91049884-9536-4afa-a1cf-724f88c242ac)

#### Puzzle
![test](https://github.com/partheev/puzzle-game-web/assets/30794881/5880c8a9-5c45-4d97-932a-47f4cd5b92ce)

#### Analytics
![admin1](https://github.com/partheev/puzzle-game-web/assets/30794881/adbd0cf4-14c1-415b-a694-950c148650d2)

#### Analytics (Leadership board)
![admin2](https://github.com/partheev/puzzle-game-web/assets/30794881/1f8d6ec7-d9cd-4673-a574-d25d480a922e)

### Soft skills assessed by the puzzle

-   Tests your picture-analyzing skills
-   Tests your observation skills toward minute details
-   Needs general knowledge and knowledge on current affairs to solve the puzzle - Tests user awareness in the society
-   User is given some hints which he/she needs to analyze before time is up - Tests time management skills

## How to solve the puzzle?

1. User is given chunks of images which he/she needs to arrange properly to guess the word

  <img src="https://github.com/partheev/puzzle-game-web/assets/30794881/439c4ce0-4f44-4172-99cb-c8132cb3427a" width="250" title="Puzzle Preview">

2. Puzzle has a total of 6 levels. 2 - Easy, 3 - Medium, 1 - Hard. Each level has different scores based on the difficulty.
3. User can take provided hints to solve the puzzle. Unlocking each hint reduces his/her points for that level.
4. Every level has a time limit and limited attempts to guess the word.
5. If all given attempts are used or time is up, then it is considered a fail for that particular level
6. Losing in two consecutive levels leads to a GAME OVER.
7. Based on the user scores it's considered as PASS or FAIL for that attempt.

## Featuers

-   Registration and log in using email and password
-   User's dashboard to analyze his/her past attempts results ( data shown using tables and charts)
-   Resume puzzle in case something unexpected happens and the browser closes
-   The user is asked whether to start a new game or resume the previous one
-   Puzzle instructions are shown before and during the puzzle game
-   Drag and drop feature to arrange images for the puzzle
-   Leadership board and puzzle results are shown at the end of the puzzle game
-   Time limit and limited attempts features implemented
-   Soft skills score is calculated by considering below factors
    -   Time taken to solve
    -   How many hints used
    -   Level points

### Admin Features

-   Admin can analyze the user's performance using the charts and provided data
-   Provides platform usage data like how many users registered and how many attempted the puzzle
-   Bar charts used to show avg. time spent and avg. score of all users for each level

## Step up project

> _Node.js runtime required to run below commands_ [Click here to download](https://nodejs.org/en/download)

The project is divided into Frontend and Backend. You need to run individually.

Clone the repo and run commands in the root directory.

### Run Frontend

1. `cd frontend`
2. `npm install` - To install dependencies
3. `npm run dev` - To start the frontend app in development mode
    > Configure VITE_BACKEND_URL in the .env file

### Run Backend

1. `cd backend` - Run the command from the root dir
2. `npm install` - To install dependencies
3. `npm run start` - To start the server
    > configure PORT,MONGO_DB_URL,JWT_KEY in the .env file

## Run Tests

Unit tests are written for some functions and APIs.

Run backend tests using the `npm run test` command in the backend dir

Run frontend tests using the `npm run test` command in the frontend dir

## Used Languages and Frameworks

### Frontend

1. Frontend developed using React and Typescript
2. Redux used for global state management
3. Frontend app deployed in [Netlify](https://www.netlify.com/)

### Backend

1. Backend application developed using Nodejs, Javascript, and Express.js backend framework
2. MongoDB database used.
3. Database schemas are implemented using Mongoose (ORM tool for Mongodb)
4. Deployed at [Render](https://render.com/)


