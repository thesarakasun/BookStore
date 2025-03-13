require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const BookModel=require('./models/Books')

const app = express()
app.use(cors())
app.use(express.json())

const mongoURI=process.env.MONGO_URI;

mongoose.connect(mongoURI)

app.post("/addBook",(req,res)=>{
    BookModel.create(req.body)
    .then(books => res.json(books))
    .catch(err => res.json(err))
})

app.get('/', (req,res) => {
    BookModel.find({})
    .then(books => res.json(books))
    .catch(err => res.json(err))
})

app.get('/getBook/:id', (req,res) => {
    const id = req.params.id;
    BookModel.findById({_id:id})
    .then(books => res.json(books))
    .catch(err => res.json(err))
})

app.put('/updateBook/:id', (req,res)=>{
    const id = req.params.id;
    BookModel.findByIdAndUpdate({_id:id}, {
        title:req.body.title, 
        author:req.body.author, 
        genre:req.body.genre, 
        year:req.body.year})

    .then(books => res.json(books))
    .catch(err => res.json(err))
})

app.delete('/deleteBook/:id' , (req,res)=>{
    const id = req.params.id;
    BookModel.findByIdAndDelete({_id:id})
    
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server running")
})