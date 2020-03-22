const express = require('express');
const bodyParser = require('body-parser');
const Dish = require('../models/dish');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req, res, next) => {
    Dish.find()
    .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Dish.create(req.body)
    .then(dish => {
        console.log('dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })
    .catch(err => next(err));
})
.put((req, res, next) => {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Dish.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dish.findById(req.params.dishId)
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
})
.put((req, res, next) => {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Dish.findByIdAndDelete(req.params.dishId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = dishRouter;