const User = require('../models/User');

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
    }
}