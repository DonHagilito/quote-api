const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



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
    
        quotes.push({id: quotes.length, quote: req.query.quote, person: req.query.person});

        const newlyAdded = quotes[quotes.length-1];
        res.send({quote: {quote: newlyAdded.quote, person: newlyAdded.person}});//returns the last quote in the array, which is the newly added one.
    } else {
        res.status(400).send(); 
    }
})

app.put('/api/quotes/:id', (req, res, next) =>{
    const index = getIndexById(parseInt(req.params.id), quotes);
    if (index !== -1 &&  req.query.quote){
        quotes[index].quote = req.query.quote;
        res.send(quotes[index]);
    } else {
        res.status(404).send()
    }
})

app.delete('/api/quotes/:id', (req, res, next) =>{
    const index = getIndexById(req.params.id, quotes);

    if (index !== -1){
        quotes.splice(index, 1);
        res.status(204).send();
    } else{
        res.status(404).send();
    }
})

app.listen(PORT, () =>{
    console.log('Server upp and running');
})