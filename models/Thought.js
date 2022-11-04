const { Schema, model } = require('mongoose');
const reaction_schema = require('./Reaction.js');

const thought_schema = new Schema
(
    {
        thoughtText:
        {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            get: format_timestamp
        },
        username: 
        {
            type: String,
            required: true
        },
        reactions: [reaction_schema]
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        id: false
    }
);

function format_timestamp(timestamp)
{
    return timestamp.toLocaleDateString();
}

thought_schema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = model('thought', thought_schema);

module.exports = Thought;