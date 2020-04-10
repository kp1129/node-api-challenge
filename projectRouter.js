const express = require('express');
const Project = require('./data/helpers/projectModel');
const Action = require('./data/helpers/actionModel');

const router = express.Router();


// Endpoints for Project
router.get("/", (req, res) => {
    // get all the projects
    Project.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(500).json({ message: "Oops! There was a problem retrieving projects"}));
});

router.post("/", (req, res) => {
    // add new project
    const newProject = req.body;
    // make sure it has all the required properties
    if(!newProject.name || !newProject.description){
        res.status(400).json({ message: "Please provide project name and description"})
    } else {
        // save the new project
        Project.insert(newProject)
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json({ message: "Oops! There was a problem creating new project"}))
    }
});

router.delete("/:id", (req, res) => {
    // delete project with this id
    Project.remove(req.params.id)
    .then(response => res.status(200).json({ message: "Project deleted"}))
    .catch(error => res.status(500).json({ message: "Oops! There was a problem deleting this project"}))        
});

router.put("/:id", (req, res) => {
    // update project with this id
    const id = req.params.id;
    const updatedProject = req.body;
    // make sure the updated project isn't missing any required properties
    if(!updatedProject.name || !updatedProject.description){
        res.status(400).json({ message: "Please provide project name and description"})
    } else {
        // update project
        Project.update(id, updatedProject)
        .then(response => {
            if(response){
                res.status(200).json(response)
            } else if (response === null){
                res.status(400).json({ message: "Oops! Could not locate the project with this id"})
            }
        })
        .catch(error => res.status(500).json({ message: "Oops! There was a problem updating this project"}))
    }    
});

// Endpoint for Project Actions
router.get("/:id/actions", (req, res) => {
    // get all the project actions for the project with this id
    Project.getProjectActions(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ message: "Oops! Could not retrieve project actions"}))
});

module.exports = router;