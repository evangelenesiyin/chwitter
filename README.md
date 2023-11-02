# Chwitter - A Twitter-inspired Pet Adoption Directory

Inspired by Twitter's old website layout in 2014, Chwitter is built as a platform to raise awareness of animals in need of pet owners through a central pet adoption directory. Animal shelters, pet welfare organisations, and individuals who are keen to adopt pets, or raise awareness of stray animals in the vicinity are able to contribute to this platform.

## Table of Contents

- <a href="https://github.com/evangelenesiyin/chwitter#deployment">Deployment</a>
- <a href="https://github.com/evangelenesiyin/chwitter#technologies-used">Technologies Used</a>
- <a href="https://github.com/evangelenesiyin/chwitter#how-to-use">How To Use</a>
- <a href="https://github.com/evangelenesiyin/chwitter#project-planning-and-development">Project Planning and Development</a>
- <a href="https://github.com/evangelenesiyin/chwitter#future-developments">Future Developments</a>

## Deployment

Chwitter is deployed using Render, click here to view the application - https://chwitter.onrender.com

## Technologies Used

Chwitter is built using the MERN stack and other libraries:

- MongoDB (with Mongoose)
- Express.js
- React
- Node.js
- JWT (JSON Web Token)
- Bcrypt
- AWS S3 Bucket, Multer, UUID
- Tailwind CSS and Ant Design

## How To Use

To use Chwitter, begin by signing up as a new user or log in as an existing user.

<img src="https://github.com/evangelenesiyin/chwitter/assets/108106809/79ed8245-af0c-421c-9db6-9cb1ef167727">
<img src="https://github.com/evangelenesiyin/chwitter/assets/108106809/92036643-2a94-40a4-b1f9-968ab96e974d">

New users will be directed to the profile creation page to fill in their details.

![image](https://github.com/evangelenesiyin/chwitter/assets/108106809/16f8066b-a438-43b6-b333-89cacac7b8d6)

Pressing the "Let's Go" button, or log in as an existing user to be directed to the Homepage. Users are able to fill in the details in the Chweet Form on top of the page to create a Chweet, where the information related to the pet will be displayed. Users are also able to see Chweets created by other users. They are able to edit or delete the Chweets created by their account as well.

![image](https://github.com/evangelenesiyin/chwitter/assets/108106809/78373f5e-4e35-4ed9-bd64-440c57a4b9df)

## Project Planning and Development

The steps I took to build this project are outlined below:
1. Using a Kanban board, I planned out the Ice Box items that I wanted to implement in my project. I placed myself in the shoes of potential users and the administrator overseeing the application. I had to take into consideration the navigation of webpages for visitors with unauthorised access, or when an invalid url has been entered. With these in mind, I drafted the layout, design, features and React components of the application in a wireframe.

Trello board - https://trello.com/b/TCvigjsp/chwitter
Wireframe - https://www.figma.com/file/fhiR5q3xhMy9YGOEtDw5HM/Chwitter?type=design&node-id=0%3A1&mode=design&t=Wrx1VVoYy24Id6kv-1

2. Build the skeleton and components of the application using React, Tailwind CSS and Ant Design.
3. Set-up controllers, models, routes, etc, and connect to MongoDB to fetch, delete and patch data.
4. Set-up AWS S3 Bucket for uploading and removing images.

## Future Developments

As I didn't have enough time before the project deadline to complete some of the Ice Box items, I aim to integrate these into the application:

* Full profile page to display profile info and posts, accessible by the public regardless of login status
* Filter posts according to type of animal, etc
* Filter/ search for specific users
