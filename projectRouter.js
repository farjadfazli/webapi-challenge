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
router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// get project actions
router.get('/:id/actions', (req, res) => {
    db.getProjectActions(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json(err))
})

// create a new project
router.post('/', (req, res) => {
    db.insert(req.body)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// update a project
router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

// delete a project
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json(err))
})

module.exports = router