require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRouter');
const establishmentRoutes = require('./routes/establishmentRouter');
const reviewRoutes = require('./routes/reviewRouter');
const currentRoutes = require('./routes/currentRouter');

// express app
const app = express()


// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// routes
app.use('/api/users', userRoutes) // attaches the routes to app
app.use('/api/establishments', establishmentRoutes) // attaches the routes to app
app.use('/api/reviews', reviewRoutes) // attaches the routes to app
app.use('/api/current', currentRoutes) // attaches the routes to app

// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    })

