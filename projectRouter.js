const express = require('express')
const db = require('./data/helpers/projectModel')
const router = express.Router()

// get all projects
router.get('/', (req, res) => {
    db.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json(err))
})

// get a project by id
router.get('/:id', validateProjectId, (req, res) => {
    db.get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// get project actions
router.get('/:id/actions', validateProjectId, (req, res) => {
    db.getProjectActions(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json(err))
})

// create a new project
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({error: 'please provide name and description'})
    } else {
    const toBeInserted = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    }
    db.insert(toBeInserted)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
}})

// update a project
router.put('/:id', validateProjectId, (req, res) => {
    db.update(req.params.id, req.body)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// delete a project
router.delete('/:id', validateProjectId, (req, res) => {
    db.remove(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// validate project id
function validateProjectId(req, res, next) {
    db.get(req.params.id)
        .then(project => {
            if (!project) {
                console.log('some random string')
                return res.status(400).json({ error: 'project with given id does not exist' })
            } else { next() }
        })
        .catch(err => res.status(500).json({ error: 'invalid project id' }))
}

module.exports = router