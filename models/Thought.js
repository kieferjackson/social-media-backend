const { Schema, model } = require('mongoose');

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
        reactions: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'  
            }
        ]
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

thought_schema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thought_schema);

module.exports = Thought;