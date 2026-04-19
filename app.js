if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const cors = require('cors');

const router = require('./router');

const app = express();
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/userController')
const publicRouter = require('./router/public')
const jobRouter = require('./router/jobs')

const authentication = require('./middlewares/authentication');
const { guardAdmin, ownerJob } = require("./middlewares/authorization");
const errorHandler = require('./middlewares/errorHandler')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', AuthController.register)
app.post('/login', AuthController.login)

app.use('/pub', publicRouter)


app.use(authentication)

app.use('/jobs', jobRouter)

app.use(router)

app.post("/add-user", guardAdmin, UserController.addUser);


app.use(errorHandler);


module.exports = app;
