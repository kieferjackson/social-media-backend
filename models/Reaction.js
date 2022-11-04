const { Schema, Types } = require('mongoose');

const reaction_schema = new Schema
(
    {
        reactionId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:
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
        }
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

module.exports = reaction_schema;