# Pawtel - Client

## Description

Paw-tel is a full-stack application utiltizing MERN. In this application, users are able to create profiles for their pets, view housing options for their pets, and assign their pets in a "home-away-from-home" of their choosing.

## User Stories

* As a user (AAU) I want to be able to create, edit or delete a profile for my pet with their needs (medicines, care guidelines etc)
* (AAU) I want to be able to be able to find an appropriate “pet air bnb” in Seattle for my pet. 
* (AAU) I want to be able to browse and favorite housing profiles.


## Group Roles

### Dagm
* User Authentication
* User component
* Testing routes

### Kathy
* Setting up react and the navagation bar
* boilerplate css 
* git master

### Louisa
* Hotels and pets components
* Testing routes
* skeleton

## Sprints

#### Friday 3/19/21
* Soft/hard pitches
* Test APIs
* Complete ReadMe - routes, schemas, sprints
* Make wireframes
* Create server and client side folders
* Assign roles

#### Saturday and Sunday
* Research 
* plan basic crud routes

#### Monday 
* Render user side
* Work on user routes 

#### Tuesday
* pets component
* hotel component

#### Wednesday
* MVP

#### Thursday
* debugging
* css/boot

#### Friday
* debugging
* css/boot

## Routes
### RESTful routing chart for Pet Hotel Hosts
| Method | URL | Functionality | view |
|--------|-----|---------------|------|
| GET | localhost:3000/api-v1/users | Get all users (admin) | redirect to /users
| GET | localhost:3000/api-v1/users/:id | Get single user by id (admin) | redirect to /users/:id
| POST  | localhost:3000/api-v1/users | Add user to database (admin) |  redirect to '/profile'
| PUT  | localhost:3000/api-v1/users/:id | Update user in database (admin) |  redirect to '/users/:id'
| DELETE | localhost:3000/api-v1/users/:id | Delete user from database (admin&userProfile owner) | redirect to '/users'

### Authentication RESTful routing chart for Pet Owners
| Method | URL | Functionality | view |
|--------|-----|---------------|------|
| POST | localhost:3000/api-v1/register | Add user to database with encrypted password | redirect to /auth/register
| POST | localhost:3000/api-v1/auth/login | validate users input to the database | redirect to /auth/login
| GET | localhost:3000/api-v1/auth/user | if find get it from the db | redirect to /profile
| POST | localhost:3000/api-v1/auth/forgetpassword | Generate password token and send email | redirect to /forgetPassword
| PUT | localhost:3000/api-v1/auth/resetPassword/{token} | Reset user password via token | redirect to /auth/resetPassword
| PUT | localhost:3000/api-v1/auth/updatePassword | Update logged in user password, send in the body currentPassword and newPassword | redirect to /auth/updatePassword
| GET | localhost:3000/api-v1/auth/logout | Clear token cookie | redirect to '/'.

### RESTful routing chart for Users/Pets
| Method | URL | Functionality | view |
|--------|-----|---------------|------|
GET | /pets | Displays the user's pet list | Render pets
POST | /pets | Adds a pet to the user's pet list via a form | Redirect to /pets
GET | /pets/:id | Show details about a specific pet from the user's pet list | Render pets/:id
PUT | /pets/:id | Updates a specific pet's information | Redirect to /pets/:id 
DELETE | /pets/:id | Removes a pet from the user's pet list | Redirect to /pets

### RESTful routing chart for Hotels
| Method | URL | Functionality | view |
|--------|-----|---------------|------|
GET | /hotels | Displays the ho's hotel list | Render hotels
POST | /hotels | Adds a hotel to the host's hotel list via a form | Redirect to /hotels
GET | /hotels/:id | Show details about a specific hotel from the host's hotel list | Render hotels/:id
PUT | /hotels/:id| Updates a specific hotel's information | Redirect to /hotels/:id
DELETE | /hotels/:id | Removes a pet from the host's hotel list | Redirect to /hotels/:id

## Database Schema

![main](/public/imgs/wireframes/schema.PNG)

## Wireframes
![main](/public/imgs/wireframes/petsprofile.png)
![main](/public/imgs/wireframes/petprofile.png)
![main](/public/imgs/wireframes/hotelprofile.png)
![main](/public/imgs/wireframes/hotellist.png)
![main](/public/imgs/wireframes/favoritehotels.png)
![main](/public/imgs/wireframes/hosthotelsprofile.png)
![main](/public/imgs/wireframes/hosthotelprofile.png)

## Technologies and APIs

#### Technologies

* Front-end: React
* Backend: Mongoose, MongoDB, Express, NodeJS, bcryptjs,jsonwebtoken

#### APIs
* https://thedogapi.com/ (10k requests/month)
* https://dog.ceo/api/breeds/list/all

## Stretch Goals

* Users can leave reviews
* A user can create a profile as a “hotel/airbnb”
* Include an API for actual pet hotels 
* Skeleton
* Search by location

## Resources
1. Materials-ui | https://material-ui.com/