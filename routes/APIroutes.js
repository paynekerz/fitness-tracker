const workout = require("../models/workout")
const router = require("express").Router()

router.post("/api/workouts", (req, res) => {
    try{
        workout.create({})
    .then((data)=>{
        res.json(data)
    })
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.put("/api/workouts/:id", ({body, params},res)=>{
    try{
        workout.findByIdAndUpdate(
            params.id,
            {$push: {exercises:body}},
            {new: true, runValidators: true }
        )
        .then((data)=>{
            res.json(data)
        })
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/api/workouts", (req, res)=>{
    try{
        workout.aggregate({
            $addFields: {
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        })
        .then((data)=>{
            res.json(data)
        })
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get("/api/workouts/range", (req, res)=>{
    try{
        workout.aggregate({
            $addFields: {
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        })
        .sort({_id:-1})
        .limit(7)
        .then((workoutdb)=>{
            res.json(workoutdb)
        })
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("api/workouts", ({body},res)=>{
    try{
        workout.findByIdAndDelete(body.id)
        .then(()=>{
            res.json(true)
        })
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;

