const router = require('express').Router();

const
    {
        getAllToughts,
        getThoughtById,
        createThought,
        updateThought,
        deleteThought,
        createReaction,
        deleteReaction,
    } = require('../../controllers/user-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllToughts)
    .post(createThought)

// /api/thoughts/:id 
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)


// /api/thoughts/:thoughtId/reactions
router
    .route("/:thoughtId/reactions")
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;