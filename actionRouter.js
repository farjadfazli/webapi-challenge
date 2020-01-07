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
        .then(action => {
            if (action === undefined) {
                res.status(400).json({ error: 'action with given id does not exist' })
            } else { res.status(200).json(action) }
        })
        .catch(err => res.status(500).json(err))
})

// create a new action
router.post('/', validateProjectId, (req, res) => {
    db.insert(req.body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json(err))
})

// update an action
router.put('/:id', validateActionId, (req, res) => {
    db.update(req.params.id, req.body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json(err))
})

// delete an action
router.delete('/:id', validateActionId, (req, res) => {
    db.remove(req.params.id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => res.status(500).json(err))
})


// validate project id
function validateProjectId(req, res, next) {
    projectDb.get(req.body.project_id)
        .then(project => {
            if (!project) {
                console.log('some random string')
                return res.status(400).json({ error: 'project with given id does not exist' })
            } else { next() }
        })
        .catch(err => res.status(500).json({ error: 'invalid project id' }))
}

// validate action id
function validateActionId(req, res, next) {
    db.get(req.params.id)
        .then(action => {
            if (!action) {
                console.log('some random string')
                return res.status(400).json({ error: 'action with given id does not exist' })
            } else { next() }
        })
        .catch(err => res.status(500).json({ error: 'invalid action id' }))
}


module.exports = router