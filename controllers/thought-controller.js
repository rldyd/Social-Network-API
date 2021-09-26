const { Thought, User } = require('../models');

const thoughtController =
{
    getAllThoughts(req, res) {
        Thought.find({})
            // .populate({
            //     path: "reaction",
            //     select: "-__v"
            // })
            // .select("-__v")
            // .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // GET one THOUGHT by id 
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            // .populate({
            //     path: "reaction",
            //     seletec: "-__v"
            // })
            // .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No THOUGHT found with this id " });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // CREATE THOUGHT
    createThought(req, res) {
        Thought.create(req.body)
            .then(dbThoughtData => {
                User.findByIdAndUpdate
                    (
                        { _id: req.params.userId },
                        { $push: { thoughts: dbThoughtData._id } },
                        { new: true }
                    )
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // UPDATE THOUGHT by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No THOUGHT found with this id! " });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // DELETE THOUGHT
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ messgae: "No THOUGHT found with this id! " });
                }
                //Ani's Code Start
                return User.findOneAndUpdate
                    (
                        { _id: req.params.username },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    );
                //Ani's Code End
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    ////////////////////////// REACTION (POST, DELETE) //////////////////////////////////////

    // CREATE Reaction 
    createReaction(req, res) {
        Thought.findOneAndUpdate
            (
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ messgae: " No THOUGHT found with this id! " });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // DELELTE Reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate
            (
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: " No THOUGHT found withi this id! " });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    }
};

module.exports = thoughtController;