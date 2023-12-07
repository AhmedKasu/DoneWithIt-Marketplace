<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">DoneWithIt-Marketplace</h3>

---

<p align="center">  An online second hand marketplace inspired by Facebook marketplace.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Future Improvements](#future_improvements)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is the [University of Helsinki fullstack-open course final project.](https://github.com/fullstack-hy2020/misc/blob/master/project.md)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

> This project was developed using TypeScript & node 20.

### Installing

A step by step series of examples that tell you how to get a development env running.

Install client & server dependencies with one command.

```
npm run install-all
```

Start app in development mode.

```
npm run dev
```

**_Several client & server environment variables are required for the project to run locally._**

### Client env variables

Required for uploading product images to the cloud.

> VITE_CLOUDINARY_UPLOAD_URL
> VITE_CLOUDINARY_UPLOAD_PRESET

### Server env variables

Required for database connection.

> POSTGRES_USER
> POSTGRES_PASSWORD
> DATABASE_URL

Required for authentication & authorization.

> JWT_SECRET

Required for deleting product images from the cloud.

> CLOUDINARY_API_KEY
> CLOUDINARY_CLOUD_NAME
> CLOUDINARY_API_SECRET

## 🔧 Running the tests <a name = "tests"></a>

How to run automated tests for this system.

### Unit tests

Client unit tests

```
cd client && npm test
```

### Coding style tests

Lint the server & client code styles.

```
npm run lint
```

## 🎈 Usage <a name="usage"></a>

[DoneWithIt-Marketplace](https://donewithit-marketplace-6ab68864c928.herokuapp.com/) full-stack app is an online second hand shop web app inspired by Facebook marketplace.

User authentication is required to post a new listing for sell or to view a product's details.

Feel free to create a new user or use available credentials.

User 1

```
email@gmail.com
```

User 2

```
email1@gmail.com
```

User 3

```
email2@gmail.com
```

password

```
ABcd123!
```

**_Browser Cookies must be enabled for authentication to function properly._**

This app is deployed to heroku & can be found using [this link.](https://donewithit-marketplace-6ab68864c928.herokuapp.com/)

## 🚀 Deployment <a name = "deployment"></a>

Build for production.

```
npm run build
```

## Future Improvements <a name = "future_improvements"></a>

### Feature 1

> Ability for marketplace users to send messages to other users.
> This may be implemented using WebSockets or a library like [socket.io](https://socket.io/)

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Sequelize](https://sequelize.org/) - ORM
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs](https://react.dev/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@Ahmed Kasu](https://github.com/AhmedKasu)
