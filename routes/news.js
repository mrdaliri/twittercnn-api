var express = require('express');
var router = express.Router();
var truncate = require('truncate');
var moment = require('moment');

const fetchNews = function (keyword, count) {
    const axios = require('axios');

    return new Promise((resolve, reject) => {
        axios.get(`https://search.api.cnn.io/content?q=${keyword}&size=${count}`).then(function (response) {
            response.data.result.forEach(function (article) {
                article.short = truncate(article.body, 400);
                article.datetime = moment(article.lastModifiedDate).unix();
            });
            resolve(response.data.result);
        }).catch(reject);
    });
};

router.get('/', function (req, res, next) {
    const {keyword = "Trump", count = 25} = req.query;

    fetchNews(keyword, count).then(function (data) {
        res.send(data);
    });
});

module.exports = router;
