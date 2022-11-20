# Social Media Backend

[Video demonstration of the API in action](https://drive.google.com/file/d/1Dp_nHVbQhyoehyS1pZS4GqZwIuKPsgY0/view)

## Description
MongoDB database for storing user data. Mongoose afforded schemas for User models, which have "thoughts" (essentially their own discussion thread) in addition to "reactions" (essentially responses to other thoughts).

No frontend is included for this project, and so a walkthrough video has been provided to demonstrate the application's functionality:

Here is a screenshot of the API in use with Insomnia:
    ![Screenshot of the data returned for the `users` routes](./assets/screenshot.png)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Installation
- Clone this repository
- Run `npm install` in the console (with Node.js installed)
- Run `npm start` to start the server

## Usage
Storing user data in addition to their associated "thoughts" and "reactions" using MongoDB/Mongoose as the database. The following endpoints are available for use with a deployed server:

- User Routes
    - GET `/api/users` : Returns all users in the database, including their thoughts and any friends they may have registered.
    - POST `/api/users` : Creates a new user with username and email in the request body and adds them to the database.
    - PUT `/api/users/:userId` : Updates a selected user with username and email in the request body.
    - DELETE `/api/users/:userId` : Deletes a selected user from the database.
    - POST `/api/users/:userId/friends/:friendId` : Adds a user of :friendId to the friends list of user with :userId.

- Thoughts Routes
    - GET `/api/thoughts` : Returns all thoughts in the database, including their reactions.
    - POST `/api/thoughts` : Creates a new thought with thoughtText and username (to associate with the user) in the request body and adds them to the database.
    - PUT `/api/thoughts/:thoughtId` : Updates a selected thought with thoughtText and username (to associate with the user) in the request body.
    - DELETE `/api/thoughts/:thoughtId` : Deletes a selected thought from the database
    - POST `/api/thoughts/:thoughtId/reactions` : Adds a reaction with reactionBody and username (to associate with the user) in the request body and adds them to the database.
    - DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` : Deletes a selected reaction for a thought from the database

## Contributing
N/A

## Tests
N/A

## Questions
If you have any questions related to this project, contact through my [GitHub](https://github.com/kieferjackson) or contact at the following email address: [kieferleejackson@gmail.com](kieferleejackson@gmail.com)

## Credits
This project was developed by [kieferjackson](https://github.com/kieferjackson)
