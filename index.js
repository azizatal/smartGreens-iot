const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const path =require('path')
const homeRoutes=require('./routes/home-routes');
const mongoose = require('mongoose');
const Plant_env = require('./models/plant_env');
const app=express();
const http = require('http');

app.use(express.json())

app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(homeRoutes.routes);

const uri='mongodb+srv://admin:12345Qwer@cluster0.daydt7s.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection
db.on('error',console.error.bind(console,'mongoDB connection error:'))

const port= 5089

app.listen(port, ()=>{
    console.log('listenning to port: '+ port)
    })


app.post("/plant_env", async(req, res)=>{
    try {
        const plant=await Plant_env.create(req.body);
        res.send('Record Saved Succesfully!');
        console.log(req.body);
        }
    catch(error){
         console.log(error.message);
            res.status(500).json({message:error.message})
        }
    });

    app.get("/getData", async(req, res)=>{
        try {
            const plants=await Plant_env.find({})
               res.status(200).json(plants);
            }
        catch(error){
            console.log(error.message);
            res.status(500).json({message:error.message})
            }
        })

app.get("/humidity", async(req, res)=>{
    try {
        const plants=await Plant_env.find({},'dateTime humidity -_id')
           res.json(plants);
        }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
        }
    })

    app.get("/temperature", async(req, res)=>{
        try {
            const plants=await Plant_env.find({},'dateTime temperature -_id')
               res.json(plants);
            }
        catch(error){
            console.log(error.message);
            res.json({message:error.message})
            }
        })

        app.get("/moisture", async(req, res)=>{
            try {
                const plants=await Plant_env.find({},'dateTime moisture -_id')
                   res.json(plants);
                }
            catch(error){
                console.log(error.message);
                res.status(500).json({message:error.message})
                }
            })

            app.get("/light", async(req, res)=>{
                try {
                    const plants=await Plant_env.find({},'dateTime light -_id')
                       res.json(plants);
                    }
                catch(error){
                    console.log(error.message);
                    res.status(500).json({message:error.message})
                    }
                })