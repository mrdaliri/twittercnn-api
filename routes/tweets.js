var express = require('express');
var router = express.Router();

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzer = new ToneAnalyzerV3({
    iam_apikey: process.env.TONE_ANALYZER_API_KEY,
    version: '2016-05-19',
    url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});

const analyzeTone = function (text, index) {
    return new Promise(((resolve, reject) => {
        toneAnalyzer.tone({
            tone_input: {'text': text},
            content_type: 'application/json',
            sentences: false
        }, function (error, toneAnalysis) {
            if (error) {
                reject(error);
            } else {
                resolve({index: index, tones: toneAnalysis.document_tone.tone_categories[0].tones});
                // resolve({index: index, tones: toneAnalysis});
            }
        });
    }));
};


const fetchTweets = function (screen_name, count) {
    const Twitter = require('twitter');
    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    let params = {screen_name: screen_name, 'count': count, 'tweet_mode': 'extended'};

    return new Promise(function (resolve, reject) {
        client.get('statuses/user_timeline', params).then(function (tweets) {

            let tones = [];
            tweets.forEach(function (tweet, index) {
                let text = tweet.hasOwnProperty('retweeted_status') ? tweet.retweeted_status.full_text : tweet.full_text;

                tones.push(analyzeTone(text, index));
            });

            Promise.all(tones).then(function (values) {
                values.forEach(function (result) {
                    tweets[result.index].tones = result.tones;
                });

                resolve(tweets);
            }).catch(function (error) {
                reject(error);
            });
        });
    });
};

router.get('/:username', function (req, res, next) {
    const {count = 25} = req.query;

    fetchTweets(req.params.username, count).then(function (data) {
        res.send(data);
    });
});

module.exports = router;
