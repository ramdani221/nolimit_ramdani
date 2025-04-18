# Test BackEnd Nodejs Nolimit Indonesia

## Introduction

This is an API that manages blog posts with a user authentication system using JWT.
The output of this API consists of 7 endpoints as follows: 
* Endpoint to create/register user.
* Endpoint to login using email and password.
* Endpoint to get all posts.
* Endpoint to get a post by post id.
* Endpoint to create a post, which must be authenticated user.
* Endpoint to update a post, which must be authenticated user and user id must match post authorId.
* Endpoint to delete a post, which must be authenticated user and user id must match post authorId.
And this API has Unit test

## Before You Begin

Before you begin i recommend you to read about the basic building blocks that assemble this application:
* ExpressJS - The best way to understand NextJS is through it's [Official Website](https://expressjs.com/) which has a [Getting Started](https://expressjs.com/en/starter/installing.html) guide.
* Sequelize - Get in-depth information about Sequelize on the [Official Website](https://sequelize.org/) to learn the [Core Concept](https://sequelize.org/docs/v6/category/core-concepts/) of Sequelize.
* MySQL - Go through [MySQL Official Website](https://www.mysql.com/) and proceed to their [Official Manual](https://dev.mysql.com/doc/), which should help you understand mySQL usage better.
* Node.js - Start by going through [Node.js Official Website](https://nodejs.org/en/) which should get you going with the Node.js platform.
* Swagger - Try to visit [Swagger Oficial Website](https://swagger.io/) to get information about the API Documentation tools

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* MySQL - [Download & Install MySQL](https://www.mysql.com/downloads/)

## back-end

 - NodeJS
 - ExpressJS
 - MySQL
 - Sequelize ORM
 - Swagger

## Getting Started

First, open terminal to run the development server.

```bash
# Clone the repository
git clone https://github.com/ramdani221/nolimit_ramdani.git

# Go inside the directory
cd nolimit_ramdani

# Install dependencies
npm install

# Setting environment
rename the example.env file to .env, then set your database configuration in the .env file

# Migration your database
npx sequelize-cli db:migrate

# Seeding your database
npx sequelize-cli db:seed --seed 20250418021430-demo-user.js
npx sequelize-cli db:seed --seed 20250418022501-demo-post.js

# Start aplication
npm run dev

# Run test unit
npm run test
```

## This application should run on port 3000 , you can access it through browser, just go to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Default User
```sh
id          :1
name        :John Doe
Email       :johndoe@gmail.com
Password    :12345

id          :2
name        :Albert
Email       :albert@gmail.com
Password    :12345

id          :3
name        :Jason
Email       :jasont@gmail.com
Password    :12345
```