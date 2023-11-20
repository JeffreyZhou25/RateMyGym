const cors = require('cors')
const express=require('express'), 
http=require('http'); 
const hostname='localhost'; 
const mongoose = require("mongoose");
const Gym = require('./Models/gymModel')

const port=8080; 
const app=express(); 

// const sample_server=http.createServer(app); 

app.use(cors({
        origin: '*'
}))

app.use(express.json())
app.use((req, res, next) => {
        next()
})

// ROUTES

//Search page
app.get('/api/Gyms/', async(req, res) => {
        try {
                const allGyms = await Gym.find({});
                // console.log(allGyms)
                res.status(200).json(allGyms)
        } catch (error) {
                console.log(error.message);
                res.status(500).json({message: error.message})
        }
})
//Individual gym page
app.get('/api/Gym/:id', async(req, res) => {
        try {
                const id = req.params.id
                const gym = await Gym.findById(id)
                res.status(200).json(gym)
        } catch (error) {
                res.status(500).json({message: error.message})
        }
})//Update rating
app.put('/api/UpdateRating/:id', async(req, res) => {
        try {
                console.log("Reached Backend!")
                const id = req.params.id;
                const updateData = req.body;

                const data = await Gym.findById(id)
                console.log(data)

                data.dedicateRating = ((data.dedicateRating * data.numRatings) + Number(updateData.dedicateRating)) / (data.numRatings + 1.0); 
                data.diversityRating = ((data.diversityRating * data.numRatings) + Number(updateData.diversityRating)) / (data.numRatings + 1.0);             
                data.communityRating = ((data.communityRating * data.numRatings) + Number(updateData.communityRating)) / (data.numRatings + 1.0);         
                data.numRatings += 1
                const success = await Gym.findByIdAndUpdate(id, data)
                if(!success) {
                        return res.status(404).json({message: "cannot find gym"})
                }
                res.status(200).json(gym)
        } catch (error) {
                res.status(500).json({message: error.message})
        }
})

mongoose.connect("mongodb+srv://jeff:bostonhacks2023@cluster0.dnmuxsi.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
                app.listen(port, () => {
                        console.log("connected to DB and listening on port" + port)
                })
                app.get('/searchGyms', async(req, res) => {
        try {
                const gyms = await Gym.find({})
                console.log(gyms)
                res.status(200).json(gyms)
        } catch (error) {
                console.log(error.message);

        }
})
                // app.use((req, res)=> { 
                //         console.log(req.headers);  
                //         res.statusCode=200;  
                //         res.setHeader('Content-Type', 'text/html');  
                //         res.end('<html><body><h1>This is a test server</h1></body></html>'); 
                // }); 
        }).catch((error) => {
                console.log(error)
        })
  
// sample_server.listen(port, hostname, ()=> { 
//         console.log(`Server running at http: //${hostname}:${port}/`);});