const { Thought, User } = require('../models');

module.exports = 
{
    // Returns all thoughts in the database
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
    // Returns a single thought found with the thoughtId parameter
    getSingleThought(req, res)
    {
        // Find thought by given thoughtId
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
    // Adds a new thought to the thoughts list of a user based on the given username (requires username and thoughtText in the request body)
    createThought(req, res)
    {
        // Create a thought using request body
        Thought.create(req.body)
            .then( (new_thoughtdata) => {
                // Add the new thought to the user's thoughts list
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
    // Updates a selected thought with the thoughtId parameter (requires username and thoughtText in the request body)
    updateThought(req, res)
    {
        // Find a thought by given thoughtId, and update with request body
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
    // Deletes a selected thought with the thoughtId parameter
    deleteThought(req, res)
    {
        // Find a thought by given thoughtId, and remove from the database
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then( (thought) => !thought
            ? res.status(404).json({ message: `No thought with ID: ${req.params.thoughtId}`}) 
            : res.status(200).json({ message: `Thought was successfully deleted` })
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Adds a reaction to a selected thought's (thoughtId) reactions list
    addReaction(req, res)
    {
        // Find a thought by given thoughtId, and add reaction with request body
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
    // Removes a reaction (reactionId) from a selected thought's (thoughtId) reactions list
    async removeReaction(req, res)
    {
        // Find a thought by given thoughtId, and remove reaction by reactionId
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