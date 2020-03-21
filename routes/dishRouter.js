const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the dishs to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishs');
})
.delete((req, res) => {
    res.end('Deleting all dishs');
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishs/${req.params.dishId}`);
})

.put((req, res) => {
    res.write(`Updating the dish: ${req.params.dishId}\n`);
    res.end(`Will update the dish: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting dish: ${req.params.dishId}`);
});

module.exports = dishRouter;