const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('../models/restaurant');
const authenticate = require('../authenticate');

const restaurantRouter = express.Router();

restaurantRouter.use(bodyParser.json());

restaurantRouter.route('/')
.get((req, res, next) => {
    Restaurant.find()
    .then(restaurants => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurants);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Restaurant.create(req.body)
    .then(restaurant => {
        console.log('restaurant Created ', restaurant);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /restaurants');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Restaurant.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

restaurantRouter.route('/:restaurantId')
.get((req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /restaurants/${req.params.restaurantId}`);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findByIdAndUpdate(req.params.restaurantId, {
        $set: req.body
    }, { new: true })
    .then(restaurant => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.restaurantId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//Reviews

restaurantRouter.route('/:restaurantId/reviews')
.get((req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant.reviews);
        } else {
            err = new Error(`Restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant) {
            restaurant.reviews.push(req.body);
            restaurant.save()
            .then(restaurant => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /restaurants/${req.params.restaurantId}/reviews`);
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant) {
            for (let i = (restaurant.reviews.length-1); i >= 0; i--) {
                restaurant.reviews.id(restaurant.reviews[i]._id).remove();
            }
            restaurant.save()
            .then(restaurant => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

restaurantRouter.route('/:restaurantId/reviews/:reviewId')
.get((req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant && restaurant.reviews.id(req.params.reviewId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant.reviews.id(req.params.reviewId));
        } else if (!restaurant) {
            err = new Error(`restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`review ${req.params.reviewId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /restaurants/${req.params.restaurantId}/reviews/${req.params.reviewId}`);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant && restaurant.reviews.id(req.params.reviewId)) {
            if (req.body.rating) {
                restaurant.reviews.id(req.params.reviewId).rating = req.body.rating;
            }
            if (req.body.text) {
                restaurant.reviews.id(req.params.reviewId).text = req.body.text;
            }
            restaurant.save()
            .then(restaurant => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            })
            .catch(err => next(err));
        } else if (!restaurant) {
            err = new Error(`Restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`review ${req.params.reviewId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
        if (restaurant && restaurant.reviews.id(req.params.reviewId)) {
            restaurant.reviews.id(req.params.reviewId).remove();
            restaurant.save()
            .then(restaurant => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            })
            .catch(err => next(err));
        } else if (!restaurant) {
            err = new Error(`restaurant ${req.params.restaurantId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`review ${req.params.reviewId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = restaurantRouter;