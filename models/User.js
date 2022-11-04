const { Schema, model } = require('mongoose');

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
        thoughts: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'  
            }
        ],
        friends: [this]
    },
    {
        toJSON: { virtuals: true },
        id: false
    }
);

user_schema.virtual('friendCount').get(() => this.friends.length);

const User = model('user', user_schema);

module.exports = User;