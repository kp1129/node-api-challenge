const express = require('express');
const Action = require('./data/helpers/actionModel');

const router = express.Router();

// Endpoints for Action
router.get("/", (req, res) => {
    // get all actions in the database
    Action.get()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ message: "Oops! Could not retrieve actions at this time"}))
});

router.post("/", (req, res) => {
    // post a new action
    const newAction = req.body;
    // make sure all the required properties are there
    if(!newAction.project_id || !newAction.description || !newAction.notes){
        res.status(400).json({ message: "Please provide action description, notes, and project_id"})
    } else {
        // save new action
        Action.insert(newAction)
        .then(response => res.status(201).json(newAction))
        .catch(error => res.status(500).json({ message: "Oops! Could not create this action"}))
    }
});

router.delete("/:id", (req, res) => {
    // delete action
    Action.remove(req.params.id)
    .then(response => res.status(200).json({ message: "Action deleted"}))
    .catch(error => res.status(500).json({ message: "Oops! Could not delete this action"}))
});

router.put("/:id", (req, res) => {
    // update action
    const id = req.params.id;
    const updatedAction = req.body;
    // make sure all the required properties are there
    if(!updatedAction.project_id || !updatedAction.description || !updatedAction.notes){
        res.status(400).json({ message: "Please provide action description, notes, and project_id"})
    } else {
        // save updated action
        Action.update(id, updatedAction)
        .then(response => {
            if(response){
                res.status(200).json(response)
            } else if (response === null){
                res.status(400).json({ message: "Oops! Could not find an action with this id"})
            }
        })
        .catch(error => res.status(500).json({ message: "Oops! Could not update this action at this time"}))
    }
});

module.exports = router;