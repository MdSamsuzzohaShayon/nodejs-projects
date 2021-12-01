const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const Pusher = require('pusher');



var pusher = new Pusher({
    appId: '709936',
    key: 'b976189345ad44e8dfb4',
    secret: 'a49439830e035cdc4062',
    cluster: 'ap2',
    encrypted: true
});



router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
        return res.json({
            success: true,
            message: 'Thank you for voting'
        });
    });


});

module.exports = router;