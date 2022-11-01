const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = 
{
    getUsers(req, res) 
    { User.find()
        .then( ((users) => res.json(users)))
        .catch( (error) => res.status(500).json(error));
    },
    
    getSingleUser(req, res)
    {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then( (user) => !user 
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.json(user)
        ).catch( (error) => res.status(500).json(error));
    },

    createUser(req, res)
    {
        User.create(req.body)
            .then( (new_userdata) => res.json(new_userdata))
            .catch( (error) => res.status(500).json(error));
    },
    
    updateUser(req, res)
    {
        User.findOneAndUpdate
        (
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.json(user)
        ).catch( (error) => res.status(500).json(error));
    },

    deleteUser(req, res)
    {
        User.findOneAndRemove({ _id: req.params.userId })
        .then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json({ message: `User was successfully deleted` })
        ).catch( (error) => res.status(500).json(error));
    },

    addFriend(req, res)
    {
        User.findOneAndUpdate
        (
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        ).then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json(user)
        ).catch( (error) => res.status(500).json(error));
    },

    removeFriend(req, res)
    {
        User.findOneAndUpdate
        (
            { _id: req.params.videoId },
            { $pull: { friends: { responseId: req.params.friendId } } },
            { runValidators: true, new: true }
        ).then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json(user)
        ).catch( (error) => res.status(500).json(error));
    }
}