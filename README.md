# TwitterCNN: API

This is an Node.JS-powered API which aggregate Twitter timeline and CNN news feed.

It has two main endpoints in addition to one minor one. It uses Twitter Standard API and CNN Search API to retrieve data. Furthermore, it consumes IBM Watson Tone Analyzer for analyzing emotions and tones in posted tweets and shows these emotions in form of some funny stickers. All requests to other services are async in order to speed up the process.

## Endpoints

### Retrieve Tweets:
    /tweets/:username?count=25

### Fetch News:
    /news?keyword=EncodedString&count=25

### Stickers:
    /visualize/:emotion

Returns a random sticker related to the emotion. Currently supported emotions are **anger, disgust, fear, joy, sadness, analytical, confident, tentative, neutral** (Tone Analyzer general-tones)

# Technologies

 - Node.JS
 - Express.JS
 - axios
 - Twitter and IBM Watson SDKs


# Development & Deployment
First run `npm install`, then copy `sample.env` to `.env` and fill in API keys. Finally run `./bin/www`.

# Credits

Made with ❤️ by Mohammad-Reza Daliri (https://github.com/mrdaliri).

Following libraries/products are used:
 - Telegram USAPresident sticker pack: https://t.me/addstickers/USAPresident
- CNN Search Page: https://www.cnn.com/search/
- Tweet timelines API: https://developer.twitter.com/en/docs/tweets/timelines/overview.html
- IBM Watson Tone Analyzer API: https://www.ibm.com/watson/services/tone-analyzer/

Published under MIT License.
