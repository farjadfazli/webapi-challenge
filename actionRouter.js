const express = require('express')
const db = require('./data/helpers/actionModel')
const projectDb = require('./data/helpers/projectModel')
const router = express.Router()

// get all actions
router.get('/', (req, res) => {
    db.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json(err))
})

// get action by id
router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json(err))
})

// create a new action
router.post('/', (req, res) => {
    validateProjectId(req, res)
    db.insert(req.body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json(err))
})

// update an action
router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json(err))
})

// delete an action
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => res.status(500).json(err))
})


// validate project id
function validateProjectId(req, res, next) {
    projectDb.get(req.body.project_id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({error: 'invalid project id'}))
}

module.exports = router