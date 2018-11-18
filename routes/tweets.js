var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var params = {screen_name: 'realDonaldTrump', 'count': 25, 'tweet_mode': 'extended'};

/* GET users listing. */
router.get('/', function (req, res, next) {
    client.get('statuses/user_timeline', params).then(function (tweets) {
        res.send(tweets);
    }).catch(function (error) {
        throw error;
    });
});

module.exports = router;
