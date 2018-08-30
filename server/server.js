const express = require('express');
const bodyParser = require('body-parser');

app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());


const port = process.env.PORT || 7777;

//DB - Mongo - Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book_db');

const {Book} = require('./model/books');
const {Stores} = require('./model/stores')

//POST
    // POST STORE
app.post('/api/add/store', (req,res)=>{
    // console.log("Getting a Post request!");
    // console.log(req.body);
    const store = new Stores({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    store.save((err,doc)=>{
        if (err) return res.status(400).send(err)
        res.status(200).send();
    })
})
    // POST BOOK
    app.post('/api/add/books', (req, res)=>{
        const book = new Book({
            name : req.body.name,
            author : req.body.author,
            pages : req.body.pages,
            price : req.body.price,
            stores : req.body.stores
        });
        book.save((err,doc)=>{
            if (err) return res.status(400).send(err)
            res.status(200).send();
        })
    })
// GET
app.get('/api/stores', (req, res)=>{
    Stores.find((err, doc)=>{
        if (err) return res.status(400).send(err)
        res.send(doc)
    })
})
    // GET API INDEX BOOK
app.get('/api/books', (req, res)=>{
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    //let order = req.query.ord ? req.body.ord : 'asc';
    
        Book.find().limit(limit).exec((err, doc)=>{
            if (err) return res.status(400).send(err)
            res.send(doc)
        })
    })
    //GET API EDIT BOOK
app.get('/api/books/:id', (req, res)=>{

    
    Book.findById(req.params.id, (err, doc)=>{
        if (err) return res.status(400).send(err)
        res.send(doc)
    })
})
// PATCH
app.patch('/api/add/books/:id', (req, res)=>{
    Book.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}, (err, doc)=>{
        if (err) return res.status(400).send(err)
        res.send(doc)
    })
})

// DELETE

app.delete('/api/delete/books/:id', (req, res)=>{
    Book.findByIdAndRemove(req.params.id, (err, doc)=>{
        if (err) res.status(400).send(err)
        res.send(doc)
    })
})

app.listen(port, () =>{
    console.log(`Started on Port ${port}`);
})
