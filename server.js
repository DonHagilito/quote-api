const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () =>{
    console.log('Server upp and running');
})

app.get('/api/quotes/random', (req, res, next) =>{
    const resObj = {quote: getRandomElement(quotes)}
    res.send(resObj);
})

app.get('/api/quotes', (req, res, next) =>{
    
    //Checks if there is a person key in the query object. Get all quotes from that person
    if (req.query.person){
        const resObj = {quotes: []};

        quotes.forEach(element =>{
            if(req.query.person === element.person)
            resObj.quotes.push(element);
        })

        res.send(resObj);
    }else{   //If there is not a "person"-key then it will send back all quotes.
        const resObj = {quotes: quotes}
        res.send(resObj);
    }
    
})

app.post('/api/quotes', (req, res, next) =>{

    if (req.query.quote && req.query.person){
        const resObj = {quote: req.query};
        quotes.push(req.query);

        res.send(resObj);
    } else {
        res.status(400).send();
    }
})
