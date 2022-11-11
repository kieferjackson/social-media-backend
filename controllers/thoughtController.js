const { Thought, User } = require('../models');

module.exports = 
{
    getThoughts(req, res) 
    { 
        Thought.find()
        .select('-__v')
        .then( (thoughts) => res.json(thoughts))
        .catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    
    getSingleThought(req, res)
    {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then( (thought) => !thought 
            ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`}) 
            : res.json(thought)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },

    createThought(req, res)
    {
        Thought.create(req.body)
            .then( (new_thoughtdata) => {
                return User.findOneAndUpdate
                (
                    { username: req.body.username },
                    { $push: { thoughts: new_thoughtdata._id } },
                    { new: true }
                );
            }).then( (user) => !user 
                ? res.status(404).json({ message: `No user with username: ${req.params.username}`}) 
                : res.json(user)
            ).catch( (error) => { 
                console.log(error);
                res.status(500).json(error);
            });
    },
    
    updateThought(req, res)
    {
        Thought.findOneAndUpdate
        (
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then( (thought) => !thought
            ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`}) 
            : res.json(thought)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },

    deleteThought(req, res)
    {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then( (thought) => !thought
            ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`}) 
            : res.status(200).json({ message: `Thought was successfully deleted` })
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },

    addReaction(req, res)
    {
        Thought.findOneAndUpdate
        (
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        ).then( (thought) => {
            !thought
                ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`, thought })
                : res.status(200).json({ message: 'Reaction was successfully added' })
        }).catch( (error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },

    async removeReaction(req, res)
    {
        Thought.findOneAndUpdate
        (
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
        ).then( (thought) => !thought
            ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`}) 
            : res.status(200).json(thought)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    }
}