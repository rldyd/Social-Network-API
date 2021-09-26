const { User, Thought } = require('../models');

const userController =
{
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one User by Id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate([
                { path: 'thoughts', select: "-__v" },
                { path: 'friends', select: "-__v" }
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No USER with this id" })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create User 
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // UPDATE User by ID
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No USER found with this id!" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    // DELETE User 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "NO USER found with this id!" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /////////////////////////////////////////////  FRIEND (POST, DELETE) ////////////////////////////////

    // CREATE Friend 
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No USER found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // DELETE Friend
    deleteFriend(req, res) {
        User.findOneAndUpdate
            (
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true, runVAlidators: true }
            )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: "No USER with this id!" });
                    return;
                }
                res.json(dbFriendData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    }
};


module.exports = userController;