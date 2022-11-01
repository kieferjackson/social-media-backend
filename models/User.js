const { Schema, model } = require('mongoose');
const thought_schema = require('./Thought.js');

const user_schema = new Schema
(
    {
        username:
        {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/
        },
        thoughts: [thought_schema],
        friends: [this]
    },
    {
        toJSON: { virtuals: true }
    }
);

user_schema.virtual('friendCount').get(() => this.friends.length);

const User = model('user', user_schema);

module.exports = User;