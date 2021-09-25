const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createfriend,
    deletefriend,
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id
router
    .router('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(createfriend)
    .delete(deletefriend)

module.exports = router;