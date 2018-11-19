var express = require('express');
var router = express.Router();
var rn = require('random-number');

const emotionImages = {
    'anger': 2,
    'disgust': 1,
    'fear': 1,
    'joy': 6,
    'sadness': 2,
    'analytical': 1,
    'confident': 1,
    'tentative': 1,
    'neutral': 1
};

router.get('/:emotion', function (req, res, next) {
    let emotion = req.params.emotion;
    if (!emotionImages.hasOwnProperty(emotion)) {
        res.status(404).send();
    }

    let variety = rn({min: 1, max: emotionImages[emotion], integer: true});
    res.sendFile(`/${emotion}_${variety}.png`, {root: './public/images/emotions'});
});

module.exports = router;
