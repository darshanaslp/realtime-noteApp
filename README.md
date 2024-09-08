#  Real Time Manager App

This repository contain fullstack app for the Note manager app


## Project structure

	  ├── frontend      # frontend api's folder
    ├── backend       # backend api's folder
    ├── Readme.md     # Readme File

#  React Frontend
-public

-src

 --component
  ---auth
  ---note

 --redux
  ---action
  ---reducer
  ---store
 
 --service
  ---noteService
  ---authService
  ---socket
 
 --pages
  ---header
  ---footer
  ---sidebar
  ---layout

  -app

  -test
  
  -index


## Tech used

- React
- Redux
- Socket Io Client
- React-strap (Bootstrap) CSS framework for styling
- Eslint
- Jest

## How to run locally

Clone or download project go to the Front-end
Inside Front-end open node console

Then type  `npm install`
 Run `npm start` if you have node installed locally.
 
Open your browse to `localhost:3000`



#  Node Back-end

## Project structure

-node_module

 --config	

 --controller
 
 --model
 
 --route

 --middleware

 --sockets
 
  -app
  
  -index


## Tech used

- Node Express
- Mongo DB
- Socket Io


## How to run locally

Clone or download project go to the Back-end
Inside Back-end open node console
Then type  `npm install`
 Run `npm start` if you have node installed locally.
App gonna be run `localhost:5000`

### MongoDB credential

Inside config -> db.js edit this regarding to mqsal database information 
.env file has all the varibale need to change

## Rest api structure

### Auth api

Methods | Urls | Action	
--- | --- | ---
**POST** | `/api/auth/login`    |  login  user 
**POST** | `/api/auth/register` |  Register User 
**POST** | `/api/auth/toker`    |  Refesh Token
**PUT** | `/api/users/:id` | Edit Employee 
**DELETE** | `/api/users/:id` |  delete Employee 


{
    "_id": "66d75a123922c5b3e25478fd",

    "username": "testuser",

    "email": "testuser@example.com",

    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDc1YTEyMzkyMmM1YjNlMjU0NzhmZCIsImlhdCI6MTcyNTgzMjIzNywiZXhwIjoxNzI1ODM1ODM3fQ.3bnb6GwcuZHqSsK2ATNC78qOjvVSciY1tVfYWb5KZJI",

    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDc1YTEyMzkyMmM1YjNlMjU0NzhmZCIsImlhdCI6MTcyNTgzMjIzNywiZXhwIjoxNzI2NDM3MDM3fQ.36qQNiJfkJZIPuPydPLAamiO1N9YjvEdrEAOcrNG9SI"
}


### Note api

Methods | Urls | Action	
--- | --- | ---
**GET**    | `api/notes`                |  List Available  notes
**GET**    | `api/notes/:noteId`        |  Get Single notes
**POST**   | `api/notes`                |  Create Note
**PUT**    | `api/notes/:noteId`        |  Update Note
**DELETE** | `api/notes `               |  Delete Note
**GET**    | `api/notes/:noteId/shared` |  Get shared note for user
**GET**    | `api/notes/user/:id`       |  Get note for that user 


{
    "_id": "66d75e02b0c9b01783efc1b5",

    "title": "2 Note",

    "content": "hi how are you today",

    "user": "66d75a123922c5b3e25478fd",

    "sharedWith": [
        "66d75a353922c5b3e2547900",
        "66dae61083db797c014be9d5"
    ],

    "createdAt": "2024-09-03T19:05:38.814Z",

    "updatedAt": "2024-09-07T20:05:01.309Z",
    "__v": 17
}



## Tests 

Open Front end Project

Open node console run `npm test` to have jest start and watch the tests.







