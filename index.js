import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import friendModel from './models/Friends.js'
require("dotenv").config();

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3001", "https://friendapp.onrender.com"]
}));

mongoose.connect('mongodb+srv://shivanshj157:friendApp123@friendapp.c9q5ptj.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})

app.post('/addFriend', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const friend = new friendModel({name:name, age:age});
    await friend.save()
    res.send(friend);
})

app.get('/read', async (req, res) => {
    try {
        const result = await friendModel.find({})
        res.send(result);
    } catch(err) {
        res.send(err);
    }
})

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;
    try {
        const friendToUpdate = await friendModel.findById(id);
        friendToUpdate.age = Number(newAge);
        await friendToUpdate.save();
    } catch (err) {
        console.log(err);
    }
    res.send("Updated !");
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await friendModel.findByIdAndRemove(id).exec()
    res.send("item deleted")
})



app.listen(process.env.PORT || 3001, ()=>{
    console.log("You are connected!");
})
