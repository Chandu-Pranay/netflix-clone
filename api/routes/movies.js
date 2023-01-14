const movieRouter = require('express').Router();
const movies = require('../models/Movies');
const verify = require('../verifyToken');

//CREATE
movieRouter.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new movies(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you are not allowed");
    }
});

//UPDATE
movieRouter.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await movies.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you are not allowed");
    }
});


//DELETE
movieRouter.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const deletedMovie = await movies.findByIdAndDelete(req.params.id);
            res.status(200).json("movie has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you are not allowed");
    }
});

//GET

movieRouter.get("/find/:id", verify, async (req, res) => {
    try {
        const Movie = await movies.findById(req.params.id);
        res.status(200).json(Movie);
    } catch (err) {
        res.status(500).json(err);
    }
}

);

//GET RANDOM
movieRouter.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    let Movie=[];
    try{
    if (type === "series") {
        Movie =await movies.aggregate([
            { $sample: { "size": 1 } },
            { $match: { isSeries: "true" } }
        ]);
    }
    else{
        Movie =await movies.aggregate([
            { $sample: { "size": 1 } },
            { $match: { isSeries: "false" } }
        ]);
    }
    res.status(200).json(Movie);
    }catch(err){
        res.status(500).json(err);}
})

//GET ALL
movieRouter.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const Movie = await movies.find();
            res.status(200).json(Movie.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you are not allowed");
    }
});


module.exports = movieRouter;