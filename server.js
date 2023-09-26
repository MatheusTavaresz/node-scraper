const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const https = require('https');
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

app.listen(port, () => {
    console.log(`Listening on ${port} port`)
});

app.get('/', (req, res) => {
    // res.send('Hello')

    const url = 'https://fbref.com/en/squads/18bb7c10/Arsenal-Stats'
    https.get(url, res => {
        let data = '';

        res.on('data', chunk => data += chunk);
        res.on('end', () => console.log(data))
        
    })
})