const { Thought, Reaction } = require('../models');

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
            .then( (new_thoughtdata) => res.json(new_thoughtdata))
            .catch( (error) => { 
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
        Reaction.create(req.body)
        .then( (reaction) => {
            console.log(reaction);
            return Thought.findOneAndUpdate
            (
                { _id: req.body.thoughtId },
                { $push: { reactions: reaction.reactionId } },
                { new: true }
            );
        }).then( (thought) => {
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