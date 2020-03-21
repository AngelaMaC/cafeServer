const express = require('express');
const bodyParser = require('body-parser');

const eventRouter = express.Router();

eventRouter.use(bodyParser.json());

eventRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the events to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
})
.delete((req, res) => {
    res.end('Deleting all events');
});

eventRouter.route('/:eventId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the event: ${req.params.eventId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/${req.params.eventId}`);
})

.put((req, res) => {
    res.write(`Updating the event: ${req.params.eventId}\n`);
    res.end(`Will update the event: ${req.body.name}
        with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting event: ${req.params.eventId}`);
});

module.exports = eventRouter;