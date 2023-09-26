const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.listen(port, () => {
    console.log(`Listening on ${port} port`)
});

app.get('/', (req, res) => {
    // res.send('Hello')
    const url = 'https://fbref.com/en/squads/18bb7c10/Arsenal-Stats'

    JSDOM.fromURL(url).then(dom => {
        const element = dom.window.document.querySelector("#all_stats_standard");
        console.log(element.id)
    })
})