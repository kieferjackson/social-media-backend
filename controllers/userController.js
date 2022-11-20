const { User } = require('../models');

module.exports = 
{
    // Returns all users in the database
    getUsers(req, res) 
    { 
        User.find()
        .select('-__v')
        .then( (users) => res.json(users))
        .catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Returns a single user found with the userId parameter
    getSingleUser(req, res)
    {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then( (user) => !user 
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.json(user)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Adds a new user to the database (requires username and email in the request body)
    createUser(req, res)
    {
        User.create(req.body)
            .then( (new_userdata) => res.json(new_userdata))
            .catch( (error) => { 
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Updates a selected user with the userId parameter (requires username and email in the request body)
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
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Deletes a selected user with the userId parameter
    deleteUser(req, res)
    {
        User.findOneAndRemove({ _id: req.params.userId })
        .then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json({ message: `User was successfully deleted` })
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Adds a user's id (friendId) to a selected user's (userId) friends list
    async addFriend(req, res)
    {
        // Find friend by given id
        const friend_to_add = await User.findById(req.params.friendId)
        .catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });

        // Check that requested user exists
        if (!friend_to_add) { res.status(404).json({ message: `No user with ID: ${req.params.friendId} exists in the database.` }) }

        // Add friend to selected user's friends list
        User.findOneAndUpdate
        (
            { _id: req.params.userId },
            { $addToSet: { friends: friend_to_add } },
            { runValidators: true, new: true }
        ).then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json(user)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Removes a user's id (friendId) from a selected user's (userId) friends list
    async removeFriend(req, res)
    {
        // Find friend by given id
        const friend_to_remove = await User.findById(req.params.friendId)
        .catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });

        // Check that requested user exists
        if (!friend_to_remove) { res.status(404).json({ message: `No user with ID: ${req.params.friendId} exists in the database.` }) }

        // Remove friend from selected user's friends list
        User.findOneAndUpdate
        (
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then( (user) => !user
            ? res.status(404).json({ message: `No user with ID: ${req.params.userId}`}) 
            : res.status(200).json(user)
        ).catch( (error) => { 
            console.log(error);
            res.status(500).json(error);
        });
    }
}