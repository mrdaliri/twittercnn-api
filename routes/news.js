var express = require('express');
var router = express.Router();

const fetchNews = function (keyword, count) {
    const axios = require('axios');

    return new Promise((resolve, reject) => {
        axios.get(`https://search.api.cnn.io/content?q=${keyword}&size=${count}`).then(function (response) {
            resolve(response.data);
        }).catch(reject);
    });
};

router.get('/', function (req, res, next) {
    const {count = 25} = req.query;

    fetchNews('Trump', count).then(function (data) {
        res.send(data)
    });
});

module.exports = router;
